import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router";
import usuarioServices from "../service/usuario.services";
import { useEffect } from "react";
import { isValid, noValid } from "../features/auth.slice";
import { cargarUsuarioInfo } from "../features/usuarioInfo.slice";

const AuthenticatedContainer = () => {
    const user = useSelector((state) => state.user.usuario);

    const dispatch = useDispatch();
    const validateToken = async () => {
        try {
            await usuarioServices.validarToken();
            dispatch(isValid());
            if (!user) {
                const response = await usuarioServices.getUsuarioBasicInfo();
                dispatch(cargarUsuarioInfo(response.data));
            }
        } catch(error) {
            console.log(error);
            localStorage.clear();
            dispatch(noValid());
        }
    };
    useEffect(() => {
        if (localStorage.getItem("token")) 
            validateToken();
        
    }, []);

    return <Outlet />
    
};
export default AuthenticatedContainer;