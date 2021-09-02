import React from 'react';
import DanhSachCuoc from './DanhSachCuoc';
import DanhSachXucXac from './DanhSachXucXac';
import '../assets/GameBauCua.css';

export default function GameBauCua(props) {
    return (
        <div id="BaiTapGameBauCua">
            <div className="container">
                <h3 className="text-center display-4 titleGame"
                    style={{
                        color: 'rgb(21 153 216)',
                    }}> Game Bầu Cua</h3>

                <div className="row">
                    <div className="col-8">
                        <DanhSachCuoc />
                    </div>
                    <div className="col-4">
                        <DanhSachXucXac />
                    </div>
                </div>
            </div>
        </div>
    )
}
