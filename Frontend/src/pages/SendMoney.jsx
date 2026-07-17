import axios from "axios";
import { useState } from "react";
import { useSearchParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import BASE_URL from "../utils/constant";

export default function SendMoney(){
  const [ammount ,setAmmount] = useState()
  const [lowBalance ,setLowBalance] = useState(false)
  const [searchParams] = useSearchParams();

  const navigate = useNavigate()

  const firstName = searchParams.get('firstName') || ""
  // const username = searchParams.get('username')   || ""
  const id = searchParams.get('id') || ""

  async function handelSendMoney() {
    const url = `${BASE_URL}/account/transfer`
    
    const token = localStorage.getItem('token')
    try{
      const response = await axios.post(url , {
        to : id,
        ammount : ammount
      },
      {
        headers : {
          'Authorization': `Bearer ${token}`
        }
      }
    )

    console.log(response.data.message)
    navigate('/dashboard')

    }catch(err){
      if(err.response.data){
        setLowBalance(true)
        setTimeout(() => {
          navigate('/dashboard')
        },1000)
      }
    }
  }

    return(
         <div className="min-h-screen flex items-center justify-center bg-slate-200">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-8 text-center text-3xl font-bold">
          Send Money
        </h1>
        {lowBalance ? <div className="mb-8 text-amber-800">Insufficent Balance</div> : ""}
        {/* User */}
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-2xl font-bold text-white">
            {firstName.length > 0 ? firstName[0].toUpperCase() : ""}
          </div>

          <h2 className="text-xl font-semibold">{firstName}</h2>
        </div>

        {/* Amount Input */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Amount (₹)
          </label>

          <input
            type="number"
            placeholder="Enter amount"
            onChange={(e) => setAmmount(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
          />
        </div>

        {/* Button */}
        <button onClick={handelSendMoney} className="w-full rounded-lg bg-green-500 py-3 text-lg font-semibold text-white hover:bg-green-600">
          Send Money
        </button>
      </div>
    </div>
    )
}