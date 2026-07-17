export default function ShowBalance({ balance, username }) {
  return (
    <div className="mb-6 flex items-center justify-between rounded-lg bg-white px-6 py-4 shadow-sm">
      <div>
        <p className="text-sm text-gray-500">{username}</p>
        <h2 className="text-3xl font-bold text-slate-800">
          ₹{balance && parseInt(balance)}
        </h2>
      </div>

      <div className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
        Active
      </div>
    </div>
  );
}
