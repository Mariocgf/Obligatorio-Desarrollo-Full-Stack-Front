import InfoSvg from '../../assets/interface/mas.svg?react';
import EliminarSvg from '../../assets/interface/eliminar.svg?react';
import CambiarSvg from '../../assets/interface/reemplazar.svg?react';
import entradaServices from '../../service/entrada.services';
import eventoServices from '../../service/evento.services';
import { useDispatch, useSelector } from 'react-redux';
import { cargarUsuarioInfo } from '../../features/usuarioInfo.slice';
import { useState, useEffect } from 'react';
import ButtonLink from '../Button/ButtonLink';
import ButtonOption from '../Button/ButtonOption';

const CardTicket = ({ entrada }) => {
    const [eventos, setEventos] = useState([]);
    const user = useSelector((state) => state.user.usuario);
    const dispatch = useDispatch();

    // Cargar eventos disponibles al montar el componente
    useEffect(() => {
        const cargarEventos = async () => {
            try {
                const eventosData = await eventoServices.obtenerEventos();
                // Asegurarse de que sea un array
                if (Array.isArray(eventosData)) {
                    setEventos(eventosData);
                } else if (eventosData?.data && Array.isArray(eventosData.data)) {
                    setEventos(eventosData.data);
                } else if (eventosData?.eventos && Array.isArray(eventosData.eventos)) {
                    setEventos(eventosData.eventos);
                } else {
                    console.warn('La respuesta no contiene un array de eventos:', eventosData);
                    setEventos([]);
                }
            } catch (error) {
                console.error("Error cargando eventos:", error);
                setEventos([]);
            }
        };
        cargarEventos();
    }, []);

    const onClickEliminar = async () => {
        try {
            await entradaServices.bajaEntrada(entrada._id);
            const aux = user.entradas.filter(e => e._id !== entrada._id);
            const updatedUser = { ...user, entradas: aux };
            dispatch(cargarUsuarioInfo(updatedUser));
        } catch (error) {
            console.error("Error eliminando entrada:", error);
        }
        console.log(`Eliminar entrada con ID: ${entrada._id}`);
    }
    
    const onClickModificar = async (nuevoEventoId) => {
        try {
            // Aquí modificas la entrada con el nuevo evento
            await entradaServices.modificarEntrada(entrada._id, { eventoId: nuevoEventoId });
            
            // Actualizar el estado local
            const eventoActualizado = eventos.find(e => e._id === nuevoEventoId);
            const updatedUser = { 
                ...user, 
                entradas: user.entradas.map(e => 
                    e._id === entrada._id 
                        ? { ...e, evento: eventoActualizado } 
                        : e
                ) 
            };
            dispatch(cargarUsuarioInfo(updatedUser));
        } catch (error) {
            console.error("Error modificando entrada:", error);
        }
    }

    return (
       <div className="bg-white border border-black/10 p-4 sm:p-6 rounded-4xl w-full sm:w-fit h-fit overflow-hidden">
            <div className="mb-4 bg-black text-white rounded-4xl p-3 sm:p-4">
                <h3 className="text-xl sm:text-2xl font-extrabold">{entrada.evento.nombre || 'Real Madrid vs Barcelona'}</h3>
            </div>
            <div className="flex gap-4 sm:gap-6 md:gap-10 items-center justify-between sm:justify-start">
                <p className="text-base sm:text-lg md:text-xl font-bold">{new Date(entrada.evento.fechaHora).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })} - {new Date(entrada.evento.fechaHora).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</p>
                <ButtonOption 
                    onClickEliminar={onClickEliminar} 
                    onClickModificar={onClickModificar}
                    eventos={eventos}
                />
            </div>
        </div>
    );
}

export default CardTicket;
//  <div className="border border-gray-300 p-4 rounded-4xl backdrop-blur-md shrink-0 grid grid-cols-2 grid-rows-2">
//             <h4 className="font-bold text-xl mx-auto col-span-2">Real Madrid vs Barcelona{entrada.eventoNombre}</h4>
//             <p>{entrada._id}</p>
//             <hr className="col-span-2 text-black/25 my-4" />
//             <div>
//                 <h4 className="font-semibold text-gray-500">Fecha</h4>
//                 <p>{new Date(entrada.evento.fechaHora).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })} - {new Date(entrada.evento.fechaHora).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</p>
//             </div>
            // <div className='flex gap-3 items-center'>
            //     <div className="w-10 h-10 rounded-full fill-white bg-blue-500 flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors">
            //         <InfoSvg className="w-5 h-5 " />
            //     </div>
            //     <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
            //         <CambiarSvg className="w-5 h-5 " />
            //     </div>
            //     <button className="w-10 h-10 rounded-full bg-red-500 fill-white flex items-center justify-center cursor-pointer hover:bg-red-600 transition-colors" onClick={onClickEliminar} >
            //         <EliminarSvg className="w-5 h-5 " />
            //     </button>
            // </div>
//             {/* <div>
//                 <h4 className="font-semibold text-gray-500">Asiento</h4>
//                 <p>Fila A {entrada.asiento?.fila}, Asiento {entrada.asiento?.numero}</p>
//             </div> */}

//             {/* <p>Monto: {`$${Object.values(entrada.monto)[0]}`}</p> */}
//         </div>