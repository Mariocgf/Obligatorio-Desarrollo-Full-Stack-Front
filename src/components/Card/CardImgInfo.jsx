const CardImgInfo = ({ imgSrc, title, className , size }) => {
    return (
        <div className={`bg-white rounded-4xl ${className} ${size ? size : 'w-full lg:w-full h-64 sm:h-80 md:h-96 lg:h-120'} overflow-hidden relative`}>
            <img src={imgSrc} alt="" className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-300" />
                <div className={`bg-black/25 backdrop-blur-md rounded-4xl text-white p-4 sm:p-6 md:p-8 absolute bottom-0 w-full `}>
                    <div className="flex flex-col ">
                        <p className="text-sm sm:text-base md:text-lg font-semibold sm:pr-4 sm:mr-4">{title}</p>
                    </div>

                </div>
            
        </div>
    );
};
export default CardImgInfo;