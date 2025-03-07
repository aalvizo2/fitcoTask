import React from "react";

interface LoginProps{
    onLogout: () => void;
}


const Navbar: React.FC<LoginProps>= ({onLogout}) => {
    return(
        <>
           Este es el navbar 

           <button onClick={onLogout}></button>
        </>
    )
};


export default Navbar;