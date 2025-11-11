import { useDispatch,  } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import usuarioServices from "../service/usuario.services";
import { useEffect, useState } from "react";
import { isValid, noValid } from "../features/auth.slice";

const ProtectedContainer = () => {
    const [checking, setChecking] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const validateToken = async () => {
        try {
            await usuarioServices.validarToken();
            dispatch(isValid());
        } catch(error) {
            console.log(error);
            localStorage.clear();
            dispatch(noValid());
            navigate('/auth');
        } finally {
            setChecking(false);
            
        }
    };
    useEffect(() => {
        validateToken();
    }, []);

    if (!checking) return <Outlet />
    
};
export default ProtectedContainer;