const ButtonPrimary = ({ children, onClick, className, disabled }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`bg-black text-white py-2 px-4 rounded-4xl disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-gray-600 transition-all duration-300 mx-auto cursor-pointer ${className}`}
        >
            {children}
        </button>
    );
};
export default ButtonPrimary;