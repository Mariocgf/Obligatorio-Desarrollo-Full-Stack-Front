import CardImgInfoLink from "./Card/CardImgInfoLink";
import CardImgLink from "./Card/CardImgLink";
import CardInfoLink from "./Card/CardInfoLink";
import JoinUsImg from "../assets/joinUs.webp";
import EventImg from "../assets/event.webp";
import { useTranslation } from "react-i18next";

const Hero = ({data}) => {
    const { t } = useTranslation();
    
    return (
        <section className="flex flex-col lg:flex-row px-4 sm:px-8 md:px-20 lg:px-40 py-10 sm:py-12 md:py-16 lg:py-20 justify-between gap-8 lg:gap-4 border-b-2 border-gray-300">
                <div className="flex flex-col gap-4 w-full lg:w-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex gap-4">
                        <CardInfoLink title={t('home.hero.competitions')} description={`+${data?.competicionesTotales}`} link="/competicion" />
                        <CardInfoLink title={t('home.hero.athletes')} description={`+${data?.deportistasTotales}`} link="/deportista" />
                        <CardInfoLink title={t('home.hero.teams')} description={`+${data?.equiposTotales}`} link="/equipo" />
                        <CardImgLink imgSrc={EventImg} title={t('home.hero.events')} link="/eventos" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold max-w-full lg:w-200">{t('home.hero.title')}</h1>
                </div>
                <CardImgInfoLink imgSrc={JoinUsImg} title={t('home.hero.joinUs')} description={t('home.hero.joinUsDescription')} link="/auth" />
            </section>
    );
}
export default Hero;