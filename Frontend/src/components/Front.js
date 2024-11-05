import { useState, useEffect } from "react";
import { Stats } from "./Stats";
import { PackingList } from "./PackingList";
import { Form } from "./Form";
import { Header } from "./Header";

function Front() {
  const [itemsA, setItems] = useState([]);
  const [tripName, setTripname] = useState();
  function handleAddItems(item) {
    setItems((itemsA) => [...itemsA, item]);
  }
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handleUpdateItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function handleClearItems() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all the items in the list"
    );
    if (confirmed) setItems([]);
  }
  return (
    <div className="app">
      <Header />
      <Form onAddItems={handleAddItems} tripName={tripName} />
      <PackingList
        items={itemsA}
        setItems={setItems}
        onDeleteItem={handleDeleteItem}
        updateItem={handleUpdateItem}
        clearItem={handleClearItems}
        getTripName={setTripname}
      />
      <Stats items={itemsA} />
    </div>
  );
}
export default Front;
