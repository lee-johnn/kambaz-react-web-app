import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div id="wd-signup-screen" className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-sm" style={{ width: "300px" }}>
        <h3 className="text-center mb-4">Sign Up</h3>
        <form>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Username" />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password" />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Verify Password" />
          </div>
          <Link
            to="/Kambaz/Account/Profile"
            className="btn btn-primary w-100 mb-2">
            Sign Up
          </Link>
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