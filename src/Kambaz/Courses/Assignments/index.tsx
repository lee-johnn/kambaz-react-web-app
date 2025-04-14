import AssignmentControls from "./AssignmentControls";
import AssignmentControlButtons from "./AssignmentControlButtons";
import AssignmentHeader from "./AssignmentHeader";
import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { LuNotebookPen } from "react-icons/lu";
import { FaCaretDown } from "react-icons/fa";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { deleteAssignment, setAssignments } from "./reducer";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";
import { useEffect } from "react";

export default function Assignments() {
    const { cid } = useParams();
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);
    const dispatch = useDispatch();

    const fetchAssignments = async () => {
      const assignments = await coursesClient.findAssignmentsForCourse(cid as string);
      dispatch(setAssignments(assignments));
    };

    const removeAssignment = async (assignmentId: string) => {
      await assignmentsClient.deleteAssignment(assignmentId);
      dispatch(deleteAssignment(assignmentId));
    };

    useEffect(() => {
      fetchAssignments();
    }, []);  
    return (
      <div id="wd-assignments">
        <AssignmentControls />
        <br></br>
        <ListGroup className="rounded-0" id="wd-assignment-grouping">
          <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary"> <BsGripVertical className="me-2 fs-3" /> <FaCaretDown /> ASSIGNMENTS <AssignmentHeader /> </div>
            <ListGroup className="wd-assignments rounded-0 d-flex align-items-center">
              {assignments
                .map((assignment: any) => (
                  <ListGroup.Item action href={`#/Kambaz/Courses/${cid}/Assignments/${assignment._id}`} className="wd-assignment p-3 ps-1 d-flex align-items-center">
                    <BsGripVertical className="me-2 fs-3" /> <LuNotebookPen style={{ color: "green" }}/> 
                    <div className="flex-grow-1"><b>{assignment.title}</b> <p><span className="text-danger">Multiple Modules</span> | <b>Not available until</b> {assignment.available} | <b>Due</b> {assignment.due} | {assignment.points}pts</p></div>
                    <AssignmentControlButtons assignmentId={assignment._id} deleteAssignment={(assignmentId) => removeAssignment(assignmentId)} /> 
                  </ListGroup.Item>
              ))}
            </ListGroup>
          </ListGroup.Item>
        </ListGroup>
      </div>
  );}
  