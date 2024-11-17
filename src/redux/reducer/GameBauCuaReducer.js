import {
  DAT_CUOC_BAU_CUA,
  PLAY_GAME_BAU_CUA,
  CHOI_LAI,
  UPDATE_BALANCE,
} from "../constants/GameBauCuaActions";

const initialState = {
  danhSachCuoc: [
    { ma: "bầu", hinhAnh: "./img/gamebaucua/bau.png", diemCuoc: 0 },
    { ma: "cua", hinhAnh: "./img/gamebaucua/cua.png", diemCuoc: 0 },
    { ma: "tôm", hinhAnh: "./img/gamebaucua/tom.png", diemCuoc: 0 },
    { ma: "cá", hinhAnh: "./img/gamebaucua/ca.png", diemCuoc: 0 },
    { ma: "gà", hinhAnh: "./img/gamebaucua/ga.png", diemCuoc: 0 },
    { ma: "nai", hinhAnh: "./img/gamebaucua/nai.png", diemCuoc: 0 },
  ],
  tienThuong: 0,
  mangXucXac: [
    { ma: "bầu", hinhAnh: "./img/gamebaucua/bau.png" },
    { ma: "cua", hinhAnh: "./img/gamebaucua/cua.png" },
    { ma: "tôm", hinhAnh: "./img/gamebaucua/tom.png" },
  ],
};

const GameBauCuaReducer = (state = initialState, action) => {
  switch (action.type) {
    case DAT_CUOC_BAU_CUA: {
      const danhSachCuocUpdate = [...state.danhSachCuoc];
      const index = danhSachCuocUpdate.findIndex(
        (qc) => qc.ma === action.qc.ma
      );

      if (index !== -1) {
        if (action.tangGiam) {
          if (state.tienThuong >= 100) {
            danhSachCuocUpdate[index].diemCuoc += 100;
            state.tienThuong -= 100;
          }
        } else {
          if (danhSachCuocUpdate[index].diemCuoc > 0) {
            danhSachCuocUpdate[index].diemCuoc -= 100;
            state.tienThuong += 100;
          }
        }
      }
      return { ...state, danhSachCuoc: danhSachCuocUpdate };
    }

    case PLAY_GAME_BAU_CUA: {
      console.log("PLAY_GAME_BAU_CUA action:", action); // Debug log
      return {
        ...state,
        mangXucXac: action.mangXucXac,
        tienThuong: Number(action.tienThuong), // Ensure it's a number
        danhSachCuoc: action.danhSachCuoc,
      };
    }

    case UPDATE_BALANCE: {
      console.log("UPDATE_BALANCE action:", action); // Debug log
      return {
        ...state,
        tienThuong: Number(action.payload), // Ensure it's a number
      };
    }

    case CHOI_LAI: {
      return {
        ...state,
        danhSachCuoc: state.danhSachCuoc.map((qc) => ({ ...qc, diemCuoc: 0 })),
      };
    }

    default:
      return state;
  }
};

export default GameBauCuaReducer;
