import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import { Button, FormControl } from "react-bootstrap";
export default function Signup() {
  const [user, setUser] = useState<any>({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signup = async () => {
    const currentUser = await client.signup(user);
    dispatch(setCurrentUser(currentUser));
    navigate("/Kambaz/Account/Profile");
  };

  return (
    <div id="wd-signup-screen" className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-sm" style={{ width: "300px" }}>
        <h3 className="text-center mb-4">Sign Up</h3>
        <form>
          <div className="mb-3">
            <FormControl
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              type="text"
              className="form-control"
              placeholder="Username" />
          </div>
          <div className="mb-3">
            <FormControl
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              type="password"
              className="form-control"
              placeholder="Password" />
          </div>
          <div className="mb-3">
            <FormControl
              type="password"
              className="form-control"
              placeholder="Verify Password" />
          </div>
          <Button
            className="btn btn-primary w-100 mb-2"
            onClick={signup}>
            Sign Up
          </Button>
          <div className="text-center">
            <Link to='/Kambaz/Account/Signin' className="text-secondary">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}