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

const UsuarioContainer = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.usuario);

    const getUsuarioInfo = async () => {
        setLoading(true);
        try {
            if(!user){
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
    
    useEffect(() => {
        getUsuarioInfo();
    }, [user]);
    if (loading) return <Loader />;
    return (
        <main className="min-h-[calc(100vh-4rem)] xl:h-[calc(100vh-4rem)] bgs pt-20 px-6 md:px-20 lg:px-40 py-8 flex flex-col overflow-hidden">
            <h1 className="text-4xl font-bold mb-4 shrink-0">Dashboard</h1>
            <section className="grid grid-cols-1 xl:grid-cols-4 grid-rows-auto gap-4 flex-1 mb-8 min-h-0">
                <CardProfile imgSrc={user?.imgURI} title={`${user?.nombre} ${user?.apellido}`} size={'w-full lg:w-full h-64 sm:h-80 md:h-96 lg:h-64'}  />
                <BentoCard size="" title={`Plan ${user?.plan?.tipo}`}>
                        <CircularProgress current={user?.entradas?.length} total={10} />
                        {(user?.entradas?.length === 10 && user?.plan?.tipo) === 'plus' && (
                            <p className="text-red-600 font-semibold mt-2">Has alcanzado el límite de entradas para tu plan actual.</p>
                        )}
                        {user?.plan?.tipo === 'plus' && <ButtonPrimary>Actualizar Plan</ButtonPrimary>}

                    {/* <button onClick={logOut} className="mt-auto bg-red-600 hover:bg-red-500 cursor-pointer text-white font-bold py-2 px-4 rounded transition-all duration-300 w-full">Cerrar Sesión</button> */}
                </BentoCard>
                <CardImgInfoLink imgSrc="https://upload.wikimedia.org/wikipedia/sco/5/56/Real_Madrid_CF.svg" title={`Real Madrid`} description={'Equipo favorito'} size={'w-full lg:w-full h-64 sm:h-80 md:h-96 lg:h-64'}  />
                <CardImgInfoLink imgSrc="https://assets.laliga.com/squad/2025/t186/p244855/2048x2048/p244855_t186_2025_1_003_000.png" title={`Jude Bellingham`} description={'Jugador Favorito'} size={'w-full lg:w-full h-64 sm:h-80 md:h-96 lg:h-64'}  />
                <BentoCard size="xl:col-span-3 xl:row-span-3" title="Entradas">
                    <div className="overflow-y-auto h-full pr-2 custom-scrollbar">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {user?.entradas?.map(entrada =>
                                <CardTicket key={entrada._id} entrada={entrada} />
                            )}
                            {user?.entradas?.length === 0 && (
                                <p className="text-gray-500 text-lg">No tienes entradas compradas.</p>
                            )}
                        </div>
                    </div>
                </BentoCard>
                
                {/* <BentoCard size="xl:col-span-1" title="Equipos Favoritos">
                    <div className="flex justify-between">
                        <h3 className="font-bold text-black/80 text-2xl">Real Madrid</h3>
                        <img src="https://upload.wikimedia.org/wikipedia/sco/5/56/Real_Madrid_CF.svg" alt="" className="w-18" />
                    </div>
                </BentoCard>
                <BentoCard size="xl:col-span-1 xl:col-start-5" title="Deportista Favoritos">
                    <div className="flex justify-between">
                        <h3 className="font-bold text-black/80 text-2xl">Jude Bellingham</h3>
                        <img src="https://assets.laliga.com/squad/2025/t186/p244855/2048x2048/p244855_t186_2025_1_003_000.png" alt="" className="w-20 h-26 object-cover" />
                    </div>
                </BentoCard> */}
            </section>
        </main>
    );
}

export default UsuarioContainer;
