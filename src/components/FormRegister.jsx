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
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        resolver: joiResolver(registroUsuario),
        mode: 'onChange'
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
        <form className="rounded-2xl p-4 md:p-6 flex flex-col gap-2 sm:gap-3 md:gap-4 w-full h-fit max-w-md" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">Registrarse</h1>
            <div>
                <input type="text" id="nombre" {...register("nombre")} className="border border-black/35 w-full rounded-md px-3 py-1.5 sm:py-2 text-sm sm:text-base" placeholder="Ingrese su nombre" />
                {errors.nombre && <p className="text-red-500 text-xs sm:text-sm mt-0.5">{errors.nombre.message}</p>}
            </div>
            <div>
                <input type="text" id="apellido" {...register("apellido")} className="border border-black/35 w-full rounded-md px-3 py-1.5 sm:py-2 text-sm sm:text-base" placeholder="Ingrese su apellido" />
                {errors.apellido && <p className="text-red-500 text-xs sm:text-sm mt-0.5">{errors.apellido.message}</p>}
            </div>
            <div>
                <input type="text" id="username" {...register("username")} className="border border-black/35 w-full rounded-md px-3 py-1.5 sm:py-2 text-sm sm:text-base" placeholder="Ingrese su nombre de usuario" />
                {errors.username && <p className="text-red-500 text-xs sm:text-sm mt-0.5">{errors.username.message}</p>}
            </div>
            <div>
                <input type="date" id="fechaNacimiento" {...register("fechaNacimiento")} className="border border-black/35 w-full rounded-md px-3 py-1.5 sm:py-2 text-sm sm:text-base" />
                {errors.fechaNacimiento && <p className="text-red-500 text-xs sm:text-sm mt-0.5">{errors.fechaNacimiento.message}</p>}
            </div>
            <div>
                <input type="email" id="email" {...register("email")} className="border border-black/35 w-full rounded-md px-3 py-1.5 sm:py-2 text-sm sm:text-base" placeholder="Ingrese el email" />
                {errors.email && <p className="text-red-500 text-xs sm:text-sm mt-0.5">{errors.email.message}</p>}
            </div>
            <div>
                <input type="password" id="password" {...register("password")} className="border border-black/35 w-full rounded-md px-3 py-1.5 sm:py-2 text-sm sm:text-base" placeholder="Ingrese la contraseña" />
                {errors.password && <p className="text-red-500 text-xs sm:text-sm mt-0.5">{errors.password.message}</p>}
            </div>
            <div>
                <input type="password" id="repeatPassword" {...register("repeatPassword")} className="border border-black/35 w-full rounded-md px-3 py-1.5 sm:py-2 text-sm sm:text-base" placeholder="Repita la contraseña" />
                {errors.repeatPassword && <p className="text-red-500 text-xs sm:text-sm mt-0.5">{errors.repeatPassword.message}</p>}
            </div>
            {error && <p className="text-red-500 text-xs sm:text-sm">{error}</p>}
            <p className="text-sm sm:text-base">¿Ya tienes una cuenta? <a href="#" onClick={(e) => { e.preventDefault(); onToggle(); }} className="text-blue-500 hover:underline">Inicia sesión</a></p>
            <button type="submit" disabled={!isValid} className="bg-gray-600 hover:bg-gray-500 disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer text-white font-bold py-1.5 sm:py-2 px-4 rounded transition-all duration-300 text-sm sm:text-base">Registrarse</button>
        </form>
    );
}
export default FormRegister;