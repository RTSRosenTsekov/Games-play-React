import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import * as authService from "./services/authService";
import AuthContext from "./contexts/authContext";
import Path from "./paths";

import GameCreate from "./components/game-create/GameCreate";
import GameList from "./components/game-list/GameList";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import GameDetails from "./components/game-details/GameDetails";
function App() {

  const navigate = useNavigate();
  const [auth, setAuth] = useState({});

  const loginSubmitHandler = async (values) => {
    const result = await authService.login(values.email, values.password);

    setAuth(result);
    console.log(result);
    navigate(Path.Home)
    
  };
  
  const registerSubmitHandler = async(values) =>{
    const result = await authService.register(values.email, values.password)
  
    setAuth(result);
    console.log(result);
    navigate(Path.Home)
  
  };
  
  const values = {
    loginSubmitHandler,
    registerSubmitHandler,
    username:auth.username || auth.email,
    email: auth.email,
    isAuthenticated:!!auth.email,
  }
    
   
  return (
    <AuthContext.Provider value={values}>
      <div id="box">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<GameList />} />
          <Route path="/games/create" element={<GameCreate />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/games/:gameId" element={<GameDetails />} />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
