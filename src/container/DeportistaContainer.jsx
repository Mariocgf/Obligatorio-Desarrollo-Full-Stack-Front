import { useEffect, useState } from "react";
import deportistaServices from "../service/deportista.services";
import CardInfoSm from "../components/CardInfoSm";
import Loader from "../components/Loader";
import CardFollow from "../components/Card/CardFollow";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { cargarUsuarioInfo } from "../features/usuarioInfo.slice";
import toast from 'react-hot-toast';
import AsideFilter from "../components/AsideFilter";

const DeportistaContainer = () => {
    const [deportistas, setDeportistas] = useState([]);
    const [equipoFiltro, setEquipoFiltro] = useState([]);
    const [filtro, setFiltro] = useState("");
    const [loading, setLoading] = useState(true);
    const user = useSelector((state) => state.user.usuario);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const obtenerDeportistas = async () => {
        setLoading(true);
        try {
            const response = await deportistaServices.obtenerDeportistas();
            const equipos = [];
            response.data.forEach(deportista => {
                if (deportista.equipo && deportista.equipo.nombre && !equipos.includes(deportista.equipo.nombre)) {
                    equipos.push(deportista.equipo.nombre);
                }
            });
            console.log(response.data);
            setEquipoFiltro(equipos);
            setDeportistas(response.data);
        } catch (error) {
            console.error("Error al obtener deportistas:", error);
        } finally {
            setLoading(false); 
        }
    };
    const handlerSeguir = async (id) => {
        if (!user)
            navigate('/auth');
        try {
            const response = await deportistaServices.seguirDeportista(id);
            const updatedUser = { ...user, deportistaSeguido: response.data };
            dispatch(cargarUsuarioInfo(updatedUser));
            console.log("Siguiendo deportista:", response.data);
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.data.message || "Error al seguir deportista");
        }
    }
    useEffect(() => {
        obtenerDeportistas(); 
    }, []);
    if (loading) return <Loader />;

    return (
        <main className="min-h-[calc(100vh-4rem)] pt-24 px-6 md:px-20 lg:px-40 py-8">
            <div className="max-w-7xl mx-auto">
                {/* Título */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Deportistas
                </h1>

                <div className="flex flex-col lg:flex-row gap-8">

                    <AsideFilter filtro={filtro} setFiltro={setFiltro} data={equipoFiltro} title={"Equipo"} />

                    <div className="flex-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {deportistas
                                .filter((deportista) => filtro === "" || deportista.equipo?.nombre === filtro)
                                .map((deportista) => (
                                    <CardFollow 
                                        key={deportista._id} 
                                        id={deportista._id} 
                                        imgSrc={deportista.img} 
                                        title={`${deportista.nombre} ${deportista.apellido}`} 
                                        handlerSeguir={handlerSeguir} 
                                        isFollow={user?.deportistaSeguido?.nombre === deportista.nombre} 
                                    />
                                ))}
                        </div>
                        {deportistas.filter((deportista) => filtro === "" || deportista.equipo?.nombre === filtro).length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-lg">No hay deportistas disponibles</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default DeportistaContainer;
