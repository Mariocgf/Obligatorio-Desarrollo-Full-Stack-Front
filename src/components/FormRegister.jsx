const FormRegister = ({ onToggle }) => {
    return (
        <form className=" rounded-2xl p-8 flex flex-col gap-6 w-full max-w-md ">
            <h1 className="text-4xl font-bold mb-4">Registrarse</h1>
            <div>
                <label htmlFor="name">Nombre:</label>
                <input type="text" id="name" name="name" required className="border border-black/35 w-full rounded-md px-4 py-2" placeholder="Ingrese su nombre" />
            </div>
            <div>
                <label htmlFor="apellido">Apellido:</label>
                <input type="text" id="apellido" name="apellido" required className="border border-black/35 w-full rounded-md px-4 py-2" placeholder="Ingrese su apellido" />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required className="border border-black/35 w-full rounded-md px-4 py-2" placeholder="Ingrese el email" />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required className="border border-black/35 w-full rounded-md px-4 py-2" placeholder="Ingrese la contraseña" />
            </div>
            <div>
                <label htmlFor="confirm-password">Confirm Password:</label>
                <input type="password" id="confirm-password" name="confirm-password" required className="border border-black/35 w-full rounded-md px-4 py-2" placeholder="Confirme la contraseña" />
            </div>
            <p>Ya tienes una cuenta? <a href="#" onClick={(e) => { e.preventDefault(); onToggle(); }} className="text-blue-500 hover:underline">Inicia sesión</a></p>
            <button type="submit" className="bg-gray-600 hover:bg-gray-500 cursor-pointer text-white font-bold py-2 px-4 rounded transition-all duration-300">Registrarse</button>
        </form>
    );
}
export default FormRegister;