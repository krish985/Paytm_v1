import { Link } from "react-router-dom";
export default function BottomMessage({ text, show, link }) {
  return (
    <div className="text-slate-900 text-sm text-center dark:text-slate-50">
      {text}

      <Link
        to={link}
        className="text-blue-700 hover:underline ml-1 font-medium dark:text-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
      >
        {show}
      </Link>
    </div>
  );
}
