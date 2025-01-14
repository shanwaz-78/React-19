import React, { useEffect, useState, useTransition } from "react";

const Transition = () => {
  const [isPending, startTransition] = useTransition();
  const [isError, setIsError] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    startTransition(async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users`
        );
        if (!response.ok) {
          throw new Error(`[Error]: while fetching data`);
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        setIsError(error.message);
      }
    });
  }, []);

  return (
    <div>
      {isError && <div style={{ color: "red" }}>{isError}</div>}

      {isPending && (
        <div style={{ color: "GrayText", textAlign: "center" }}>
          Loading....
        </div>
      )}

      {!isPending && !isError && (
        <div>
          <h3>Data Loaded Successfully:</h3>
          <ul>
            {data &&
              data.map((user) => (
                <li key={user.id}>
                  {user.name} - {user.email}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Transition;
