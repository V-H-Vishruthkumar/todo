import { useState } from "react";

export function Form({ onAddItems, tripName }) {
  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const items = { description, noItems, packed: false, id: Date.now() };
    console.log(items);
    setDescription("");
    setNoItems(1);
    onAddItems(items);
  }
  const [description, setDescription] = useState("");
  const [noItems, setNoItems] = useState(1);

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for {tripName} Trip?</h3>
      <select
        value={noItems}
        onChange={(e) => {
          setNoItems(+e.target.value);
        }}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
          <option value={n} key={n}>
            {n}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <button>ADD</button>
    </form>
  );
}
