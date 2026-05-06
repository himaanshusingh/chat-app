import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthContext } from "./context/AuthContext.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";

const App = () => {
  const { authUser } = useContext(AuthContext);
  console.log(authUser);

  return (
    <div className="bg-[url('/bgImage.svg')] bg-cover bg-no-repeat position">
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/login"
            element={!authUser ? <Login /> : <Navigate to={"/"} />}
          />
          <Route
            path="/profile"
            element={authUser ? <Profile /> : <Navigate to={"/login"} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
