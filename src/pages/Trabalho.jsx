import React, { useEffect, useState } from "react";

import Header from "../components/Header/Header";
import ModeratorTrabalhosForm from "../components/ModeratorTrabalhos/ModeratorTrabalhosForm";
import UserTrabalhosForm from "../components/UserTrabalhos/UserTrabahosForm";


const getUserDetails = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

function Trabalhos() {

    const [user, setUser] = useState(null);
    useEffect(() => {
        const userDetails = getUserDetails();
        if (userDetails) {
            setUser(userDetails);
        }

    }, []);
    return (
        <>
            <div className="homeAluno-container">
                <div className="homeAluno">
                    <Header />
                    {user && (
                        user.roles.includes('ROLE_USER') ? (
                            <UserTrabalhosForm />
                        ) : (
                            <ModeratorTrabalhosForm />
                        )
                    )}
                </div>
            </div>
        </>

    );
}

export default Trabalhos;
