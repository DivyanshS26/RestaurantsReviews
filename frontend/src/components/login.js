import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const initialUser = {
    name: "",
    id: "",
  };

  const navigate = useNavigate();

  const [user, setUser] = useState(initialUser);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const login = () => {
    props.login(user);
    navigate("/");
  };

  return (
    <div className="submit-form">
      <div>
        <div className="form-group">
          <label htmlFor="user">Username</label>
          <input
            type="text"
            className="form-control"
            id="name"
            required
            value={user.name}
            onChange={handleChange}
            name="name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="id">ID</label>
          <input
            type="text"
            className="form-control"
            id="id"
            required
            value={user.id}
            onChange={handleChange}
            name="id"
          />
        </div>
        <button className="btn btn-success" onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
