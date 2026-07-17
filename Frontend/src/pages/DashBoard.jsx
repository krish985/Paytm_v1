import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../utils/constant";

import Navbar from "../components/Navbar";
import User from "../components/User";
import axios from "axios";
import ShowBalance from "../components/ShowBalance";


export default function Dashboard() {
  const [username , setUsername] = useState("")
  const [firstName , setFirstName] = useState("")
  const [balance , setBalance] = useState("")
  const [id , setId] = useState("")
  const [users , setUsers] = useState([])
  const [filter , setFilter] = useState("")

  const navigate = useNavigate()
  
  useEffect(() => {
    async function fetchUser(){
        const url = `${BASE_URL}/account/balance`
        const token = localStorage.getItem('token')
        const response = await axios.get(url , {
            headers : {
                'Authorization': `Bearer ${token}`
            }
        })
        setFirstName(response.data.firstName)
        setUsername(response.data.username)
        setBalance(response.data.balance)
    }
    fetchUser()
  } , [])


  useEffect(() => {
    if(filter == "") return

    const url = `${BASE_URL}/user/bulk`
    const response = axios.get(url , {
        params : {
            filter : filter
        }
    })

    response.then((res) => {
        
        setUsers(res.data.users)
    })

  }, [filter])
  
  
  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar  username={firstName}/>
      <div className="mx-auto max-w-5xl px-8 py-10">
        <h2 className="mb-6 text-3xl font-bold">Dashboard</h2>

        <ShowBalance balance={balance} username={username}/>

        <input
          type="text"
          placeholder="Search users..."
          onChange={(e) => setFilter(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-5 py-4 text-lg outline-none focus:border-blue-600"
        />
        
        {users.map((user) => <User username={user.username} firstName={user.firstName} lastName={user.lastName} id={user.id} />)} 
      </div>
    </div>
  );
}
