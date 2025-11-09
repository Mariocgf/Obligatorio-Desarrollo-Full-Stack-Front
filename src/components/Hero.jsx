import CardImgInfoLink from "./Card/CardImgInfoLink";
import CardImgLink from "./Card/CardImgLink";
import CardInfoLink from "./Card/CardInfoLink";
import JoinUsImg from "../assets/joinUs.webp";
import EventImg from "../assets/event.webp";

const Hero = ({data}) => {
    return (
        <section className="flex flex-col lg:flex-row px-4 sm:px-8 md:px-20 lg:px-40 py-10 sm:py-12 md:py-16 lg:py-20 justify-between gap-8 lg:gap-4 border-b-2 border-gray-300">
                <div className="flex flex-col gap-4 w-full lg:w-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex gap-4">
                        <CardInfoLink title="Competiciones" description={`+${data?.competicionesTotales}`} link="/competicion" />
                        <CardInfoLink title="Deportistas" description={`+${data?.deportistasTotales}`} link="/deportista" />
                        <CardInfoLink title="Equipos" description={`+${data?.equiposTotales}`} link="/equipo" />
                        <CardImgLink imgSrc={EventImg} title="Eventos" link="/eventos" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold max-w-full lg:w-200">Sigue a tus equipos, deportistas favoritos, y compra entradas para verlos</h1>
                </div>
                <CardImgInfoLink imgSrc={JoinUsImg} title="únete a nuestra plataforma" description="& empieza a disfrutar" link="/auth" />
            </section>
    );
}
export default Hero;