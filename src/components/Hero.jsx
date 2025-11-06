const Hero = () => {
    return (
        <section className="hero py-20 flex flex-col justify-center">
            <div className="container mx-auto p-6 text-center hero-text backdrop-blur-xs">
                <h2 className="text-8xl font-bold mb-4 ">Bienvenido a Sportify</h2>
                <p className="text-lg mb-6">La mejor plataforma para seguir tus deportes favoritos.</p>
                <a href="#" className="bg-white text-gray-950 py-2 px-4 rounded">Comenzar</a>
            </div>
        </section>
    );
}
export default Hero;