import Items from "./Items";
import { useState } from "react";
export default function PackingList({
  items,
  onDeleteItems,
  onToggleItems,
  onClearList,
}) {
  const [sortBy, setSortBy] = useState("input");
  let newItems;
  if (sortBy === "input") newItems = items;

  if (sortBy === "description")
    newItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    newItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  if (sortBy === "quantity")
    newItems = items.slice().sort((a, b) => b.quantity - a.quantity);
  return (
    <div className="list">
      <ul>
        {newItems.map((item) => (
          <Items
            item={item}
            onDeleteItems={onDeleteItems}
            onToggleItems={onToggleItems}
            key={item.id}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">SORT BY INPUT ORDER</option>
          <option value="description">SORT BY DESCRIPTION</option>
          <option value="packed">SORT BY PACKED-STATUS</option>
          <option value="quantity">SORT BY QUANTITY</option>
        </select>

        <button onClick={onClearList}>Clear List</button>
      </div>
    </div>
  );
}
