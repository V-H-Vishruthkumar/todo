import React from "react";
import { useNavigate } from "react-router-dom";
function Signup({ username, password, dispatch }) {
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Navigate to the main page
        navigate(data.redirectTo);
        // Store todoList in the state or context
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Error during sign-in:", err);
    }
  }

  return (
    <>
      <h1>SignUp</h1>
      <div className="signin">
        <form onSubmit={handleSubmit} className="signin">
          <input
            type="text"
            placeholder="username"
            required
            value={username}
            onChange={(e) => {
              dispatch({ payload: e.target.value, type: "username" });
            }}
          />
          <input
            type="password"
            placeholder="password"
            required
            value={password}
            onChange={(e) => {
              dispatch({ payload: e.target.value, type: "password" });
            }}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          paddingTop: "1rem",
        }}
      >
        <p onClick={(e) => navigate("/")}>{"<"}Back</p>
      </div>
    </>
  );
}
export default Signup;
