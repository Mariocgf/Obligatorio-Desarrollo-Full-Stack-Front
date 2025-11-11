import { useEffect, useState } from "react";
import competicionServices from "../service/competicion.services";
import Loader from "../components/Loader";
import CardImgInfo from "../components/Card/CardImgInfo";

const CompeticionContainer = () => {
    const [competiciones, setCompeticiones] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const obtenerCompeticiones = async () => {
        setLoading(true); 
        try {
            const response = await competicionServices.obtenerCompeticiones(); 
            setCompeticiones(response.data);
        } catch (error) {
            console.error("Error al obtener competiciones:", error);
        } finally {
            setLoading(false); 
        }
    };
    useEffect(() => {
        obtenerCompeticiones(); 
    }, []);
    if (loading) return <Loader />;
    return (
        <main className="min-h-[calc(100vh-4rem)] pt-24 px-6 md:px-20 lg:px-40 py-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Competiciones
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {competiciones.map((competicion) => (
                        <CardImgInfo key={competicion._id} imgSrc={competicion.img} title={competicion.nombre} className={'bg-competicion'} size={'w-full lg:w-full h-64 sm:h-80 md:h-96 lg:h-120'}/>
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
