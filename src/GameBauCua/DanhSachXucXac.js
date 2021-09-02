import React from 'react';
import XucXac from './XucXac';
import { useSelector, useDispatch } from 'react-redux';
import { PLAY_GAME_BAU_CUA } from '../redux/constants/GameBauCuaActions';
import DiemCuoc from './DiemCuoc';

export default function DanhSachXucXac(props) {
    const { mangXucXac } = useSelector(state => state.GameBauCuaReducer);
    const dispatch = useDispatch();

    return (
        <div>
            <DiemCuoc />

            <div className="mt-3 d-flex flex-column align-items-center">
                <div className="danhSachXucXac">
                    <div className="d-flex justify-content-center">
                        <div className="p-1" className="pdXucXac">
                            <XucXac xucXac={mangXucXac[0]} />
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <div className="p-1" className="pdXucXac">
                            <XucXac xucXac={mangXucXac[1]} />
                        </div>
                        <div className="p-1" className="pdXucXac">
                            <XucXac xucXac={mangXucXac[2]} />
                        </div>
                    </div>
                </div>
                <div className="text-center mt-3">
                    <button className="btn btn-primary btnXoc"
                        style={{ fontSize: 30, boxShadow: 'rgb(21 153 216) 0px 0.5rem 1rem' }} onClick={() => {
                            dispatch({
                                type: PLAY_GAME_BAU_CUA,
                            })
                        }}>Xốc</button>
                </div>
            </div>
        </div>
    )
}
