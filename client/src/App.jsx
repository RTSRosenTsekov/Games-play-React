import { Routes, Route } from "react-router-dom";

import {AuthProvider}from "./contexts/authContext";
import Path from "./paths";

import GameCreate from "./components/game-create/GameCreate";
import GameList from "./components/game-list/GameList";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import GameDetails from "./components/game-details/GameDetails";
import Logout from "./components/logout/Logout";
function App() {
  
  return (
    <AuthProvider >
      <div id="box">
        <Header />

        <Routes>
          <Route path={Path.Home} element={<Home />} />
          <Route path="/games" element={<GameList />} />
          <Route path="/games/create" element={<GameCreate />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/games/:gameId" element={<GameDetails />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
