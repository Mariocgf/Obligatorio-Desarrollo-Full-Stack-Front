const AuthContainer = () => {
    return (
        <main>
            <section className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-4xl font-bold mb-4">Iniciar sesión</h1>
                <form className="flex flex-col w-1/4">
                    <Input type="email" text="Correo electrónico" />
                    <Input type="password" text="Contraseña" />
                    <button className="bg-blue-500 text-white py-2 px-4 rounded">Entrar</button>
                </form>
            </section>
        </main>
    );
}

export default AuthContainer;