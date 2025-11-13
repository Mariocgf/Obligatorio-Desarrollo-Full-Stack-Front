import ButtonPrimary from "../../components/Button/ButtonPrimary";
import Cart from "../../assets/interface/cart.svg?react";
import entradaServices from "../../service/entrada.services";
import { useDispatch, useSelector } from "react-redux";
import { cargarUsuarioInfo } from "../../features/usuarioInfo.slice";
import toast from "react-hot-toast";


const CardEvent = ({ imgSrc, title, className, size, id, fecha }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.usuario);


    const fechaEvento = new Date(fecha);
    const fechaActual = new Date();
    const eventoPasado = fechaEvento < fechaActual;
    
    const handleComprar = async () => {
        try {
            const response = await entradaServices.altaEntrada({evento:id});
            const nuevaEntrada = response.data;
            const updatedUser = { ...user, entradas: [...user.entradas, nuevaEntrada] };
            dispatch(cargarUsuarioInfo(updatedUser));
            toast.success("Entrada comprada con éxito");
        } catch (error) {
            console.error("Error al comprar entrada:", error);
            toast.error(error.response.data.data.message || "Error al comprar entrada");
        }
    }

    return (
        <div className={`bg-white rounded-4xl ${className} ${size ? size : 'w-full lg:w-full h-64 sm:h-80 md:h-96 lg:h-120'} overflow-hidden relative`}>
            <img src={imgSrc} alt="" className="w-full h-full object-cover absolute inset-0" />

            <div className={`bg-black/25 backdrop-blur-md rounded-4xl text-white p-4 sm:p-6 md:p-8 absolute bottom-0 w-full `}>
                <div className="flex flex-col ">
                    <p className="text-sm sm:text-base md:text-lg font-semibold sm:pr-4 sm:mr-4">{title}</p>
                    
                    {eventoPasado ? 
                        <p className="text-xs sm:text-sm text-red-300 mt-1 text-center">Evento finalizado</p>
                     : <ButtonPrimary onClick={handleComprar} className="w-full">
                        <Cart className="w-6 h-6 mx-auto fill-white" />
                    </ButtonPrimary>}
                </div>

            </div>

        </div>
    );
};

export default CardEvent;
