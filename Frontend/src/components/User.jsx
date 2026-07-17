import { Link } from "react-router-dom";

export default function User({username , firstName , lastName , id}) {
 
  return (
    <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm mt-3">
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
          {firstName.length > 0 ? firstName[0].toUpperCase() : null}
        </div>

        {/* User Name */}
        <div>
          <h3 className="text-lg font-semibold text-slate-800">
            {`${firstName} ${lastName}`}
          </h3>
          <p className="text-sm text-slate-500">{username}</p>
        </div>
      </div>

      {/* Send Money Button */}
      <Link to={`/send-money?firstName=${firstName}&id=${id}`} className="rounded-lg bg-green-500 px-5 py-2 font-medium text-white transition hover:bg-green-600">
        Send Money
      </Link>
    </div>
  );
}
