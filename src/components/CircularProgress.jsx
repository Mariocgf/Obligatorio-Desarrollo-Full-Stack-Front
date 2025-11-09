const CircularProgress = ({ current, total, size = 128, premium = false }) => {
    const radius = (size / 2) - 8;
    const circumference = 2 * Math.PI * radius;
    const progress = (current / total) * circumference;

    return (
        <div className="relative mx-auto mb-4" style={{ width: size, height: size }}>
            <svg className="transform -rotate-90" width={size} height={size}>
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="#e5e7eb"
                    strokeWidth="8"
                    fill="none"
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="#2b7fff"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${progress} ${circumference}`}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dasharray 0.5s ease-in-out' }}
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                {premium ? <span className="text-2xl font-bold">{current}/{total}</span> : <span className="text-2xl font-bold">{current}</span>}
            </div>
        </div>
    );
};

export default CircularProgress;