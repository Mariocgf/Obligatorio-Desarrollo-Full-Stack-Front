import { useState } from "react";
import ButtonPrimary from "./ButtonPrimary";

const ButtonConfirm = ({ children, onConfirm }) => {
    const [confirmar, setConfirmar] = useState(false);
    const handleConfirmar = (e) => {
        e.preventDefault();
        setConfirmar(true);
    }
    const handleConfirmacion = () => {
        if (onConfirm) {
            onConfirm();
        }
        // Resetear después de un delay para que el form se envíe primero
        setTimeout(() => setConfirmar(false), 100);
    }
    if(!confirmar) return <ButtonPrimary onClick={handleConfirmar}>{children}</ButtonPrimary>
    return (
        <button type="submit" onClick={handleConfirmacion} className="relative bg-green-500 text-white py-2 px-4 rounded-4xl hover:bg-green-600 transition-all duration-300 cursor-pointer mx-auto ">
            <span className="absolute inset-0 inline-flex rounded-4xl bg-green-400 opacity-50 animate-ping-small pointer-events-none"></span>
            <span className="relative">Confirmar</span>
        </button>
    );
};

export default ButtonConfirm;
