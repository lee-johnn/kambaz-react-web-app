import { Container, ListGroup } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import {
  BsGripVertical,
  BsFillCaretDownFill,
  BsFillClipboardCheckFill,
} from "react-icons/bs";
import AssignmentControls from "./AssignmentControls";
import LessonControlButtons from "../Modules/LessonControlButtons";
import AssignmentControlButtons from "./AssignmentControlButtons";
import * as db from "../../Database";

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments;
  return (
    <div id="wd-assignments">
      <AssignmentControls />
      <br /> <br />
      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            <BsFillCaretDownFill />
            ASSIGNMENTS <AssignmentControlButtons />
          </div>

          <ListGroup className="wd-lessons rounded-0">
            {assignments
              .filter((assignment) => assignment.course === cid)
              .map((assignment) => (
                <ListGroup.Item
                  key={assignment._id}
                  className="wd-lesson p-3 ps-1"
                >
                  <div className="d-flex align-items-center gap-2">
                    <BsGripVertical className="me-2 fs-3" />
                    <BsFillClipboardCheckFill className="me-2 fs-3 text-success" />

                    <Container className="mt-3">
                      <h3>
                        <Link
                          to={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
                          className="text-decoration-none"
                        >
                          {assignment._id}
                        </Link>
                      </h3>

                      <div className="d-flex flex-wrap align-items-center gap-2">
                        <div className="text-danger">Multiple Modules</div>
                        <div>
                          {" "}
                          | <b>Not Available until </b> {assignment.available} | {" "}
                        </div>
                        <div>
                          {" "}
                          <b>Due </b> {assignment.due}{" "}
                        </div>
                        <div> | 100pts </div>
                      </div>
                    </Container>

                    <LessonControlButtons />
                  </div>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}