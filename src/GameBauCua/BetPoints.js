import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_BALANCE } from "../redux/constants/GameBauCuaActions";

export default function BetPoints(props) {
  const { tienThuong } = useSelector((state) => state.GameBauCuaReducer);
  const dispatch = useDispatch();

  const fetchBalance = async () => {
    try {
      // Get username from localStorage
      const username = localStorage.getItem("username");
      if (!username) {
        alert("Please enter a username first");
        return;
      }

      const response = await fetch(
        "http://localhost:3300/api/game/getBalance",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch balance");
      }

      const data = await response.json();

      if (data.balance !== undefined) {
        dispatch({
          type: UPDATE_BALANCE,
          payload: data.balance,
        });
      } else {
        throw new Error("Balance not found in response");
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
      alert("Failed to fetch balance. Please try again.");
    }
  };

  return (
    <div>
      <div className="w-100 d-flex justify-content-center align-items-center diemCuoc">
        <span className="tienThuong">
          Tiền thưởng:{" "}
          <span style={{ color: "rgb(255, 155, 2)" }}>
            {tienThuong.toLocaleString()}$
          </span>
        </span>
        <div className="p-2">
          <button className="btn btn-danger" onClick={fetchBalance}>
            Lấy tiền
          </button>
        </div>
      </div>
    </div>
  );
}
