import Hero from "../components/Hero";
import Img from "../assets/img_1.jpeg";

const HomeContainer = () => {
    return (
        <main>
            <Hero />
            <section className="flex px-40 py-20 justify-between items-center border-b-2 border-gray-300">
                <div>
                    <h2 className="text-3xl font-bold mb-4">Estadísticas en tiempo real</h2>
                    <p className="text-lg">Consulta las estadísticas de tus deportes, competiciones y equipos favoritos.</p>
                </div>
                <img src={Img} alt="" className="w-1/4" />
            </section>
            <section className="flex px-40 py-20 justify-between items-center border-b-2 border-gray-300">
                <img src={Img} alt="" className="w-1/4" />
                <div>
                    <h2 className="text-3xl font-bold mb-4">Análisis detallado</h2>
                    <p className="text-lg">Accede a información completa sobre rendimiento de equipos y competiciones deportivas.</p>
                </div>
            </section>
            <section className="flex px-40 py-20 justify-between items-center border-b-2 border-gray-300">
                <div>
                    <h2 className="text-3xl font-bold mb-4">Análisis detallado</h2>
                    <p className="text-lg">Accede a información completa sobre rendimiento de equipos y competiciones deportivas.</p>
                </div>
                <img src={Img} alt="" className="w-1/4" />
            </section>
        </main>
    );
}
export default HomeContainer;