export default function Button({text , onClick}) {
  return (
    <button
      onClick={onClick}
      className="w-full py-2 px-3.5 text-sm rounded-md font-semibold cursor-pointer tracking-wide text-white border border-blue-600 bg-blue-600 hover:bg-blue-700 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      {text}
    </button>
  );
}
