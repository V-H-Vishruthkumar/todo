import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import Header from "./Header"; // Assuming Header is defined somewhere

function Login() {
  return (
    <div>
      <Header />
      <Link to="/pages/Existing">Existing</Link>
    </div>
  );
}

export default Login;
