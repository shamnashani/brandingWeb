function StatCard({ icon, label, value, sub }) {
  return (
    <div className="bg-[#111] border border-[#222] rounded-xl p-4">
      <div className="flex justify-between">
        <span className="text-gray-500 text-sm">{label}</span>
        {icon}
      </div>

      <h2 className="text-3xl text-yellow-500 mt-2">{value}</h2>

      <p className="text-xs text-gray-600 mt-2">{sub}</p>
    </div>
  );
}

export default StatCard;