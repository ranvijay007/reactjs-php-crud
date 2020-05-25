import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Axios from "axios";

const UserList = () => {
  const init = { id: "", isEdit: false };
  const [users, setUsers] = useState([]);
  const [euser, setEuser] = useState({ name: "", email: "" });
  const [edit, setEdit] = useState(init);
  const editHandler = (Id) => {
    setEdit({ id: Id, isEdit: true });
  };
  const deleteHandler = (Id) => {
    Axios.post("http://localhost:8080/php-react/delete.php", { id: Id }).then(
      ({ data }) => {
        //console.log(data);
        console.log(data.success);
        console.log(data.msg);
        if (data.success === 1) {
          let del = [];
          del = users.filter((user) => user.id !== Id);
          //console.log(del);
          setUsers(del);
          alert(data.msg);
        } else {
          alert(data.msg);
        }
      }
    );
  };
  const saveHandler = () => {};
  const cancelHandler = () => {
    setEdit({ id: -1, isEdit: false });
  };
  useEffect(() => {
    fetch("http://localhost:8080/php-react/user-list.php").then((response) => {
      response.json().then((data) => {
        setUsers(data.users.reverse());
      });
    });
  }, [edit.isEdit, users]);
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
          {users.map((user, index) =>
            user.id == edit.id ? (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>
                  <input
                    type="text"
                    name="e-name"
                    value={user.user_name}
                    onChange={(e) =>
                      setEuser({ ...euser, name: e.target.value })
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="e-name"
                    value={user.user_email}
                    onChange={(e) =>
                      setEuser({ ...euser, email: e.target.value })
                    }
                  />
                </td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => saveHandler(user.id)}
                  >
                    Save
                  </button>{" "}
                  <button className="btn btn-danger" onClick={cancelHandler}>
                    Cancel
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.user_name}</td>
                <td>{user.user_email}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => editHandler(user.id)}
                  >
                    Edit
                  </button>{" "}
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteHandler(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
