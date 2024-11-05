import { useState } from "react";

export function Item({ item, onDeleteClick, updateItem }) {
  const [isChecked, setIsChecked] = useState(item.packed);
  function handelCheckBox(e) {
    setIsChecked(e.target.checked);
  }
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={(e) => {
          updateItem(item.id);
          handelCheckBox(e);
        }}
        checked={isChecked}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.noItems} {item.description}
      </span>
      <button
        onClick={() => {
          onDeleteClick(item.id);
        }}
      >
        ❌
      </button>
    </li>
  );
}
