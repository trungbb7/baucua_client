import React from 'react';
import QuanCuoc from './QuanCuoc';
import { useSelector } from 'react-redux';

export default function DanhSachCuoc(props) {
    const { danhSachCuoc } = useSelector(state => state.GameBauCuaReducer);
    const renderDanhSachCuoc = () => {
        return danhSachCuoc.map((item, index) => {
            return (
                <div className="col-4" key={index}>
                    <QuanCuoc qc={item}/>
                </div>
            )
        });
    }
    return (
        <div className="row ">
            {renderDanhSachCuoc()}
        </div>
    )
}
