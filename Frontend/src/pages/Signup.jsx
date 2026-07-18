import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../utils/constant";

import BottomMessage from "../components/BottomMesaage";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import TopHeading from "../components/TopHeading";
import axios from "axios";


export default function Signup() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [error , setError] = useState(false)
  const navigate = useNavigate()

  async function handelClick(e) {
    e.preventDefault()
    const url = `${BASE_URL}/user/signup`

    try{
      const payload = {
        username,
        password,
        firstName,
        lastName
      }

      const response = await axios.post(url , payload)
      localStorage.setItem('token' , response.data.token)
      navigate('/dashboard')

    }catch(err){
      if(err.response.data){
        setError(true)
      }
    }
  }

  return (
    <main className="bg-gray-50 px-4 md:px-8 dark:bg-neutral-900">
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="max-w-md w-full">
          <div className="p-6 rounded-lg bg-white border border-slate-300 shadow-xs md:p-8 dark:bg-neutral-800 dark:border-neutral-700">
            {error ? <h1 className="text-red-700">Email Already taken</h1> : null}
            <TopHeading text={"SIGN UP"} />

            <form class="space-y-6 mt-10">
              <InputBox
                label={"Email / Username"}
                placeholder={"john@gmail.com"}
                type={"email"}
                onChange={(e) => setUsername(e.target.value)}
              />

              <InputBox
                label={"First-Name"}
                placeholder={"krish"}
                type={"first-Name"}
                 onChange={(e) => setFirstName(e.target.value)}
              />

              <InputBox
                label={"Last-Name"}
                placeholder={"kumar"}
                type={"last-Name"}
                 onChange={(e) => setLastName(e.target.value)}
              />

              <InputBox
                label={"Password"}
                placeholder={"••••••••"}
                type={"password"}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button text={"Sign in"} onClick={handelClick} />
              <BottomMessage
                text={"Already have an account?"}
                show={"sign in"}
                link={"/signin"}
              />
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
