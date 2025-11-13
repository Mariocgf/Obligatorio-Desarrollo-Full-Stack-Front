import Hero from "../components/Hero";
import Img from "../assets/banner.webp";
import Img2 from "../assets/estadistica.webp";
import Img3 from "../assets/entrada.webp";
import Img4 from "../assets/fecha.webp";
import Img5 from "../assets/deportes.webp";

import { Link } from "react-router";
import CardImgInfoLink from "../components/Card/CardImgInfoLink";
import CardInfoLink from "../components/Card/CardInfoLink";
import CardImgLink from "../components/Card/CardImgLink";
import { useEffect, useState } from "react";
import dataServices from "../service/data.services";
import Loader from "../components/Loader";
import Banner from "../components/Banner";
import { useTranslation } from "react-i18next";

const HomeContainer = () => {
    const { t } = useTranslation();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const obtenerDatos = async () => {
        setLoading(true);
        try {
            const response = await dataServices.datoCant();
            setData(response.data);
        } catch (error) {
            console.error("Error al obtener datos:", error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        obtenerDatos();
    }, []);
    if(loading) return <Loader />
    return (
        <main>
            <Hero data={data} />
            <section className="flex flex-col px-4 sm:px-8 md:px-20 lg:px-40 py-10 sm:py-12 md:py-16 lg:py-20 justify-between gap-8 lg:gap-4 border-b-2 border-gray-300">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold sm:mb-8">{t('home.features.title')}</h2>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
                    <CardImgInfoLink imgSrc={Img2} title={t('home.features.statistics.title')} description={t('home.features.statistics.description')} />
                    <CardImgInfoLink imgSrc={Img3} title={t('home.features.tickets.title')} description={t('home.features.tickets.description')} />
                    <CardImgInfoLink imgSrc={Img4} title={t('home.features.dates.title')} description={t('home.features.dates.description')} />
                    <CardImgInfoLink imgSrc={Img5} title={t('home.features.sports.title')} description={t('home.features.sports.description')} />
                </div>
            </section>
            <section className="flex  px-4 sm:px-8 md:px-20 lg:px-40 py-10 sm:py-12 md:py-16 lg:py-20 justify-between gap-8 lg:gap-4 border-b-2 border-gray-300">
                <Banner imgSrc={Img} titulo={t('home.banner.title')} descripcion={t('home.banner.description')} callToAction={<Link to="/auth" className="bg-gray-950 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-4xl hover:scale-105 transition-all duration-300 text-sm lg:text-base whitespace-nowrap">{t('home.banner.cta')}</Link>} />
            </section>
            
        </main>
    );
}
export default HomeContainer;