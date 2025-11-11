import { useState } from "react";
import FormLogin from "../components/FormLogin";
import FormRegister from "../components/FormRegister";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const AuthContainer = () => {
    const [showLogin, setShowLogin] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false);
    const tokenValid = useSelector((state) => state.auth.tokenIsValid);

    const toggleForm = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setShowLogin(!showLogin);
            setIsAnimating(false);
        }, 300);
    };
    if (tokenValid) return <Navigate to="/usuario" />
    return (
        <main className="min-h-[calc(100vh-4rem)]  px-4 sm:px-6 md:px-20 lg:px-40 grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-8 pt-20 pb-8 ">
            {/* <img src={ImgLogin} alt="" className="rounded-4xl h-full object-cover"/> */}
            <div className="bg-auth w-full h-full rounded-4xl"></div>
            <section className="flex flex-col items-center justify-center bg-white md:col-start-2 py-8 md:py-0 h-full rounded-4xl relative overflow-hidden text-white">
                <div className="bg-auth absolute inset-0"></div>
                <div className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'} absolute backdrop-blur-md bg-black/20 rounded-4xl`}>
                    {showLogin ? <FormLogin onToggle={toggleForm} /> : <FormRegister onToggle={toggleForm} />}
                </div>
            </section>
        </main>
    );
}

export default AuthContainer;