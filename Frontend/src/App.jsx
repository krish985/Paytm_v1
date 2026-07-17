import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/DashBoard";
import SendMoney from "./pages/SendMoney";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<ProtectedRoute> <Dashboard/> </ProtectedRoute>} />
        <Route path="/send-money" element={<ProtectedRoute> <SendMoney /> </ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

function Welcome() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-100 px-6 text-center">
      <h1 className="mb-3 text-5xl font-bold text-slate-800">
        Welcome to Paytm
      </h1>

      <p className="mb-10 text-lg text-slate-600">
        Send and receive money securely in seconds.
      </p>

      <div className="flex gap-4">
        <Link
          to="signup"
          className="rounded-lg bg-blue-600 px-8 py-3 text-lg font-semibold text-white hover:bg-blue-700"
        >
          Sign Up
        </Link>

        <Link
          to="/signin"
          className="rounded-lg border border-blue-600 px-8 py-3 text-lg font-semibold text-blue-600 hover:bg-blue-50"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}

export default App;
