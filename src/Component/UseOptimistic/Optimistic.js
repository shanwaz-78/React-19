import React, { useEffect, useState } from "react";
import { updateEmail } from "../../services/Api.js"; // Assuming you have this function in your API file

const Optimistic = () => {
  // `useState` to manage user data and error messages
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [optimisticUsers, setOptimisticUsers] = React.useOptimistic(
    users,
    (prevUsers, update) => {
      // Optimistically update email for a specific user
      return prevUsers.map((user) =>
        user.id === update.id ? { ...user, email: update.email } : user
      );
    }
  );

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users`
        );
        if (!response.ok) throw new Error(`Failed to fetch users.`);
        const data = await response.json();
        setUsers(data); // Set initial users data
        setOptimisticUsers(data); // Sync optimistic state
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUsers();
  }, []);

  // Function to update user email
  const handleEmailUpdate = async (userId, newEmail) => {
    // Optimistic update
    setOptimisticUsers({ id: userId, email: newEmail });

    try {
      // Update email on the server
      await updateEmail({ id: userId, email: newEmail });
    } catch (err) {
      // Revert optimistic update in case of failure
      setOptimisticUsers({
        id: userId,
        email: users.find((user) => user.id === userId).email,
      });
      setError(`Failed to update email for user ${userId}`);
    }
  };

  return (
    <div>
      {error && <div style={{ color: "red" }}>{error}</div>}

      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {optimisticUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button
                  onClick={() =>
                    handleEmailUpdate(
                      user.id,
                      `${user.name.toLowerCase()}@example.com`
                    )
                  }
                >
                  Update Email
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Optimistic;
