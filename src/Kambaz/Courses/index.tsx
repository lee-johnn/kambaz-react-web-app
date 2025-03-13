/* eslint-disable @typescript-eslint/no-explicit-any */
import CourseNavigation from "./Navigation";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
import { useSelector } from "react-redux";

export default function Courses({ courses }: { courses: any[] }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  const { cid } = useParams();
  const { pathname } = useLocation();
  const course = courses.find((course) => course._id === cid);

  const isUserEnrolled = (course: any) =>
    enrollments.find(
      (enrollment: any) =>
        enrollment.user === currentUser._id && enrollment.course === course._id
    );

  return (
    <>
      {isUserEnrolled(course) ? (
        <div id="wd-courses">
          <h2 className="text-danger">
            <FaAlignJustify className="me-4 fs-4 mb-1" />
            {course && course.name} &gt; {pathname.split("/")[4]}
          </h2>
          <hr />
          <div className="d-flex">
            <div className="d-none d-md-block">
              <CourseNavigation />
            </div>
            <div className="flex-fill">
              <Routes>
                <Route path="/" element={<Navigate to="Home" />} />
                <Route path="Home" element={<Home />} />
                <Route path="Modules" element={<Modules />} />
                <Route path="Assignments" element={<Assignments />} />
                <Route path="Assignments/:aid" element={<AssignmentEditor />} />
                <Route path="People" element={<PeopleTable />} />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/Kambaz/Dashboard" />
      )}
    </>
  );
}