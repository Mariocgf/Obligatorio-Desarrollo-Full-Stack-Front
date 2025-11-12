import { useEffect, useState } from "react";
import equipoServices from "../service/equipo.services";
import CardFollow from "../components/Card/CardFollow";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { cargarUsuarioInfo } from "../features/usuarioInfo.slice";
import toast from "react-hot-toast";


const EquipoContainer = () => {
    const [equipos, setEquipos] = useState([]); 
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.usuario);

    const handlerSeguir = async (id) => {
        if (!user)
            navigate('/auth');
        try {
            const response = await equipoServices.seguirEquipo(id);
            const updatedUser = { ...user, equipoSeguido: response.data };
            dispatch(cargarUsuarioInfo(updatedUser));
            console.log("Siguiendo equipo:", response.data);
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.data.message || "Error al seguir equipo");
        }
    }

    const obtenerEquipos = async () => {
        setLoading(true); 
        try {
            const response = await equipoServices.obtenerEquipos(); 
            setEquipos(response.data.equipos);
        } catch (error) {
            console.error("Error al obtener equipos:", error);
        } finally {
            setLoading(false); 
        }
    };
    useEffect(() => {
        obtenerEquipos(); 
    }, []);
    if (loading) return <Loader />;
    return (
        <main className="min-h-[calc(100vh-4rem)] pt-24 px-6 md:px-20 lg:px-40 py-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Equipo
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {equipos?.map((equipo) => (
                        <CardFollow key={equipo._id} id={equipo._id} imgSrc={equipo.img} title={equipo.nombre} handlerSeguir={handlerSeguir} isFollow={user?.equipoSeguido?.nombre === equipo.nombre} />
                    ))}
                </div>
                {equipos.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No hay equipos disponibles</p>
                    </div>
                )}
            </div>
        </main>
    );
}

export default EquipoContainer;
