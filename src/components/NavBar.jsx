import {  useState } from 'react';
import { useSelector } from 'react-redux';

import { Link, NavLink } from 'react-router';

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const user = useSelector((state) => state.user.usuario);
    

    return (
        <nav className="w-full px-3 sm:px-4 md:px-10 lg:px-10 fixed z-50 backdrop-blur-md bg-white/10 py-2 sm:py-3 rounded-4xl">
            {/* Diseño desktop y tablet */}
            <div className="hidden md:flex justify-evenly gap-4 lg:gap-16 items-center">
                <NavLink to="/" className="text-xl lg:text-2xl font-bold whitespace-nowrap">Sportify</NavLink>
                <ul className="flex ">
                    <li className="inline-block">
                        <NavLink to="/eventos" >Eventos</NavLink>
                    </li>
                    <li className="inline-block">
                        <NavLink to="/competicion" >Competiciones</NavLink>
                    </li>
                    <li className="inline-block">
                        <NavLink to="/deportista" >Deportistas</NavLink>
                    </li>
                    <li className="inline-block">
                        <NavLink to="/equipo" >Equipos</NavLink>
                    </li>
                </ul>
                {user?
                    <Link to="/usuario" className="bg-black/25 hover:bg-gray-950 hover:scale-105 transition-all duration-300 w-fit rounded-full overflow-hidden">
                        <img src={user?.img} alt="Usuario" className="w-10 h-10 lg:w-12 lg:h-12 object-cover" />
                    </Link>
                    :
                    <NavLink to="/auth" className="bg-gray-950 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-4xl hover:scale-105 transition-all duration-300 text-sm lg:text-base whitespace-nowrap">Empieza ahora!</NavLink>
                }
            </div>

            {/* Diseño móvil */}
            <div className="md:hidden">
                <div className="flex justify-between items-center">
                    <NavLink to="/" className="text-xl sm:text-2xl font-bold">Sportify</NavLink>

                    <button
                        className="bg-gray-950/90 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl text-white hover:bg-gray-950 transition-all duration-300 hover:scale-105 active:scale-95"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                    >
                        <svg
                            className="w-5 h-5 sm:w-6 sm:h-6"
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
                        isMenuOpen ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'
                    }`}
                >
                    <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-4 sm:p-5 shadow-2xl border border-gray-200/50">
                        <ul className="flex flex-col gap-2 mb-4">
                            <li>
                                <NavLink to="/eventos" onClick={() => setIsMenuOpen(false)} className="block border border-black/10">Eventos</NavLink>
                            </li>
                            <li>
                                <NavLink to="/competicion" onClick={() => setIsMenuOpen(false)} className="block border border-black/10">Competiciones</NavLink>
                            </li>
                            <li className=''>
                                <NavLink to="/deportista" onClick={() => setIsMenuOpen(false)} className="block border border-black/10">Deportistas</NavLink>
                            </li>
                            <li>
                                <NavLink to="/equipo" onClick={() => setIsMenuOpen(false)} className="block border border-black/10">Equipos</NavLink>
                            </li>
                        </ul>
                        
                        <div className="pt-4 border-t border-gray-200">
                            {user?.nombre ? (
                                <Link 
                                    to="/usuario" 
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center gap-3 bg-gray-950 text-white py-3 px-4 rounded-2xl hover:bg-gray-800 transition-all duration-300 active:scale-95 shadow-lg"
                                >
                                    <img 
                                        src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" 
                                        alt="Usuario" 
                                        className="w-10 h-10 rounded-full border-2 border-white/20" 
                                    />
                                    <span className="font-medium text-sm sm:text-base">Mi Perfil</span>
                                </Link>
                            ) : (
                                <NavLink 
                                    to="/auth" 
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block bg-gradient-to-r from-gray-900 to-gray-950 text-white text-center py-3 px-4 rounded-2xl font-semibold hover:from-gray-800 hover:to-gray-900 transition-all duration-300 active:scale-95 shadow-lg text-sm sm:text-base"
                                >
                                    Empieza ahora!
                                </NavLink>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
export default NavBar;