const CardInfoSm = ({elem}) => {
    return (
        <div
            key={elem._id}
            className="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-in-out bg-competicion" 
        >
            <div className="aspect-square overflow-hidden ">
                <img
                    src={elem.img}
                    alt={elem.nombre}
                    className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                />
            </div>
            <div className="p-4 bg-white">
                <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                    {elem.nombre}
                </h2>
            </div>
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-400 rounded-2xl transition-colors duration-300 pointer-events-none"></div>
        </div>
    )
}

export default CardInfoSm;