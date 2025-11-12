import { useState } from "react";

const AsideFilter = ({ filtro, setFiltro, data, title }) => {
    const [mostrarFiltros, setMostrarFiltros] = useState(false);

    return (
        <>
            <div className="lg:hidden mb-6">
                <button
                    onClick={() => setMostrarFiltros(!mostrarFiltros)}
                    className="w-full flex items-center justify-between bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
                >
                    <span className="font-semibold text-gray-800">
                        {filtro === "" ? "Filtrar por Equipo" : filtro}
                    </span>
                    <svg
                        className={`w-5 h-5 text-gray-600 transition-transform ${mostrarFiltros ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {/* Panel desplegable de filtros en móvil */}
                {mostrarFiltros && (
                    <div className="mt-4 bg-white rounded-lg shadow-md p-4 space-y-3">
                        <label className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
                            <input
                                type="radio"
                                name="data"
                                value=""
                                checked={filtro === ""}
                                onChange={(e) => {
                                    setFiltro(e.target.value);
                                    setMostrarFiltros(false);
                                }}
                                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-gray-700 font-medium">Todos</span>
                        </label>

                        {data.map((elem) => (
                            <label key={elem} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
                                <input
                                    type="radio"
                                    name="data"
                                    value={elem}
                                    checked={filtro === elem}
                                    onChange={(e) => {
                                        setFiltro(e.target.value);
                                        setMostrarFiltros(false);
                                    }}
                                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-gray-700">{elem}</span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* Sidebar de filtros para desktop */}
            <aside className="hidden lg:block w-64 shrink-0">
                <div className="bg-white rounded-4xl  p-6 sticky top-24">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Filtrar por {title}</h3>
                    <div className="space-y-3">
                        {/* Opción "Todos" */}
                        <label className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
                            <input
                                type="radio"
                                name="dataFiltroDesktop"
                                value=""
                                checked={filtro === ""}
                                onChange={(e) => setFiltro(e.target.value)}
                                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-gray-700 font-medium">Todos</span>
                        </label>

                        {data.map((elem) => (
                            <label key={elem} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
                                <input
                                    type="radio"
                                    name="dataFiltroDesktop"
                                    value={elem}
                                    checked={filtro === elem}
                                    onChange={(e) => setFiltro(e.target.value)}
                                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-gray-700">{elem}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </aside>
        </>
    );
};

export default AsideFilter;
