function Items({ item, handleDeleteItem, handleIsCompleted }) {
  let itemid = item.id ? item.id : item._id;
  console.log(itemid);
  return (
    <div>
      <li className={item.isCompleted ? "isCompleted" : "listitem"}>
        {itemid != null ? (
          <>
            <div
              className="title-des"
              style={item.isCompleted ? { filter: "blur(3px)" } : {}}
            >
              <div>{item.title}</div>
              <div>{item.description}</div>
            </div>
            <div className="buttons">
              <button onClick={(e) => handleDeleteItem(itemid)}>Delete</button>
              <button onClick={(e) => handleIsCompleted(itemid)}>
                {item.isCompleted ? "Not Completed" : "Completed"}
              </button>
            </div>
          </>
        ) : (
          ""
        )}
      </li>
    </div>
  );
}

export default Items;
