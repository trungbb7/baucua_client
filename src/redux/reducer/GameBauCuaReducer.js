import { CHOI_LAI, DAT_CUOC_BAU_CUA, PLAY_GAME_BAU_CUA } from "../constants/GameBauCuaActions";

const initialState = {
    danhSachCuoc: [
        { ma: 'nai', hinhAnh: './img/gamebaucua/nai.png', diemCuoc: 0 },
        { ma: 'bau', hinhAnh: './img/gamebaucua/bau.png', diemCuoc: 0 },
        { ma: 'ga', hinhAnh: './img/gamebaucua/ga.png', diemCuoc: 0 },
        { ma: 'ca', hinhAnh: './img/gamebaucua/ca.png', diemCuoc: 0 },
        { ma: 'cua', hinhAnh: './img/gamebaucua/cua.png', diemCuoc: 0 },
        { ma: 'tom', hinhAnh: './img/gamebaucua/tom.png', diemCuoc: 0 },

    ],
    tienThuong: 1000,
    mangXucXac: [
        { ma: 'ca', hinhAnh: './img/gamebaucua/ca.png', },
        { ma: 'cua', hinhAnh: './img/gamebaucua/cua.png', },
        { ma: 'tom', hinhAnh: './img/gamebaucua/tom.png', },
    ],
}

const GameBauCuaReducer = (state = initialState, action) => {
    switch (action.type) {
<<<<<<< HEAD
       
=======
        case DAT_CUOC_BAU_CUA: {
            const danhSachCuocUpdate = [...state.danhSachCuoc];
            const index = danhSachCuocUpdate.findIndex(qc => qc.ma === action.qc.ma);
            if (index !== -1) {
                if (action.tangGiam && state.tienThuong > 0) {
                    danhSachCuocUpdate[index].diemCuoc += 100;
                    state.tienThuong -= 100;
                } else {
                    if (!action.tangGiam && danhSachCuocUpdate[index].diemCuoc > 0) {
                        danhSachCuocUpdate[index].diemCuoc -= 100;
                        state.tienThuong += 100;
                    }
                }
            }
            state.danhSachCuoc = danhSachCuocUpdate;
            return { ...state }
        }
        case PLAY_GAME_BAU_CUA:{
            const mangXucXacNgauNhien = [];
            for(let i=0;i<3;i++){
                //tạo ra 1 số ngẫu nhiên từ 0->5
                let soNgauNhien = Math.floor(Math.random() * 6);
                const xucXacNgauNhien = state.danhSachCuoc[soNgauNhien];
                mangXucXacNgauNhien.push(xucXacNgauNhien);
            }
            //cập nhật lại mảng xúc state.mangXucXac = mangXucXacNgauNhien
            state.mangXucXac = mangXucXacNgauNhien;


            //xử lý tăng điểm thưởng
            mangXucXacNgauNhien.forEach((xucXacNN)=>{
                const indexDSCuoc = state.danhSachCuoc.findIndex(qc=>qc.ma===xucXacNN.ma);
                if(indexDSCuoc!== -1){
                    state.tienThuong += state.danhSachCuoc[indexDSCuoc].diemCuoc;
                }
            })

            //xử lý hoàn tiền
            state.danhSachCuoc.forEach((qc)=>{
                let indexXucXacNN = mangXucXacNgauNhien.findIndex(xxnn =>xxnn.ma === qc.ma);
                if(indexXucXacNN !== -1){
                    state.tienThuong += qc.diemCuoc;
                }
            })
            //xử lý làm mới diemCuoc
            state.danhSachCuoc = state.danhSachCuoc.map((qc)=>{
                return {...qc,diemCuoc:0};
            })

            return {...state};
        }
        case CHOI_LAI:{
            state.tienThuong = 1000;
            state.danhSachCuoc = state.danhSachCuoc.map((qc)=>{
                return {...qc,diemCuoc:0}
            });
            return {...state};
        }
>>>>>>> 21130438_Luan
        default:
            return { ...state }
    }
}

export default GameBauCuaReducer;