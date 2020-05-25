import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const editHandler = () => {};
  const deleteHandler = () => {};
  useEffect(() => {
    fetch("http://localhost:8080/php-react/user-list.php").then((response) => {
      response.json().then((data) => {
        setUsers(data.users.reverse());
      });
    });
  });
  return (
    <div className="text-center">
      <h1 className="font-weight-light">UserList</h1>
      <table className="table block-center table-hover">
        <thead className="thead-light">
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.user_name}</td>
              <td>{user.user_email}</td>
              <td>
                <button className="btn btn-warning" onClick={editHandler}>
                  Edit
                </button>{" "}
                <button className="btn btn-danger" onClick={deleteHandler}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
