import { useState } from 'react';
import ArrowUpRight from "../../assets/interface/arrow-small-right.svg?react";
import PlusSvg from '../../assets/interface/mas.svg?react';
import EliminarSvg from '../../assets/interface/eliminar.svg?react';
import CambiarSvg from '../../assets/interface/reemplazar.svg?react';

const ButtonOption = ({ onClickEliminar, onClickModificar, onClickInfo, eventos = [] }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedEvento, setSelectedEvento] = useState('');

    const handleModificarClick = () => {
        setShowModal(true);
        setIsOpen(false);
    };

    const handleConfirm = () => {
        if (selectedEvento && onClickModificar) {
            onClickModificar(selectedEvento);
        }
        setShowModal(false);
        setSelectedEvento('');
    };

    const handleCancel = () => {
        setShowModal(false);
        setSelectedEvento('');
    };

    return (
        <>
            <div className={`bg-gray-950 rounded-4xl overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'h-[232px]' : 'h-14'}`}>
                {/* Botón principal con estilos de ButtonLink */}
                <button onClick={() => setIsOpen(!isOpen)} className="bg-gray-950 text-white p-4 w-14 h-14 flex items-center justify-center">
                    <PlusSvg className={`w-5 h-5 fill-white transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`} />
                </button>

                {/* Menú desplegable con los tres botones */}
                <div className={`flex flex-col gap-3 items-center p-3 transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <button onClick={(e) => { e.stopPropagation();onClickInfo?.();setIsOpen(false);}} className="w-10 h-10 rounded-full fill-white bg-blue-500 flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-all duration-200" style={{ transitionDelay: isOpen ? '100ms' : '0ms' }}>
                        <ArrowUpRight className="w-5 h-5 -rotate-45" />
                    </button>
                    <button onClick={(e) => {e.stopPropagation();handleModificarClick();}} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-all duration-200" style={{ transitionDelay: isOpen ? '150ms' : '0ms' }}>
                        <CambiarSvg className="w-5 h-5" />
                    </button>
                    <button onClick={(e) => {e.stopPropagation();onClickEliminar?.();setIsOpen(false);}} className="w-10 h-10 rounded-full bg-red-500 fill-white flex items-center justify-center cursor-pointer hover:bg-red-600 transition-all duration-200" style={{ transitionDelay: isOpen ? '200ms' : '0ms' }}>
                        <EliminarSvg className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div 
                    className="fixed inset-0 bg-black/10 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300"
                    onClick={handleCancel}
                >
                    <div 
                        className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl transform transition-all duration-300 scale-100"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Cambiar Evento</h2>
                        
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Selecciona un evento
                            </label>
                            <select
                                value={selectedEvento}
                                onChange={(e) => setSelectedEvento(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900"
                            >
                                <option value="">-- Selecciona un evento --</option>
                                {Array.isArray(eventos) && eventos.map((evento) => (
                                    <option key={evento._id || evento.id} value={evento._id || evento.id}>
                                        {evento.nombre} - {new Date(evento.fechaHora || evento.fecha).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={handleCancel}
                                className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleConfirm}
                                disabled={!selectedEvento}
                                className="px-6 py-2.5 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 font-medium"
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ButtonOption;
