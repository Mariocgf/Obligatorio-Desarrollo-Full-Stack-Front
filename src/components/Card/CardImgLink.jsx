import ButtonLink from "../Button/ButtonLink";

const CardImgLink = ({ imgSrc, title, link }) => {
    return (
        <div className="bg-white p-4 sm:p-6 rounded-4xl w-full sm:w-fit h-fit overflow-hidden relative">
            <img src={imgSrc} alt="" className="w-full h-full object-cover absolute inset-0" />
            <div className="bg-white/25 backdrop-blur-md rounded-4xl text-white p-4 sm:p-6 md:p-8 flex gap-3 sm:gap-4 items-center justify-between sm:justify-start">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold">{title}</h3>
                <ButtonLink link={link} />
            </div>
        </div>
    );
};

export default CardImgLink;