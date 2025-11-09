import ButtonLink from "../Button/ButtonLink";

const CardInfoLink = ({ title, description, link }) => {
    return (
        <div className="bg-white p-4 sm:p-6 rounded-4xl w-full sm:w-fit h-fit overflow-hidden">
            <div className="mb-4 bg-black text-white rounded-4xl p-3 sm:p-4">
                <h3 className="text-xl sm:text-2xl font-extrabold">{description}</h3>
            </div>
            <div className="flex gap-4 sm:gap-6 md:gap-10 items-center justify-between sm:justify-start">
                <p className="text-base sm:text-lg md:text-xl font-bold">{title}</p>
                <ButtonLink link={link} />
            </div>
        </div>
    );
};

export default CardInfoLink;