const ButtonPrimary = ({ children, onClick, className }) => {
    return (
        <button
            onClick={onClick}
            className={`bg-black text-white py-2 px-4 rounded-4xl hover:bg-gray-600 transition-all duration-300 mx-auto cursor-pointer ${className}`}
        >
            {children}
        </button>
    );
};
export default ButtonPrimary;