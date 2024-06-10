import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import UserHome from "../components/HomeAluno/HomeAluno";
import ModeratorHome from "../components/HomeModerator/HomeModerator";

const getUserDetails = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const Home = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const userDetails = getUserDetails();
    if (userDetails) {
      setUser(userDetails);
    }
  }, []);

  return (
    <div>
      <div className="container-geral">
        <div className="container-conteudo">
          <Header />
          {user &&
            (user.roles.includes("ROLE_USER") ? (
              <UserHome />
            ) : (
              <ModeratorHome />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
