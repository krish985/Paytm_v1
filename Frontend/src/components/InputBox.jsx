export default function InputBox({ label, placeholder , type , onChange }) {
  return (
    <div>
      <label
        htmlFor={type}
        className="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50"
      >
        {label}
      </label>
      <input
        type={type}
        id={type}
        name={type}
        placeholder={placeholder}
        onChange={onChange}
        required
        className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-700 dark:outline-neutral-600"
      />
    </div>
  );
}
