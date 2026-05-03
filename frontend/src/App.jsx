import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

const App = () => {
  const { authUser } = useContext(AuthContext);
  console.log(authUser);

  return (
    <div className="bg-[url('./src/assets/bgImage.svg')] bg-cover bg-no-repeat position">
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
