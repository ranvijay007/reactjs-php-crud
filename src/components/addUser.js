import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Axios from "axios";

const AddUser = () => {
  const [users, setUsers] = useState({ name: "", email: "" });
  const formHandler = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:8080/php-react/add-users.php", users).then(
      ({ data }) => {
        if (data.success === 1) {
          setUsers({ name: "", email: "" });
          alert(data.msg);
        } else alert(data.msg);
      }
    );
  };

  return (
    <div className="text-center pt-5 pb-4">
      <h1 className="text-warning font-weight-light">Add User</h1>
      <form onSubmit={formHandler} className="d-flex justify-content-center">
        <div className="pr-2">
          <input
            type="text"
            name="name"
            value={users.name}
            onChange={(e) => {
              setUsers({ ...users, name: e.target.value });
            }}
            className="form-control"
            placeholder="Enter your Name"
            required
          />
        </div>
        <div className="pr-2">
          <input
            type="email"
            name="email"
            value={users.email}
            onChange={(e) => {
              setUsers({ ...users, email: e.target.value });
            }}
            className="form-control"
            placeholder="Enter your Email"
            required
          />
        </div>
        <div>
          <input type="submit" className="btn btn-primary" value="Add" />
        </div>
      </form>
    </div>
  );
};

export default AddUser;
