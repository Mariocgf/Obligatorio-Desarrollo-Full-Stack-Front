const CardImgInfo = ({ imgSrc, title, description }) => {
    return (
        <div className="bg-white rounded-4xl shadow-md overflow-hidden">
            <img src={imgSrc} alt={title} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="text-gray-600">{description}</p>
            </div>
        </div>
    );
};
export default CardImgInfo;