import ButtonPrimary from "../Button/ButtonPrimary";
import Check from "../../assets/interface/check.svg?react";


const CardFollow = ({id, imgSrc, title, className, size, isFollow =false, handlerSeguir={handlerSeguir} }) => {
    const handlerOnClick = () => {
        handlerSeguir(id);
    }
    return (
        <div className={`bg-white rounded-4xl ${className} ${size ? size : 'w-full lg:w-full h-64 sm:h-80 md:h-96 lg:h-120'} overflow-hidden relative`}>
            <img src={imgSrc} alt="" className="w-full h-full object-cover absolute inset-0" />

                <div className={`bg-black/25 backdrop-blur-md rounded-4xl text-white p-4 sm:p-6 md:p-8 absolute bottom-0 w-full `}>
                    <div className="flex flex-col ">
                        <p className="text-sm sm:text-base md:text-lg font-semibold sm:pr-4 sm:mr-4">{title}</p>
                        <ButtonPrimary onClick={handlerOnClick} className="w-full flex gap-2 justify-center">{isFollow ? <>Siguiendo <Check className="w-6 h-6  fill-white" /></>: 'Seguir'} </ButtonPrimary>
                    </div>

                </div>
            
        </div>
    );
};

export default CardFollow;
