import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    usuario: null
};

const usuarioInfoSlice = createSlice({
    name: "usuario",
    initialState,
    reducers: {
        cargarUsuarioInfo: (state, action) => {
            state.usuario = action.payload;
        },
        limpiarUsuarioInfo(state) {
            state.usuario = null;
        }
    }
});

export const {
    cargarUsuarioInfo,
    limpiarUsuarioInfo
} = usuarioInfoSlice.actions;

export default usuarioInfoSlice.reducer;
