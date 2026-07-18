import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../utils/constant";

import BottomMessage from "../components/BottomMesaage";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import TopHeading from "../components/TopHeading";

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error , setError] = useState(false)

  const navigate = useNavigate();

  async function handelSignIn(e) {
    e.preventDefault();

    try {
      const url = `${BASE_URL}/user/signin`;
      const payload = {
        username,
        password,
      };

      const response = await axios.post(url, payload);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
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
            
            {error ? <h1 className="text-red-700">Sorry Provide right crenditial</h1> : null}
            <TopHeading text={"SIGN IN"} />
            
            <form className="space-y-6 mt-10">
              <InputBox
                label={"Email / Username"}
                placeholder={"john@gmail.com"}
                type={"email"}
                onChange={(e) => setUsername(e.target.value)}
              />

              <InputBox
                label={"Password"}
                placeholder={"••••••••"}
                type={"password"}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button text={"Sign in"} onClick={handelSignIn} />
              <BottomMessage
                text={"Don't have an account?"}
                show={"sign up"}
                link={"/signup"}
              />
            </form>
          </div>
          
        </div>
      </div>
    </main>
  );
}
