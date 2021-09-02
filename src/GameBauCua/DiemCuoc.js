import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CHOI_LAI } from '../redux/constants/GameBauCuaActions';

export default function DiemCuoc(props) {
    const { tienThuong } = useSelector(state => state.GameBauCuaReducer);
    const dispatch = useDispatch();
    return (
        <div>

            <div className="w-100 d-flex justify-content-center align-items-center diemCuoc">
                <span className="tienThuong">
                    Tiền thưởng: <span style={{ color: 'rgb(255, 155, 2)' }}>{tienThuong.toLocaleString()}$</span>
                </span>
                <div className="p-2">
                    <button className="btn btn-danger" onClick={() => {
                        dispatch({ type: CHOI_LAI })
                    }}>Chơi lại</button>
                </div>
            </div>

        </div>
    )
}
