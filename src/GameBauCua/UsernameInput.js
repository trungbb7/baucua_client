// import React from "react";

// const UsernameInput = ({ username, setUsername }) => {
//   return (
//     <div className="username-container" style={styles.container}>
//       <input
//         type="text"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         placeholder="Enter username"
//         style={styles.input}
//       />
//     </div>
//   );
// };

// const styles = {
//   container: {
//     marginBottom: "20px",
//     textAlign: "center",
//   },
//   input: {
//     padding: "10px",
//     fontSize: "16px",
//     borderRadius: "5px",
//     border: "2px solid #9aabbd",
//     width: "200px",
//   },
// };

// export default UsernameInput;

const UsernameInput = ({ username, setUsername }) => {
  const handleUsernameChange = (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    localStorage.setItem("username", newUsername);
  };

  return (
    <div className="username-container" style={styles.container}>
      <input
        type="text"
        value={username}
        onChange={handleUsernameChange}
        placeholder="Enter username"
        style={styles.input}
      />
    </div>
  );
};

const styles = {
  container: {
    marginBottom: "20px",
    textAlign: "center",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "2px solid #9aabbd",
    width: "200px",
  },
};

export default UsernameInput;
