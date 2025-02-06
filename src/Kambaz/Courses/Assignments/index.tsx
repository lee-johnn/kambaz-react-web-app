import AssignmentsControls from "./AssignmentControls";
import { BsGripVertical } from "react-icons/bs";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { BiCaretDown, BiEdit } from "react-icons/bi";
import LessonControlButtons from "../Modules/LessonControlButtons";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <AssignmentsControls />
      <ul id="wd-assignment-list" className="list-group rounded-0 my-4">
        <div className="wd-title p-3 ps-2 bg-secondary mb-4">
          <BsGripVertical className="me-2 fs-3" />
          <BiCaretDown className="me-2" />
          Assignments
          <AssignmentControlButtons />
        </div>

        <li className="wd-assignment-list-item list-group-item p-3" style={{ borderLeft: "4px solid green" }}>
          <div className="row align-items-center">
            <div className="col-auto">
              <BsGripVertical className="fs-4" />
            </div>
            <div className="col-auto">
              <BiEdit className="text-success fs-4" />
            </div>
            <div className="col">
              <a className="wd-assignment-link text-dark link-underline link-underline-opacity-0"
                href="#/Kambaz/Courses/1234/Assignments/123">
                <h5><b>A1 - ENV + HTML</b></h5>
              </a>
              <p>
                <span className="text-danger"> Multiple Modules </span>
                | <b>Not available until</b> May 6 at 12:00am | <b>Due</b> May 13at
                11:59pm|100 pts</p>
            </div>
            <div className="col float-end">
              <LessonControlButtons />
            </div>
          </div>
        </li>

        <li className="wd-assignment-list-item list-group-item p-3" style={{ borderLeft: "4px solid green" }}>
          <div className="row align-items-center">
            <div className="col-auto">
              <BsGripVertical className="fs-4" />
            </div>
            <div className="col-auto">
              <BiEdit className="text-success fs-4" />
            </div>
            <div className="col">
              <a className="wd-assignment-link text-dark link-underline link-underline-opacity-0"
                href="#/Kambaz/Courses/1234/Assignments/123">
                <h5><b>A2 - CSS + BOOTSTARP</b></h5>
              </a>
              <p>
                <span className="text-danger"> Multiple Modules </span>
                | <b>Not available until</b> May 6 at 12:00am | <b>Due</b> May 13at
                11:59pm|100 pts</p>
            </div>
            <div className="col float-end">
              <LessonControlButtons />
            </div>
          </div>
        </li>

        <li className="wd-assignment-list-item list-group-item p-3" style={{ borderLeft: "4px solid green" }}>
          <div className="row align-items-center">
            <div className="col-auto">
              <BsGripVertical className="fs-4" />
            </div>
            <div className="col-auto">
              <BiEdit className="text-success fs-4" />
            </div>
            <div className="col">
              <a className="wd-assignment-link text-dark link-underline link-underline-opacity-0"
                href="#/Kambaz/Courses/1234/Assignments/123">
                <h5><b> A3 - JAVASCRIPT + REACT</b></h5>
              </a>
              <p>
                <span className="text-danger"> Multiple Modules </span>
                | <b>Not available until</b> May 6 at 12:00am | <b>Due</b> May 13at
                11:59pm|100 pts</p>
            </div>
            <div className="col float-end">
              <LessonControlButtons />
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}