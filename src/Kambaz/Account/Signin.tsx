import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import * as db from "../Database";
import { Button } from "react-bootstrap";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signin = () => {
    const user = db.users.find(
      (u: any) => u.username === credentials.username && u.password === credentials.password);
    if (!user) return;
    dispatch(setCurrentUser(user));
    navigate("/Kambaz/Dashboard");
  };

  return (
    <div id="wd-signin-screen" className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-sm" style={{ width: "300px" }}>
        <h3 className="text-center mb-4">Sign In</h3>
        <form>
          <div className="mb-3">
            <input 
              defaultValue={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              type="text"
              id="wd-username"
              className="form-control"
              placeholder="Username" />
          </div>
          <div className="mb-3">
            <input 
              defaultValue={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              type="password"
              id="wd-password"
              className="form-control"
              placeholder="Password" />
          </div>
          <Button onClick={signin}
            id="wd-signin-btn"
            className="btn btn-primary w-100 mb-2">
            Sign In
          </Button>
          <div className="text-center">
            <Link id="wd-signup-link" to='/Kambaz/Account/Signup' className="text-secondary">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}