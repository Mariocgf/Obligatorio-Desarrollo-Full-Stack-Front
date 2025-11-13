import { useState } from "react";
import ButtonPrimary from "../components/Button/ButtonPrimary";
import toast from "react-hot-toast";
import usuarioServices from "../service/usuario.services";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { cargarUsuarioInfo } from "../features/usuarioInfo.slice";

const UpdateImgContainer = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.usuario);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            validateAndSetImage(file);
        }
    };

    const validateAndSetImage = (file) => {
        // Validar tipo de archivo
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            toast.error('Por favor, selecciona una imagen válida (JPEG, PNG, GIF, WEBP)');
            return;
        }

        // Validar tamaño (por ejemplo, máximo 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB en bytes
        if (file.size > maxSize) {
            toast.error('La imagen es demasiado grande. Máximo 5MB');
            return;
        }

        setSelectedImage(file);
        
        // Crear preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        
        const file = e.dataTransfer.files[0];
        if (file) {
            validateAndSetImage(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!selectedImage) {
            toast.error('Por favor, selecciona una imagen');
            return;
        }

        setLoading(true);
        
        try {
            // Aquí irá la lógica para subir la imagen
            const formData = new FormData();
            formData.append('img', selectedImage);            
            const response = await usuarioServices.updateImage(formData);
            console.log(response);
            const userUpdated = { ...user, img: response.data.img };
            dispatch(cargarUsuarioInfo(userUpdated));
            
            toast.success('Imagen cargada con éxito');
            navigate('/usuario');
            handleClear();
        } catch (error) {
            console.error('Error uploading image:', error);
            toast.error(error.response?.data?.data?.message || 'Error al cargar la imagen');
        } finally {
            setLoading(false);
        }
    };

    const handleClear = () => {
        setSelectedImage(null);
        setPreviewUrl(null);
    };

    return (
        <main className="min-h-[calc(100vh-4rem)] px-4 sm:px-6 md:px-20 lg:px-40 flex items-center justify-center py-20">
            <section className="bg-white rounded-4xl p-8 md:p-12 w-full max-w-2xl shadow-lg relative overflow-hidden">
                {/* Fondo decorativo */}
                <div className="bg-auth absolute inset-0 opacity-5"></div>
                
                <div className="relative z-10">
                    <h1 className="text-4xl font-bold mb-2 text-gray-900">Cargar Imagen</h1>
                    <p className="text-gray-600 mb-8">Sube tu imagen de perfil o cualquier otra imagen</p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        {/* Área de carga de imagen */}
                        <div
                            className={`border-2 border-dashed rounded-2xl p-8 transition-all duration-300 ${
                                isDragging
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-300 hover:border-gray-400'
                            }`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            {previewUrl ? (
                                <div className="flex flex-col items-center gap-4">
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        className="max-h-64 w-auto rounded-lg object-contain shadow-md"
                                    />
                                    <p className="text-sm text-gray-600">
                                        {selectedImage.name} ({(selectedImage.size / 1024).toFixed(2)} KB)
                                    </p>
                                    <button
                                        type="button"
                                        onClick={handleClear}
                                        className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                                    >
                                        Eliminar imagen
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-4 text-center">
                                    <svg
                                        className="w-16 h-16 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                        />
                                    </svg>
                                    <div>
                                        <label
                                            htmlFor="image-upload"
                                            className="cursor-pointer text-blue-500 hover:text-blue-700 font-medium transition-colors"
                                        >
                                            Haz clic para seleccionar
                                        </label>
                                        <span className="text-gray-500"> o arrastra y suelta</span>
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        PNG, JPG, GIF, WEBP hasta 5MB
                                    </p>
                                </div>
                            )}
                            <input
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </div>

                        {/* Botones */}
                        <div className="flex gap-4 justify-end">
                            {selectedImage && (
                                <button
                                    type="button"
                                    onClick={handleClear}
                                    className="border-2 border-gray-300 text-gray-700 py-2 px-6 rounded-4xl hover:bg-gray-100 transition-all duration-300 cursor-pointer"
                                >
                                    Cancelar
                                </button>
                            )}
                            <ButtonPrimary
                                className={`${loading ? 'opacity-50 cursor-not-allowed' : ''} ${
                                    !selectedImage ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                                onClick={handleSubmit}
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <svg
                                            className="animate-spin h-5 w-5"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        Subiendo...
                                    </span>
                                ) : (
                                    'Subir Imagen'
                                )}
                            </ButtonPrimary>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
};

export default UpdateImgContainer;
