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
       
        default:
            return { ...state }
    }
}

export default GameBauCuaReducer;