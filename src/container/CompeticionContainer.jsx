import { useEffect, useState } from "react";
import competicionServices from "../service/competicion.services";
import CardInfoSm from "../components/CardInfoSm";
import Loader from "../components/Loader";

const CompeticionContainer = () => {
    const [competiciones, setCompeticiones] = useState([]); // Estado para almacenar las competiciones
    const [loading, setLoading] = useState(true); // Estado para controlar la carga
    const obtenerCompeticiones = async () => {
        setLoading(true); // Inicio del loading
        try {
            const response = await competicionServices.obtenerCompeticiones(); // Llamada al servicio de competicionServices y utilizo el método obtenerCompeticiones
            setCompeticiones(response.data); // Actualizo el estado con los datos obtenidos
        } catch (error) {
            console.error("Error al obtener competiciones:", error);
        } finally {
            setLoading(false); // Fin del loading
        }
    };
    useEffect(() => {
        obtenerCompeticiones(); // Llamo a la función para obtener las competiciones cuando el componente se monta
    }, []);
    if (loading) return <Loader />;
    return (
        <main className="min-h-[calc(100vh-4rem)] bg pt-24 px-6 md:px-20 lg:px-40 py-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Competiciones
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {competiciones.map((competicion) => (
                        <CardInfoSm key={competicion._id} elem={competicion} />
                    ))}
                </div>
                {competiciones.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No hay competiciones disponibles</p>
                    </div>
                )}
            </div>
        </main>
    );
}

export default CompeticionContainer;
