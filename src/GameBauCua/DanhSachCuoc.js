import React from 'react';
import QuanCuoc from './QuanCuoc';
import { useSelector } from 'react-redux';

export default function DanhSachCuoc(props) {
    const { danhSachCuoc } = useSelector(state => state.GameBauCuaReducer);
    
    const renderDanhSachCuoc = () => {
        return danhSachCuoc.map((item, index) => {
            return (
                <div className="col-4" key={index} style={colStyle}>
                    <QuanCuoc qc={item} />
                </div>
            );
        });
    };

    return (
        <div className="row" style={rowStyle}>
            {renderDanhSachCuoc()}
        </div>
    );
}

// Style cho hàng
const rowStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: '0 -10px', // Điều chỉnh margin để giảm không gian giữa các cột
};

// Style cho cột
const colStyle = {
    flex: '0 0 30%', // Điều chỉnh kích thước cột
    maxWidth: '30%', // Đặt chiều rộng tối đa cho cột

};
