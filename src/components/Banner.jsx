const Banner = ({ imgSrc, titulo, descripcion, callToAction }) => {
    return (
        <div className="bg-blue-500 text-white p-4 rounded-4xl w-full h-90 relative" >
            <img src={imgSrc} alt="" className="w-full h-full object-cover object-top absolute inset-0 rounded-4xl" />
            <div className="bg-black/20 backdrop-blur-sm rounded-4xl text-white p-6 absolute inset-0 flex flex-col justify-center items-center text-center">
                <h2 className="text-4xl font-bold">{titulo}</h2>
                <p className="mt-2 mb-4">{descripcion}</p>
                {callToAction}
            </div>
        </div>
    );
};
export default Banner;