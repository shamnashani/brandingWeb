function Topbar() {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
      <div>
        <h1 className="text-2xl">Dashboard</h1>
        <p className="text-gray-500">Welcome back. Here's what's happening today.</p>
      </div>
      <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-xs w-fit">
        Admin
      </span>
    </div>
  );
}

export default Topbar;