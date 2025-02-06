import { Link } from "react-router-dom";

export default function Signin() {
  return (
    <div id="wd-signin-screen" className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-sm" style={{ width: "300px" }}>
        <h3 className="text-center mb-4">Sign In</h3>
        <form>
          <div className="mb-3">
            <input
              type="text"
              id="wd-username"
              className="form-control"
              placeholder="Username" />
          </div>
          <div className="mb-3">
            <input
              type="password"
              id="wd-password"
              className="form-control"
              placeholder="Password" />
          </div>
          <Link
            id="wd-signin-btn"
            to="/Kambaz/Dashboard"
            className="btn btn-primary w-100 mb-2">
            Sign In
          </Link>
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