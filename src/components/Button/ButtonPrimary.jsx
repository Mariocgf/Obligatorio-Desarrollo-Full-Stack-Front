const ButtonPrimary = ({ children, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="bg-blue-500 text-white py-2 px-4 rounded-4xl hover:bg-blue-600 transition-all duration-300 mx-auto cursor-pointer" 
        >
            {children}
        </button>
    );
};
export default ButtonPrimary;