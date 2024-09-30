const StatCard = ({ label, value, icon }) => {
    return (
        <div className="stat-card">
            <div className="stat-info flex justify-between pb-1">
                <h4 className="md:text-xl font-bold text-sky-800">{label}</h4>
                <span className="icon">{icon}</span>
            </div>

            <p className="py-4 pr-4 text-4xl font-bold text-right">{value}</p>
        </div>
    );
}

export default StatCard