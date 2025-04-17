import CourseNavigation from "./Navigation";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as courseClient from "./client";
import * as enrollmentsClient from "../client";
import Quizzes from "./Quizzes";
import Editor from "./Quizzes/Editor";
import Details from "./Quizzes/Details";


export default function Courses({ courses }: { courses: any[] }) {
  const { cid } = useParams();
  const { pathname } = useLocation();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [users, setUsers] = useState<any[]>([]);
  const course = courses.find((course) => course._id === cid);
  const [isEnrolled, setIsEnrolled] = useState<boolean>(true);

  const isUserEnrolled = async (courseId: any) => {
    if (currentUser?.role === "ADMIN") {
      return true;
    }
    try {
      const enrollment = await enrollmentsClient.findEnrollmentForUser(
        courseId
      );
      setIsEnrolled(enrollment.data ? true : false);
    } catch (error) {
      console.error(error);
    }
  }

  const fetchUsers = async () => {
    try {
      const users = await courseClient.findUsersForCourse(cid as string);
      setUsers(users);
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    fetchUsers();
    isUserEnrolled(cid);
  }, [cid]);

  return (
    <>
      {isEnrolled ? (
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
                <Route path="Quizzes" element={<Quizzes/>}/>
                <Route path="Quizzes/:qid/edit" element={<Editor/>}/>
                <Route path="Quizzes/:qid/view" element={<Details/>}/>
                <Route path="People" element={<PeopleTable users={users} />} />
                <Route path="People/:uid" element={<PeopleTable users={users} />} />
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