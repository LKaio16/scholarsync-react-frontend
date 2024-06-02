import React from "react";
import { useAuth } from "../context/AuthContext";
import HomeAluno from "../components/HomeAluno/HomeAluno";

const HomeUser = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <HomeAluno />
    </div>
  );
};

export default HomeUser;
