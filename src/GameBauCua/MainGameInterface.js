import React from 'react';
import '../assets/MainGameInterface.css';
import BetList from './BetList';
import DiceList from './DiceList';

export default function MainGameInterface(props) {
    return (
        <div id="BaiTapGameBauCua">
            <div className="container">
                <h3 className="text-center display-4 titleGame"
                    style={{
                        color: 'rgb(21 153 216)',
                    }}> Game Bầu Cua</h3>

                <div className="row">
                    <div className="col-8">
                        <BetList />
                    </div>
                    <div className="col-4">
                        <DiceList />
                    </div>
                </div>
            </div>
        </div>
    )
}
