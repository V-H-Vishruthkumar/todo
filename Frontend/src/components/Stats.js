export function Stats({ items }) {
  if (!items.length) {
    return (
      <p className="stats">
        <em>Start Adding some items to your packing list🚀</em>
      </p>
    );
  }
  const totalItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const precentage = Math.round((numPacked / totalItems) * 100);
  return (
    <footer className="stats">
      <em>
        {precentage === 100
          ? "You got everthing! Ready to GO✈️"
          : ` 👜 You have ${totalItems} items in your bag, and you already packed
          ${numPacked} (${precentage}%)`}
      </em>
    </footer>
  );
}
