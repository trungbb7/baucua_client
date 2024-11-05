import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import XucXac from './XucXac';
import { PLAY_GAME_BAU_CUA } from '../redux/constants/GameBauCuaActions';
import DiemCuoc from './DiemCuoc';
import './DanhSachXucXac.css';

const DanhSachXucXac = (props) => {
    const { mangXucXac, playGame } = props;

    const [isRolling, setIsRolling] = useState(false);
    const [showResult, setShowResult] = useState(false);

    const audioRef = useRef(null);

  

    return (
        <div>
            <DiemCuoc />
            <audio ref={audioRef} src="/roll-dice.mp3" />
            <div className="mt-3 d-flex flex-column align-items-center">
                <div className="danhSachXucXac">
                    <div className="d-flex justify-content-center">
                        <div className="p-1 pdXucXac">
                            <XucXac xucXac={mangXucXac[0]} isRolling={isRolling} />
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <div className="p-1 pdXucXac">
                            <XucXac xucXac={mangXucXac[1]} isRolling={isRolling} />
                        </div>
                        <div className="p-1 pdXucXac">
                            <XucXac xucXac={mangXucXac[2]} isRolling={isRolling} />
                        </div>
                    </div>
                </div>
                <div className="text-center mt-3">
                    <button className="btn btn-primary btnXoc"
                        style={{ fontSize: 30, boxShadow: 'rgb(21 153 216) 0px 0.5rem 1rem' }} 
                        >
                        Xốc
                    </button>
                </div>

                {/* Hiển thị thông báo kết quả sau khi xúc xắc xong */}
                {showResult && (
                    <div className="result-overlay">
                        <div className="result-content animated">
                            <h2>Kết quả:</h2>
                            <div className="d-flex justify-content-center">
                                {mangXucXac.map((xucXac, index) => (
                                    <img key={index} src={xucXac.hinhAnh} alt={xucXac.ten} className="xucXac-img" />
                                ))}
                            </div>
                            <button className="btn btn-light mt-3" onClick={() => setShowResult(false)}>Đóng</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    playGame: () => dispatch({ type: PLAY_GAME_BAU_CUA }),
});

const mapStateToProps = (state) => ({
    mangXucXac: state.GameBauCuaReducer.mangXucXac,
});

export default connect(mapStateToProps, mapDispatchToProps)(DanhSachXucXac);
