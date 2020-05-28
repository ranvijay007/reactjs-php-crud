import React, { useEffect, useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Axios from "axios";
import { addContext } from "../App";

const UserList = () => {
  const add = useContext(addContext);
  let nameRef = React.createRef();
  let emailRef = React.createRef();
  const init = { id: "", isEdit: false };
  const [users, setUsers] = useState([]);
  const [edit, setEdit] = useState(init);
  const editHandler = (Id) => {
    setEdit({ id: Id, isEdit: true });
  };
  const deleteHandler = (Id) => {
    Axios.post("http://ranvijay.epizy.com/php-react/delete.php", { id: Id }).then(
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
  const saveHandler = (Id) => {
    console.log(nameRef.current.value);
    console.log(emailRef.current.value);
    Axios.post("http://ranvijay.epizy.com/php-react/update.php", {
      id: Id,
      name: nameRef.current.value,
      email: emailRef.current.value,
    })
      .then(({ data }) => {
        if (data.success === 1) {
          let eusers = users.map((user) => {
            if (user.id === Id) {
              user.user_name = nameRef.current.value;
              user.user_email = emailRef.current.value;
              setEdit(init);
              return user;
            }
            return user;
          });
          setUsers(eusers);
        } else {
          alert(data.msg);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const cancelHandler = () => {
    setEdit({ id: -1, isEdit: false });
  };
  useEffect(() => {
    fetch("http://ranvijay.epizy.com/php-react/user-list.php").then((response) => {
      response.json().then((data) => {
        setUsers(data.users.reverse());
      });
    });
  }, [edit.isEdit, users.length, add]);
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
            user.id === edit.id ? (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>
                  <input
                    type="text"
                    name="e-name"
                    ref={nameRef}
                    defaultValue={user.user_name}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="e-email"
                    ref={emailRef}
                    defaultValue={user.user_email}
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
