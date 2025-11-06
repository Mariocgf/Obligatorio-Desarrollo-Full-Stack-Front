const BentoCard = ({ title, children, size }) => {
    return (
        <div className={`bg-black/50 border border-white/10 backdrop-blur-md p-6 rounded-2xl flex flex-col  ${size} transition-all hover:scale-102 duration-300` }>
            {title? <h3 className="font-semibold mb-3">{title}</h3> : ''}
            {children}
        </div>
    )
}

export default BentoCard;