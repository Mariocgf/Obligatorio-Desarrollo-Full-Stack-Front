import { Link } from "react-router";
import ArrowUpRight from "../../assets/interface/arrow-small-right.svg?react";

const CardImgInfoLink = ({ imgSrc, title, description, link, size }) => {
    return (
        <div className={`bg-white rounded-4xl ${size ? size : 'w-full lg:w-full h-64 sm:h-80 md:h-96 lg:h-120'} overflow-hidden relative`}>
            <img src={imgSrc} alt="" className="w-full h-full object-cover absolute inset-0 object-top" />


            {link ?
                <div className={`bg-black/25 backdrop-blur-md rounded-4xl text-white p-4 sm:p-6 md:p-8 absolute bottom-0 w-full grid grid-cols-1 sm:grid-cols-2 gap-4`}>
                    <div className="flex flex-col sm:flex-row">
                        <p className="text-sm sm:text-base md:text-lg sm:border-r sm:pr-4 sm:mr-4">{title}</p>
                        <p className="font-light text-sm sm:text-base">{description}</p>
                    </div>
                    <Link to={link} className="bg-gray-950 text-white p-3 sm:p-4 rounded-4xl w-fit justify-self-start sm:justify-self-end self-center"><ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 fill-white -rotate-45" /></Link>
                </div>
                :
                <div className={`bg-black/25 backdrop-blur-md rounded-4xl text-white p-4 sm:p-6 md:p-8 absolute bottom-0 w-full `}>
                    <div className="flex flex-col ">
                        <p className="text-sm sm:text-base md:text-lg font-semibold sm:pr-4 sm:mr-4">{title}</p>
                        <p className="font-light text-sm sm:text-base">{description}</p>
                    </div>

                </div>
            }
        </div>
    );
}
export default CardImgInfoLink;