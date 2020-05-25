import React, { useState } from "react";
import "./App.css";
import AddUser from "./components/addUser";
import UserList from "./components/userList";
function App() {
  return (
    <div className="App">
      <AddUser />
      <UserList />
    </div>
  );
}

export default App;
