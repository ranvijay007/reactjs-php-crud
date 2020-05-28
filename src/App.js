import React, { useState } from "react";
import "./App.css";
import AddUser from "./components/addUser";
import UserList from "./components/userList";

export const addContext = React.createContext();
export const setAddContext = React.createContext();

function App() {
  const [add, setAdd] = useState(false);
  return (
    <div className="App">
      <addContext.Provider value={add}>
        <setAddContext.Provider value={setAdd}>
          <AddUser />
          <UserList />
        </setAddContext.Provider>
      </addContext.Provider>
    </div>
  );
}

export default App;
