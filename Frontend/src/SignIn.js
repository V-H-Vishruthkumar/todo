import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function SignIn({ username, password, dispatch }) {
  const navigate = useNavigate();
  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
  }, []);
  async function signIn(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Navigate to the main page
        localStorage.setItem("isAuthenticated", "true");
        dispatch({
          type: "setTodoListAndusername",
          payload: {
            todoList: data.user.todoList,
            username: data.user.username,
          },
        });
        navigate(`/user/${data.id}`);
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
      <h1>SignIn</h1>
      <div className="signin">
        <form action="" className="signin">
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
          <button
            onClick={(e) => {
              signIn(e);
            }}
          >
            Submit
          </button>
        </form>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <p onClick={(e) => navigate("/signup")}>Register/SignUp</p>
        </div>
      </div>
    </>
  );
}

export default SignIn;
