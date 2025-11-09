const BentoCard = ({ title, children, size }) => {
    return (
        <div className={`bg-white   backdrop-blur-xs p-6 rounded-4xl flex flex-col min-h-0 ${size} overflow-hidden` }>
            {title? <h3 className="font-bold text-lg mb-3 shrink-0">{title}</h3> : ''}
            <div className="flex-1 flex flex-col min-h-0">
                {children}
            </div>
        </div>
    )
}

export default BentoCard;