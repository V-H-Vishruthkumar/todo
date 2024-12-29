import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Header.js";
import Todolist from "./Todolist.js";
import { useReducer } from "react";
import SignIn from "./SignIn.js";
import Signup from "./Signup.js";
const lst = [
  {
    title: "Pack Clothes",
    description: "Fold and pack all the clothes needed for the trip.",
    isCompleted: true,
  },
  {
    title: "Prepare Documents",
    description: "Print tickets and pack passport and ID.",
    isCompleted: false,
  },
  {
    title: "Charge Devices",
    description: "Fully charge phone, laptop, and power bank.",
    isCompleted: false,
  },
];
function reducer(state, action) {
  switch (action.type) {
    case "add":
      if (
        action.payload.title.length > 0 &&
        action.payload.description.length > 0
      ) {
        return {
          ...state,
          todoList: [
            {
              title: action.payload.title,
              description: action.payload.description,
              isCompleted: false,
              id: action.payload.id,
            },
            ...state.todoList,
          ],
          title: "",
          description: "",
        };
      } else {
        return { ...state };
      }
    case "delete":
      return {
        ...state,
        todoList: state.todoList.filter(
          (item) => item.id || item._id !== action.payload
        ),
      };
    case "updateIsCompleted":
      return {
        ...state,
        todoList: state.todoList.map((item) =>
          item.id === action.payload || item._id === action.payload
            ? { ...item, isCompleted: !item.isCompleted }
            : item
        ),
      };
    case "username":
      return {
        ...state,
        username: action.payload,
      };
    case "password":
      return {
        ...state,
        password: action.payload,
      };
    // case "signin":
    //   return {
    //     ...state,

    //   };
    case "setTodoListAndusername":
      return {
        ...state,
        todoList: action.payload.todoList,
        username: action.payload.username,
      };
    case "setTodoList":
      return {
        ...state,
        Todolist: action.payload,
      };
    case "reset":
      return {
        ...state,
        username: "",
        password: "",
      };
    default:
      throw new Error("Unknown Action");
  }
}
const initialState = {
  title: "",
  description: "",
  isCompleted: false,
  todoList: [],
  username: "",
  password: "",
};
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { title, description, todoList, username, password } = state;
  function handleDeleteItem(id) {
    dispatch({ payload: id, type: "delete" });
  }
  function handleIsCompleted(id) {
    dispatch({ payload: id, type: "updateIsCompleted" });
  }

  const handleSaveClick = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/user/updateTodoList`,
        {
          method: "PUT", // PUT for updating the existing data
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username, // Pass the username
            todoList: todoList,
          }), // Send the updated todoList
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Todo list updated successfully");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Error updating todo list:", err);
    }
  };

  function Main({ username }) {
    return (
      <div className={"app"}>
        <div>
          <Header title={title} dispatch={dispatch} description={description} />
          <Todolist
            items={todoList}
            handleDeleteItem={handleDeleteItem}
            handleIsCompleted={handleIsCompleted}
            handleSaveClick={handleSaveClick}
            dispatch={dispatch}
          />
          {console.log(todoList)}
        </div>
      </div>
    );
  }
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <SignIn
                username={username}
                password={password}
                dispatch={dispatch}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Signup
                username={username}
                password={password}
                dispatch={dispatch}
              />
            }
          />
          <Route
            path="/user/:id"
            element={<Main username={username} password={password} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
