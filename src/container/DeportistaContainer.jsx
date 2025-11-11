import { useEffect, useState } from "react";
import deportistaServices from "../service/deportista.services";
import CardInfoSm from "../components/CardInfoSm";
import Loader from "../components/Loader";
import CardFollow from "../components/Card/CardFollow";
import { useSelector } from "react-redux";


const DeportistaContainer = () => {
    const [deportistas, setDeportistas] = useState([]); // Estado para almacenar los deportistas
    const [loading, setLoading] = useState(true); // Estado para controlar la carga
    const user = useSelector((state) => state.user.usuario);
    const obtenerDeportistas = async () => {
        setLoading(true); // Inicio del loading
        try {
            const response = await deportistaServices.obtenerDeportistas(); // Llamada al servicio de deportistaServices y utilizo el método obtenerDeportistas
            setDeportistas(response.data); // Actualizo el estado con los datos obtenidos
        } catch (error) {
            console.error("Error al obtener deportistas:", error);
        } finally {
            setLoading(false); // Fin del loading
        }
    };
    const handlerSeguir = async (id) => {
        // Lógica para seguir a un deportista
        console.log("Seguir deportista con ID:", id);
    }
    useEffect(() => {
        obtenerDeportistas(); // Llamo a la función para obtener los deportistas cuando el componente se monta
    }, []);
    if (loading) return <Loader />;

    return (
        <main className="min-h-[calc(100vh-4rem)] pt-24 px-6 md:px-20 lg:px-40 py-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Deportista
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {deportistas.map((deportista) => (
                        <CardFollow key={deportista._id} id={deportista._id} imgSrc={deportista.img} title={`${deportista.nombre} ${deportista.apellido}`} handlerSeguir={handlerSeguir} isFollow={user?.equipoSeguido?.nombre === deportista.nombre} />
                    ))}
                </div>
                {deportistas.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No hay deportistas disponibles</p>
                    </div>
                )}
            </div>
        </main>
    );
}

export default DeportistaContainer;
