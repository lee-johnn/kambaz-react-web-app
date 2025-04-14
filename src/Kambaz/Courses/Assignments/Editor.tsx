/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Col, Row } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Link, useParams } from "react-router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAssignment } from "./reducer";
import * as assignmentsClient from "./client";

export default function AssignmentEditor() {
  const dispatch = useDispatch();
  const { aid, cid } = useParams<{ aid: string; cid: string }>();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const [assignment, setAssignment] = useState<any>(
    assignments.find((assignment: any) => assignment._id === aid) ?? {
      _id: aid ?? "",
      course: cid ?? "",
      title: "New Assignment",
      description: "New Assignment Description",
      points: 100,
      assignmentGroup: "assignments",
      displayType: "percentage",
      submissionType: "online",
      assignTo: "everyone",
      releaseDate: "",
      dueDate: "",
      untilDate: "",
      isNew: true,
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setAssignment((prev: any) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    if (assignment?.isNew) {
      delete assignment.isNew;
      await assignmentsClient.createAssignment(assignment);
    } else {
      await assignmentsClient.updateAssignment(assignment);
    }
    dispatch(updateAssignment(assignment));
  }

  return (
    <div className="p-4 pt-0">
      <Form>
        <Form.Group controlId="title">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control
            type="text"
            value={assignment.title}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="description" className="mt-3">
          <Form.Control
            as="textarea"
            value={assignment.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Row className="mt-3">
          <Col className="d-flex align-items-center">
            <div className="d-flex justify-content-end flex-grow-1">
              <Form.Label htmlFor="points" className="m-0">
                Points
              </Form.Label>
            </div>
          </Col>
          <Col sm={8}>
            <Form.Group>
              <Form.Control
                id="points"
                type="number"
                value={assignment.points}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col className="d-flex align-items-center">
            <div className="d-flex justify-content-end flex-grow-1">
              <Form.Label htmlFor="assignmentGroup" className="m-0">
                Assignment Group
              </Form.Label>
            </div>
          </Col>
          <Col sm={8}>
            <Form.Group>
              <Form.Select
                id="assignmentGroup"
                value={assignment.assignmentGroup}
                onChange={handleChange}
              >
                <option value="assignments">Assignments</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col className="d-flex align-items-center">
            <div className="d-flex justify-content-end flex-grow-1">
              <Form.Label htmlFor="displayType" className="m-0">
                Display Grade as
              </Form.Label>
            </div>
          </Col>
          <Col sm={8}>
            <Form.Group>
              <Form.Select
                id="displayType"
                value={assignment.displayType}
                onChange={handleChange}
              >
                <option value="percentage">Percentage</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col className="d-flex">
            <div className="d-flex justify-content-end flex-grow-1">
              <Form.Label htmlFor="submissionType" className="m-0">
                Submission Type
              </Form.Label>
            </div>
          </Col>
          <Col sm={8}>
            <Card className="p-3">
              <Form.Select
                id="submissionType"
                value={assignment.submissionType}
                onChange={handleChange}
              >
                <option value="online">Online</option>
              </Form.Select>

              <Form.Group className="mt-3 d-flex flex-column gap-2">
                <Form.Label className="fw-bold">
                  Online Entry Options
                </Form.Label>
                <Form.Check type="checkbox" label="Text Entry" />
                <Form.Check
                  type="checkbox"
                  label="Website URL"
                  defaultChecked
                />
                <Form.Check type="checkbox" label="Media Recordings" />
                <Form.Check type="checkbox" label="Student Annotation" />
                <Form.Check type="checkbox" label="File Uploads" />
              </Form.Group>
            </Card>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col className="d-flex">
            <div className="d-flex justify-content-end flex-grow-1">
              <Form.Label className="m-0">Assign</Form.Label>
            </div>
          </Col>
          <Col sm={8}>
            <Card className="p-3">
              <Form.Group controlId="assignTo">
                <Form.Label className="fw-bold">Assign to</Form.Label>
                <Form.Select
                  value={assignment.assignTo}
                  onChange={handleChange}
                >
                  <option value="everyone">Everyone</option>
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="dueDate" className="mt-3">
                <Form.Label className="fw-bold">Due</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={
                    assignment.dueDate
                      ? new Date(assignment.dueDate).toISOString().slice(0, 16)
                      : ""
                  }
                  onChange={handleChange}
                />
              </Form.Group>

              <Row className="mt-3">
                <Col>
                  <Form.Group controlId="releaseDate">
                    <Form.Label className="fw-bold">Available from</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      value={
                        assignment.releaseDate
                          ? new Date(assignment.releaseDate)
                              .toISOString()
                              .slice(0, 16)
                          : ""
                      }
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="untilDate">
                    <Form.Label className="fw-bold">Until</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      value={
                        assignment.untilDate
                          ? new Date(assignment.untilDate)
                              .toISOString()
                              .slice(0, 16)
                          : ""
                      }
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        <div className="d-flex justify-content-end mt-4">
          <Link to={`/Kambaz/Courses/${cid}/Assignments`}>
            <Button variant="secondary" className="me-2">
              Cancel
            </Button>
          </Link>
          <Link to={`/Kambaz/Courses/${cid}/Assignments`}>
            <Button variant="danger" onClick={handleSubmit}>Save</Button>
          </Link>
        </div>
      </Form>
    </div>
  );
}