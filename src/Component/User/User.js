/* eslint-disable */
import React, { useState, useTransition } from "react";

const list = [...Array(10000).keys()];

const SearchWithoutTransition = () => {
  const [isPending, startTransition] = useTransition();
  const [filtered, setFiltered] = useState(list);
  const [query, setQuery] = useState("");

  const handleFilter = (e) => {
    const input = e.target.value;
    setQuery(input);

    startTransition(() => {
      const filteredList = list.filter((item) =>
        item.toString().includes(input)
      );
      setFiltered(filteredList);
    })
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleFilter}
        placeholder="Filter list..."
      />
      {isPending && <div>Loading list...</div>}
      <ul>
        {filtered.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchWithoutTransition;
