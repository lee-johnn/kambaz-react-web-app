import { Routes, Route, Navigate } from "react-router-dom";
import Signin from "./Signin";
import Signup from "./Signup";
import Profile from "./Profile";
import AccountNavigation from "./Navigation.tsx";

export default function Account() {
  return (
    <div id="wd-account-screen" >
      <h1>Name: John Lee</h1>
      <h5>Link to GitHub: <a href="https://github.com/lee-johnn/kambaz-react-web-app" > Here </a></h5>
      <table>
        <tr>
          <td valign="top">
            <AccountNavigation />
          </td>
          <td valign="top">
                  <Routes>
                      <Route path="/" element={<Navigate to="/Kambaz/Account/Signin" />} />
                      <Route path="/Signin" element={<Signin />} />
                      <Route path="/Profile" element={<Profile />} />
                      <Route path="Signup" element={<Signup />} />
                  </Routes>
          </td>
        </tr>
      </table>
    </div>
  );
}