import Items from "./Items";
import { useNavigate } from "react-router-dom";
function Todolist({
  items,
  handleDeleteItem,
  handleIsCompleted,
  handleSaveClick,
  dispatch,
}) {
  const navigate = useNavigate();
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Items
            item={item}
            key={item._id || item.id}
            handleDeleteItem={handleDeleteItem}
            handleIsCompleted={handleIsCompleted}
          />
        ))}
      </ul>
      <button
        onClick={(e) => {
          handleSaveClick();
        }}
      >
        Save
      </button>

      <button
        onClick={(e) => {
          navigate("/");
          dispatch({ type: "reset" });
        }}
      >
        Home
      </button>
    </div>
  );
}

export default Todolist;
