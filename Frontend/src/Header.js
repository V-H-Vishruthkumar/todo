import React, { useState } from "react";

function Header({ title, description, dispatch }) {
  const [localTitle, setLocalTitle] = useState(title);
  const [localDescription, setLocalDescription] = useState(description);

  const handleTitleChange = (e) => {
    setLocalTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setLocalDescription(e.target.value);
  };

  const handleAddClick = (e) => {
    e.preventDefault();
    dispatch({
      type: "add",
      payload: {
        title: localTitle,
        description: localDescription,
        id: Date.now(),
      },
    });
  };

  return (
    <div className="header">
      <h1>TODO</h1>
      <form action="" className="add-form">
        <input
          type="text"
          placeholder="Title"
          value={localTitle}
          onChange={handleTitleChange}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={localDescription}
          onChange={handleDescriptionChange}
          required
        />
        <button onClick={handleAddClick}>Add</button>
      </form>
    </div>
  );
}

export default Header;
