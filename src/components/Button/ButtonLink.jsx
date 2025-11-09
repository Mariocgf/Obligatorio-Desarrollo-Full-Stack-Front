import { Link } from "react-router";
import ArrowUpRight from "../../assets/interface/arrow-small-right.svg?react";

const ButtonLink = ({ link }) => {
    return (
        <Link to={link} className="bg-gray-950 text-white p-4 rounded-4xl w-fit justify-self-end self-center"><ArrowUpRight className="w-6 h-6 fill-white -rotate-45" /></Link>
    );
};

export default ButtonLink;