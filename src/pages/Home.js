import React from "react";
import Base from "../components/Base";

function Home() {
  return (
    <Base>
      <div className="container-fluid">
        <h1 className="h3 mb-4 text-gray-800">Home Page</h1>
        <p>Just a dashboard page to display things.</p>
        <p>Please click on mentor and task in sidebar for viewing CRUD</p>
        
      </div>
    </Base>
  );
}

export default Home;
