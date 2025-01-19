import React, { useState, useTransition } from "react";

const NonBlockingUIExample = () => {
  const [items, setItems] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleLoadItems = () => {
    // Use transition to defer the update and avoid blocking the UI
    startTransition(() => {
      const newItems = Array.from(
        { length: 5000 },
        (_, index) => `Item ${index + 1}`
      );
      setItems(newItems);
    });
  };

  return (
    <div>
      <button onClick={handleLoadItems}>Load Items</button>
      {isPending && <p>Loading...</p>}
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default NonBlockingUIExample;
