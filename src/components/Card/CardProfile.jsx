import { Link } from "react-router";
import ChangeImg from "../../assets/interface/images-user.svg?react";
import LogOutSvg from "../../assets/interface/logout.svg?react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router"
import { limpiarUsuarioInfo } from "../../features/usuarioInfo.slice";
import { noValid } from "../../features/auth.slice";



const CardProfile = ({ imgSrc, title, size }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logOut = () => {
        localStorage.clear();
        dispatch(limpiarUsuarioInfo());
        dispatch(noValid());
        navigate('/');
    }
    return (
        <div className={`bg-white rounded-4xl ${size ? size : 'w-full lg:w-full h-64 sm:h-80 md:h-96 lg:h-120'} overflow-hidden relative`}>
            <img src={imgSrc} alt="" className="w-full h-full object-cover absolute inset-0" />
            <div className={`bg-black/25 backdrop-blur-md rounded-4xl text-white p-4 sm:p-6 md:p-8 absolute bottom-0 w-full `}>
                <div className="flex justify-between items-center">
                    <p className="text-sm sm:text-base md:text-lg font-semibold sm:pr-4 sm:mr-4">{title}</p>
                    <div className="flex gap-4">
                        <Link to="/perfil" className="bg-gray-950 text-white p-3  rounded-4xl w-fit justify-self-start sm:justify-self-end self-center"><ChangeImg className="w-5 h-5 fill-white" /></Link>
                        <button className="bg-red-500 text-white p-3  rounded-4xl w-fit justify-self-start sm:justify-self-end self-center cursor-pointer" onClick={logOut}><LogOutSvg className="w-5 h-5 fill-white" /></button>
                    </div>
                </div>

            </div>
        </div>
    );
}
export default CardProfile;
