import { useState } from 'react';
import { NavLink } from 'react-router';

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="mt-4 w-full px-4 md:px-10 fixed top-0 z-50">
            {/* Diseño desktop original */}
            <div className="hidden md:flex justify-evenly items-center">
                <NavLink to="/" className="text-2xl font-bold ">Sportify</NavLink>
                <ul className="bg-black/35 p-4 rounded-2xl text-white/90 backdrop-blur-md flex gap-4">
                    <li className="inline-block">
                        <NavLink to="/eventos" className="">Eventos</NavLink>
                    </li>
                    <li className="inline-block">
                        <NavLink to="/competicion" className="">Competiciones</NavLink>
                    </li>
                    <li className="inline-block">
                        <NavLink to="/deportista" className="">Deportistas</NavLink>
                    </li>
                    <li className="inline-block">
                        <NavLink to="/equipo" className="">Equipos</NavLink>
                    </li>
                </ul>
                <div className="flex gap-4">
                    <a href="http://" className="bg-gray-950 text-white py-2 px-4 rounded">Unirse</a>
                    <a href="http://" className="bg-gray-950 text-white py-2 px-4 rounded">Entrar</a>
                </div>
            </div>

            {/* Diseño móvil */}
            <div className="md:hidden">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Sportify</h1>
                    
                    <button 
                        className="bg-black/35 p-3 rounded-lg backdrop-blur-md text-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg 
                            className="w-6 h-6" 
                            fill="none" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            {isMenuOpen ? (
                                <path d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Menú móvil desplegable hacia abajo */}
                <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                    }`}
                >
                    <div className="bg-black/35 backdrop-blur-md rounded-2xl p-4">
                        <ul className="flex flex-col gap-3 text-white/90 mb-4">
                            <li>
                                <a href="#" className="block py-2 px-3 hover:bg-white/10 rounded transition-colors">Eventos</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 px-3 hover:bg-white/10 rounded transition-colors">Competiciones</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 px-3 hover:bg-white/10 rounded transition-colors">Deportistas</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 px-3 hover:bg-white/10 rounded transition-colors">Equipos</a>
                            </li>
                        </ul>
                        <div className="flex flex-col gap-3 pt-3 border-t border-white/20">
                            <a href="http://" className="bg-gray-950 text-white text-center py-2 px-4 rounded">Unirse</a>
                            <a href="http://" className="bg-gray-950 text-white text-center py-2 px-4 rounded">Entrar</a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
export default NavBar;