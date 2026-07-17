import { useNavigate } from "react-router-dom";
export default function Navbar({ username }) {
  const navigate = useNavigate()

  function handelLogOut(){
    const response = confirm("Are you sure , you want to logout")

    if(response){
      localStorage.removeItem('token')
      navigate('/') 
    }
  }
  return (
    <nav className="flex items-center justify-between border-b bg-white px-8 py-4 shadow-sm">
      <h1 className="text-2xl font-bold text-slate-800">Paytm</h1>

      <div className="flex items-center gap-3">
        <span className="text-lg font-medium">Hello , {username}</span>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
          {username.length > 0 ? username[0].toUpperCase() : null}
        </div>

        <button onClick={handelLogOut} className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-lg transition">
          Logout
        </button>
      </div>
    </nav>
  );
}
