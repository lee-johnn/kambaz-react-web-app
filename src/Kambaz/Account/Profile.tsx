import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <div id="wd-profile-screen" className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-sm" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Profile</h3>
        <form>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              defaultValue="alice"
              placeholder="Username" />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              defaultValue="123"
              placeholder="Password" />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              defaultValue="Alice"
              placeholder="First Name" />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              defaultValue="Wonderland"
              placeholder="Last Name" />
          </div>
          <div className="mb-3">
            <input
              type="date"
              className="form-control"
              defaultValue="2000-01-01" />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              defaultValue="alice@wonderland"
              placeholder="Email" />
          </div>
          <div className="mb-3">
            <select className="form-control" defaultValue="FACULTY">
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="FACULTY">Faculty</option>
              <option value="STUDENT">Student</option>
            </select>
          </div>
          <Link to="/Kambaz/Account/Signup" className="btn btn-danger w-100">
            Sign Out
          </Link>
        </form>
      </div>
    </div>
  );
}