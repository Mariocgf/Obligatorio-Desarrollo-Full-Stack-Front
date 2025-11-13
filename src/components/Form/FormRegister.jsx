import authServices from "../../service/auth.services";
import { useState } from "react";
import { useNavigate } from "react-router";
import { joiResolver } from "@hookform/resolvers/joi";
import { registroUsuario } from "../../validators/auth.validator";
import { useDispatch } from "react-redux";
import { cargarUsuarioInfo } from "../../features/usuarioInfo.slice";
import usuarioServices from "../../service/usuario.services";
import Form from "./Form";

const FormRegister = ({ onToggle }) => {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const onSubmit = async (data) => {
        try {
            await authServices.signUp(data);
            const response2 = await usuarioServices.getUsuarioBasicInfo();
            dispatch(cargarUsuarioInfo(response2.data));
            navigate('/usuario');
        } catch (error) {
            console.log("Error during registro:", error.response?.data);
            setError(error.response?.data?.data?.message || "Error en el registro");
        }
    };

    const inputs = [
        {
            placeholder: "Ingrese su nombre",
            type: "text",
            name: "nombre",
            required: true
        },
        {
            placeholder: "Ingrese su apellido",
            type: "text",
            name: "apellido",
            required: true
        },
        {
            placeholder: "Ingrese su nombre de usuario",
            type: "text",
            name: "username",
            required: true
        },
        {
            type: "date",
            name: "fechaNacimiento",
            required: true
        },
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
        },
        {
            placeholder: "Repita su contraseña",
            type: "password",
            name: "repeatPassword",
            required: true
        }
    ];

    return (
        <div className="rounded-2xl p-8 flex flex-col gap-6 w-full max-w-md">
            <h1 className="text-4xl font-bold mb-4">Registrarse</h1>
            {error && <p className="text-red-700 bg-red-200 px-4 py-2 rounded border border-red-300">{error}</p>}
            
            <Form 
                onSubmit={onSubmit} 
                inputs={inputs} 
                button="Registrarse"
                resolver={joiResolver(registroUsuario)}
            >
                <p>¿Ya tienes una cuenta? <a href="#" onClick={(e) => { e.preventDefault(); onToggle(); }} className="text-blue-500 hover:underline">Inicia sesión</a>
                </p>
            </Form>
        </div>
    );
}

export default FormRegister;