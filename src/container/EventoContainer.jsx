import { useEffect, useState } from "react";
import eventoServices from "../service/evento.services";
import CardEvent from "../components/Card/CardEvent";
import Loader from "../components/Loader";


const EventoContainer = () => {
    const [eventos, setEventos] = useState([]); // Estado para almacenar los eventos
    const [loading, setLoading] = useState(true); // Estado para controlar la carga
    const obtenerEventos = async () => {
        setLoading(true); // Inicio del loading
        try {
            const response = await eventoServices.obtenerEventos(); // Llamada al servicio de eventoServices y utilizo el método obtenerEventos
            setEventos(response.data); // Actualizo el estado con los datos obtenidos
        } catch (error) {
            console.error("Error al obtener eventos:", error);
        } finally {
            setLoading(false); // Fin del loading
        }
    };
    useEffect(() => {
        obtenerEventos(); // Llamo a la función para obtener los eventos cuando el componente se monta
    }, []);
    if (loading) return <Loader />;
    return (
        <main className="min-h-[calc(100vh-4rem)] pt-24 px-6 md:px-20 lg:px-40 py-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Eventos
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {eventos.map((evento) => (
                        <CardEvent key={evento._id} imgSrc={evento.img} title={evento.nombre} className={'bg-evento'} size={'w-full lg:w-full h-80 md:h-96 lg:h-120'}/>
                    ))}
                </div>
                {eventos.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No hay eventos disponibles</p>
                    </div>
                )}
            </div>
        </main>
    );
}

export default EventoContainer;
