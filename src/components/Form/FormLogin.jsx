import authServices from "../../service/auth.services";
import { useState } from "react";
import { useNavigate } from "react-router";
import { joiResolver } from "@hookform/resolvers/joi";
import { loginUsuarioSchema } from "../../validators/auth.validator";
import { useDispatch } from "react-redux";
import { cargarUsuarioInfo } from "../../features/usuarioInfo.slice";
import usuarioServices from "../../service/usuario.services";
import Form from "./Form";

const FormLogin = ({ onToggle }) => {

    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const onSubmit = async (data) => {
        try {
            const response = await authServices.login(data);
            localStorage.setItem('token', response.data.token); 
            const response2 = await usuarioServices.getUsuarioBasicInfo(); 
            dispatch(cargarUsuarioInfo(response2.data)); 
            navigate('/usuario'); 
        } catch (error) {
            setError(error.response.data.data?.message);
        }
    };

    const inputs = [
        {
            placeholder: "Ingrese su email",
            type: "email",
            name: "email",
            required: true
        },
        {
            placeholder: "Ingrese su contraseña",
            type: "password",
            name: "password",
            required: true
        }
    ];

    return (
        <div className="rounded-2xl p-8 flex flex-col gap-6 w-full max-w-md">
            <h1 className="text-4xl font-bold mb-4">Iniciar sesión</h1>
            {error && <p className="text-red-700 bg-red-200 px-4 py-2 rounded border border-red-300">{error}</p>}
            
            <Form 
                onSubmit={onSubmit} 
                inputs={inputs} 
                button="Login"
                resolver={joiResolver(loginUsuarioSchema)}
            >
                <p> Aun no tienes una cuenta? <a href="#" onClick={(e) => { e.preventDefault(); onToggle(); }} className="text-blue-500 hover:underline">Regístrate</a>
                </p>
            </Form>
        </div>
    );
}

export default FormLogin;