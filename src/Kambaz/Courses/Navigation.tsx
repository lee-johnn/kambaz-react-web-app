import { Link } from "react-router-dom";
import { useLocation } from "react-router";
export default function CourseNavigation() {
  const { pathname } = useLocation();
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      <Link to="/Kambaz/Courses/1234/Home" id="wd-course-home-link"
        className={`nav-link ${pathname.includes("Home") ? "list-group-item active border border-0" : "list-group-item text-danger border border-0"}`}>Home</Link>
      <Link to="/Kambaz/Courses/1234/Modules" id="wd-course-modules-link"
        className={`nav-link ${pathname.includes("Modules") ? "list-group-item active border border-0" : "list-group-item text-danger border border-0"}`}>Modules</Link>
      <Link to="/Kambaz/Courses/1234/Piazza" id="wd-course-piazza-link"
        className={`nav-link ${pathname.includes("Piazza") ? "list-group-item active border border-0" : "list-group-item text-danger border border-0"}`}>Piazza</Link>
      <Link to="/Kambaz/Courses/1234/Zoom" id="wd-course-zoom-link"
        className={`nav-link ${pathname.includes("Zoom") ? "list-group-item active border border-0" : "list-group-item text-danger border border-0"}`}>Zoom</Link>
      <Link to="/Kambaz/Courses/1234/Assignments" id="wd-course-assignments-link"
        className={`nav-link ${pathname.includes("Assignments") ? "list-group-item active border border-0" : "list-group-item text-danger border border-0"}`}>Assignments</Link>
      <Link to="/Kambaz/Courses/1234/Quizzes" id="wd-course-quizzes-link"
        className={`nav-link ${pathname.includes("Quizzes") ? "list-group-item active border border-0" : "list-group-item text-danger border border-0"}`}>Quizzes</Link>
      <Link to="/Kambaz/Courses/1234/Grades" id="wd-course-grades-link"
        className={`nav-link ${pathname.includes("Grades") ? "list-group-item active border border-0" : "list-group-item text-danger border border-0"}`}>Grades</Link>
      <Link to="/Kambaz/Courses/1234/People" id="wd-course-people-link"
        className={`nav-link ${pathname.includes("People") ? "list-group-item active border border-0" : "list-group-item text-danger border border-0"}`}>People</Link>
    </div>
  );
}