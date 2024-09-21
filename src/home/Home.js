import React from "react";
import { Link } from "react-router-dom"

function Home (){
    return (
        <div className="Home">
            <h1>Welcome to the home page</h1>
            <Link to="/multiplication-machine">Go to multiplication machine</Link>
        </div>
    )
}

export default Home;