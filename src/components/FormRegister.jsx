import { useForm } from "react-hook-form";
import authServices from "../service/auth.services";
import { useState } from "react";
import { useNavigate } from "react-router";
import { joiResolver } from "@hookform/resolvers/joi";
import { registroUsuario } from "../validators/auth.validator";
import { useDispatch } from "react-redux";
import { cargarUsuarioInfo } from "../features/usuarioInfo.slice";
import usuarioServices from "../service/usuario.services";


const FormRegister = ({ onToggle }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: joiResolver(registroUsuario)
    });
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
    return (
        <form className="rounded-2xl p-8 flex flex-col gap-6 w-full max-w-md" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-4xl font-bold mb-4">Registrarse</h1>
            <div>
                <label htmlFor="nombre">Nombre:</label>
                <input type="text" id="nombre" {...register("nombre")} className="border border-black/35 w-full rounded-md px-4 py-2" placeholder="Ingrese su nombre" />
                {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre.message}</p>}
            </div>
            <div>
                <label htmlFor="apellido">Apellido:</label>
                <input type="text" id="apellido" {...register("apellido")} className="border border-black/35 w-full rounded-md px-4 py-2" placeholder="Ingrese su apellido" />
                {errors.apellido && <p className="text-red-500 text-sm">{errors.apellido.message}</p>}
            </div>
            <div>
                <label htmlFor="username">Nombre de usuario:</label>
                <input type="text" id="username" {...register("username")} className="border border-black/35 w-full rounded-md px-4 py-2" placeholder="Ingrese su nombre de usuario" />
                {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
            </div>
            <div>
                <label htmlFor="fechaNacimiento">Fecha de nacimiento:</label>
                <input type="date" id="fechaNacimiento" {...register("fechaNacimiento")} className="border border-black/35 w-full rounded-md px-4 py-2" />
                {errors.fechaNacimiento && <p className="text-red-500 text-sm">{errors.fechaNacimiento.message}</p>}
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" {...register("email")} className="border border-black/35 w-full rounded-md px-4 py-2" placeholder="Ingrese el email" />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div>
                <label htmlFor="password">Contraseña:</label>
                <input type="password" id="password" {...register("password")} className="border border-black/35 w-full rounded-md px-4 py-2" placeholder="Ingrese la contraseña" />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            <div>
                <label htmlFor="repeatPassword">Repetir contraseña:</label>
                <input type="password" id="repeatPassword" {...register("repeatPassword")} className="border border-black/35 w-full rounded-md px-4 py-2" placeholder="Repita la contraseña" />
                {errors.repeatPassword && <p className="text-red-500 text-sm">{errors.repeatPassword.message}</p>}
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <p>¿Ya tienes una cuenta? <a href="#" onClick={(e) => { e.preventDefault(); onToggle(); }} className="text-blue-500 hover:underline">Inicia sesión</a></p>
            <button type="submit" className="bg-gray-600 hover:bg-gray-500 cursor-pointer text-white font-bold py-2 px-4 rounded transition-all duration-300">Registrarse</button>
        </form>
    );
}
export default FormRegister;