import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dice from "./Dice";
import BetPoints from "./BetPoints";
import UsernameInput from "./UsernameInput";
import "./DiceList.css";
import {
  PLAY_GAME_BAU_CUA,
  UPDATE_BALANCE,
} from "../redux/constants/GameBauCuaActions";
import removeVietnameseTones from "../utils/removeVietnameseTones";

const INITIAL_DICE = [
  { ma: "bầu", hinhAnh: "./img/gamebaucua/bau.png" },
  { ma: "cua", hinhAnh: "./img/gamebaucua/cua.png" },
  { ma: "tôm", hinhAnh: "./img/gamebaucua/tom.png" },
];

const NOTIFICATION_TIMEOUT = 3000;
const API_BASE_URL = "http://localhost:3300/api/game";

const DiceList = () => {
  const dispatch = useDispatch();
  const { danhSachCuoc } = useSelector((state) => state.GameBauCuaReducer);

  const [gameState, setGameState] = useState({
    username: "",
    timeLeft: 0,
    currentRoundId: null,
    showResult: false,
    gameResult: null,
    isRolling: false,
    mangXucXac: INITIAL_DICE,
  });

  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
  };

  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification((prev) => ({ ...prev, show: false }));
      }, NOTIFICATION_TIMEOUT);
      return () => clearTimeout(timer);
    }
  }, [notification.show]);

  const fetchRoundInfo = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/round`);
      const data = await response.json();
      setGameState((prev) => ({
        ...prev,
        timeLeft: Math.floor(data.timeLeft / 1000),
        currentRoundId: data.roundId,
      }));
    } catch (error) {
      console.error("Error fetching round info:", error);
    }
  };

  const placeBet = async () => {
    if (!gameState.username) {
      showNotification("Please enter a username", "error");
      return;
    }

    try {
      const betData = danhSachCuoc.reduce((acc, item) => {
        acc[item.ma] = item.diemCuoc;
        return acc;
      }, {});

      const response = await fetch(`${API_BASE_URL}/bet`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: gameState.username,
          bets: betData,
        }),
      });

      const data = await response.json();
      setGameState((prev) => ({ ...prev, currentRoundId: data.roundId }));
      showNotification("Bet placed successfully!");
    } catch (error) {
      console.error("Error placing bet:", error);
      showNotification("Failed to place bet. Please try again.", "error");
    }
  };

  const handleGameResult = (data, newMangXucXac) => {
    setGameState((prev) => ({
      ...prev,
      isRolling: false,
      mangXucXac: newMangXucXac,
      gameResult: data,
      showResult: true,
    }));

    dispatch({
      type: PLAY_GAME_BAU_CUA,
      mangXucXac: newMangXucXac,
      tienThuong: data.balance,
      danhSachCuoc: danhSachCuoc.map((qc) => ({ ...qc, diemCuoc: 0 })),
    });

    dispatch({
      type: UPDATE_BALANCE,
      payload: data.balance,
    });
  };

  const MAX_RETRIES = 100; // Maximum number of retries (30 seconds)
  const RETRY_DELAY = 1000; // 1 second delay between retries

  const getResult = async () => {
    if (!gameState.currentRoundId || !gameState.username) return;

    let retryCount = 0;

    const tryGetResult = async () => {
      try {
        if (retryCount >= MAX_RETRIES) {
          showNotification(
            "Failed to get results after maximum retries",
            "error"
          );
          return;
        }

        const response = await fetch(`${API_BASE_URL}/result`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            roundId: gameState.currentRoundId,
            username: gameState.username,
          }),
        });

        if (response.status === 400) {
          retryCount++;
          await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
          return tryGetResult();
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data?.result) {
          setGameState((prev) => ({ ...prev, isRolling: true }));

          const newMangXucXac = data.result.map((item) => ({
            ma: item,
            hinhAnh: `./img/gamebaucua/${removeVietnameseTones(item)}.png`,
          }));

          setTimeout(() => {
            setTimeout(() => handleGameResult(data, newMangXucXac), 500);
          }, 1000);
        } else {
          retryCount++;
          await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
          return tryGetResult();
        }
      } catch (error) {
        console.error("Error getting result:", error);
        retryCount++;
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
        return tryGetResult();
      }
    };

    tryGetResult();
  };

  useEffect(() => {
    fetchRoundInfo();
    const interval = setInterval(fetchRoundInfo, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (gameState.timeLeft === 0) {
      getResult();
    }
  }, [gameState.timeLeft]);

  const renderDice = (index) => (
    <Dice
      isRolling={gameState.isRolling}
      xucXac={gameState.mangXucXac[index]}
      nextFace={
        gameState.gameResult?.result
          ? {
              ma: gameState.gameResult.result[index],
              hinhAnh: `./img/gamebaucua/${removeVietnameseTones(
                gameState.gameResult.result[index]
              )}.png`,
            }
          : null
      }
    />
  );

  return (
    <div>
      <UsernameInput
        username={gameState.username}
        setUsername={(username) =>
          setGameState((prev) => ({ ...prev, username }))
        }
      />
      <div className="timer" style={styles.timer}>
        Time Left: {gameState.timeLeft}s
      </div>
      <BetPoints />
      <div className="mt-5">
        <div className="danhSachXucXac">
          <div className="d-flex justify-content-center pb-3">
            {renderDice(0)}
          </div>
          <div className="d-flex justify-content-between px-5 pb-3">
            {renderDice(1)}
            {renderDice(2)}
          </div>
        </div>
        <div className="text-center mt-3">
          <button
            className="btn btn-primary btnXoc"
            style={{
              fontSize: 30,
              boxShadow: "rgb(21 153 216) 0px 0.5rem 1rem",
            }}
            onClick={placeBet}
          >
            Bet
          </button>
        </div>
        {gameState.showResult && gameState.gameResult && (
          <div className="result-overlay">
            <div className="result-content animated">
              <h2>Results:</h2>
              <div>Symbols: {gameState.gameResult.result.join(", ")}</div>
              <div>Balance: {gameState.gameResult.balance}</div>
              <button
                className="btn btn-light mt-3"
                onClick={() =>
                  setGameState((prev) => ({ ...prev, showResult: false }))
                }
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      {notification.show && (
        <div
          className={`notification ${notification.type}`}
          onClick={() => setNotification({ ...notification, show: false })}
        >
          {notification.message}
        </div>
      )}
    </div>
  );
};

const styles = {
  timer: {
    fontSize: "24px",
    textAlign: "center",
    marginBottom: "20px",
    color: "rgb(21 153 216)",
  },
};

export default DiceList;
