import { useEffect, useState } from "react";
import BentoCard from "../components/BentoCard";
import CircularProgress from "../components/CircularProgress";
import usuarioServices from "../service/usuario.services";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { cargarUsuarioInfo } from "../features/usuarioInfo.slice";
import { noValid } from "../features/auth.slice";
import ButtonPrimary from "../components/Button/ButtonPrimary";
import CardTicket from "../components/Card/CardTicket";
import CardImgInfoLink from "../components/Card/CardImgInfoLink";
import CardProfile from "../components/Card/CardProfile";
import eventoServices from "../service/evento.services";
import entradaServices from "../service/entrada.services";
import Form from "../components/Form/Form";
import toast from "react-hot-toast";

import { Doughnut } from 'react-chartjs-2';
import  Grafica  from "../components/Grafica";

const UsuarioContainer = () => {
    const [loading, setLoading] = useState(true);
    const [eventos, setEventos] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.usuario);

    const getUsuarioInfo = async () => {
        setLoading(true);
        try {
            if (!user) {
                const response = await usuarioServices.getUsuarioBasicInfo();
                dispatch(cargarUsuarioInfo(response.data));
            }
        } catch (error) {
            console.error("Error fetching user info:", error);
            dispatch(noValid());
            navigate('/auth');
        } finally {
            setLoading(false);
        }
        console.log(user);

    };
    const getEventosSelect = async () => {
        try {
            const response = await eventoServices.obtenerEventoSelect();
            setEventos(response.data);
        } catch (error) {
            console.error("Error fetching eventos:", error);
        }
    };

    const handleComprarEntrada = async (evento) => {
        try {
            const response = await entradaServices.altaEntrada(evento);
            const nuevaEntrada = response.data;
            const updatedUser = { ...user, entradas: [...user.entradas, nuevaEntrada] };
            dispatch(cargarUsuarioInfo(updatedUser));
            toast.success("Entrada comprada con éxito");
        } catch (error) {
            toast.error(error.response.data.data.message || "Error al comprar entrada");
        }
    };
    const handleCambiarEntrada = async (data) => {
        console.log(data);

        try {
            const response = await entradaServices.cambiarEntrada(data.entrada, { evento: data.evento });
            const updatedEntradas = user.entradas.map(entrada =>
                entrada._id === data.entrada ? response.data : entrada
            );
            const updatedUser = { ...user, entradas: updatedEntradas };
            dispatch(cargarUsuarioInfo(updatedUser));
            toast.success("Entrada cambiada con éxito");
        } catch (error) {
            toast.error(error.response.data.data.message || "Error al cambiar entrada");
        }
    };

    useEffect(() => {
        getUsuarioInfo();
        getEventosSelect();
    }, [user]);
    if (loading) return <Loader />;
    return (
        <main className="min-h-[calc(100vh-0rem)] xl:h-[calc(100vh-0rem)] pt-20 px-6 md:px-20 lg:px-40  flex flex-col overflow-hidden">
            <h1 className="text-4xl font-bold mb-4 shrink-0">Dashboard</h1>
            <section className="grid grid-cols-1 xl:grid-cols-4 grid-rows-auto gap-4 flex-1 mb-8 min-h-0">
                <CardProfile imgSrc={user?.img} title={`${user?.nombre} ${user?.apellido}`} size={'w-full lg:w-full h-64 sm:h-80 md:h-96 lg:h-64'} />
                <BentoCard size="" title={`Plan ${user?.plan?.tipo}`}>
                    <CircularProgress current={user?.entradas?.length} total={10} premium={user?.plan?.tipo === 'Plus'} />
                    {(user?.entradas?.length === 10 && user?.plan?.tipo) === 'Plus' && (
                        <p className="text-red-600 font-semibold mt-2">Has alcanzado el límite de entradas para tu plan actual.</p>
                    )}
                    {user?.plan?.tipo === 'Plus' && <ButtonPrimary>Actualizar Plan</ButtonPrimary>}

                </BentoCard>
                <CardImgInfoLink imgSrc={user?.equipoSeguido?.img || 'https://blocks.astratic.com/img/general-img-landscape.png'} title={user?.equipoSeguido?.nombre || 'Aun no sigues ningun equipo'} description={'Equipo favorito'} size={'w-full lg:w-full h-64 sm:h-80 md:h-96 lg:h-64'} />
                <CardImgInfoLink imgSrc={user?.deportistaSeguido?.img || 'https://blocks.astratic.com/img/general-img-landscape.png'} title={user?.deportistaSeguido?.nombre || 'Aun no sigues ningun deportista'} description={'Deportista favorito'} size={'w-full lg:w-full h-64 sm:h-80 md:h-96 lg:h-64'} />
                <BentoCard size="" title="Entradas">
                    <div className="overflow-y-auto h-full pr-2 custom-scrollbar">
                        <div className="grid grid-cols-1  gap-4">
                            {user?.entradas?.map(entrada =>
                                <CardTicket key={entrada._id} entrada={entrada} />
                            )}
                            {user?.entradas?.length === 0 && (
                                <p className="text-gray-500 text-lg">No tienes entradas compradas.</p>
                            )}
                        </div>
                    </div>
                </BentoCard>

                <BentoCard size="" title="Comprar Entradas">
                    <Form onSubmit={handleComprarEntrada}
                        inputs={[
                            {
                                label: "Selecciona un evento",
                                type: "select",
                                name: "evento",
                                options: eventos.map(evento => ({
                                    value: evento._id,
                                    label: `${evento.nombre} - ${new Date(evento.fechaHora).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}`
                                }))
                            }
                        ]}
                        button="Comprar Entrada"
                        confirm={true}
                    />
                </BentoCard>

                <BentoCard size="" title="Cambiar Entradas">
                    <Form onSubmit={handleCambiarEntrada}
                        inputs={[
                            {
                                label: "Entrada Actual",
                                type: "select",
                                name: "entrada",
                                options: user?.entradas?.map(entrada => ({
                                    value: entrada._id,
                                    label: `${entrada.evento.nombre} - ${new Date(entrada.evento.fechaHora).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}`
                                })) || [],
                            },
                            {
                                label: "Nuevo Evento",
                                type: "select",
                                name: "evento",
                                options: eventos.map(evento => ({
                                    value: evento._id,
                                    label: `${evento.nombre} - ${new Date(evento.fechaHora).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}`
                                })),
                            }
                        ]}
                        button="Cambiar Entrada"
                        confirm={true}
                    />
                </BentoCard>
                <BentoCard size="" title="Estadísticas de equipo">
                    <Grafica />
                </BentoCard>
            </section>
        </main>
    );
}

export default UsuarioContainer;
