import { useForm } from "react-hook-form";
import authServices from "../service/auth.services";
import {  useState } from "react";
import { useNavigate } from "react-router";
import { joiResolver } from "@hookform/resolvers/joi";
import { loginUsuarioSchema } from "../validators/auth.validator";
import { useDispatch } from "react-redux";
import { cargarUsuarioInfo } from "../features/usuarioInfo.slice";
import usuarioServices from "../service/usuario.services";

const FormLogin = ({ onToggle }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: joiResolver(loginUsuarioSchema) // Aca tienes que poner el schema de registro
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const onSubmit = async (data) => {
        try {
            const response = await authServices.login(data);
            localStorage.setItem('token', response.data.token); //Asegurate de guardar el token luego del registro
            const response2 = await usuarioServices.getUsuarioBasicInfo(); //Este servicio es provicional
            dispatch(cargarUsuarioInfo(response2.data)); // Aca deberias cargar el body del form registro para guardar los datos del usuario
            navigate('/usuario'); // Redirige al usuario a la página de usuario como ultimo paso
        } catch (error) {
            console.log("Error during login:", error.response.data);
            setError(error.response.data.data?.message);
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className=" rounded-2xl p-8 flex flex-col gap-6 w-full max-w-md ">
            <h1 className="text-4xl font-bold mb-4">Iniciar sesión</h1>
            {error && <p className="text-red-700 bg-red-200 px-4 py-2 rounded border border-red-300">{error}</p>}
            <div>
                <input type="email"  name="email"  className="border border-black/35 w-full rounded-md px-4 py-2" placeholder="Ingrese el email" {...register("email")} />
                <span>{errors.email && <p className="text-red-500">{errors.email.message}</p>}</span>
                {/* Esto deberias colocarlo en el form de registro, el errors.email corresponde al nombre del campo que estas validando y del schema */}

            </div>
            <div>
                <input type="password" id="password" name="password" required className="border border-black/35 w-full rounded-md px-4 py-2" placeholder="Ingrese la contraseña" {...register("password")} />
                <span>{errors.password && <p className="text-red-500">{errors.password.message}</p>}</span>
            </div>
            <p>Aun no tienes una cuenta? <a href="#" onClick={(e) => { e.preventDefault(); onToggle(); }} className="text-blue-500 hover:underline">Regístrate</a></p>
            <button type="submit" className="bg-gray-900 hover:bg-gray-600 cursor-pointer text-white font-bold py-2 px-4 rounded transition-all duration-300">Login</button>
        </form>
    );
}
export default FormLogin;