import { Button, Form } from "react-bootstrap";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addAssignment, updateAssignment } from "./reducer";

export default function AssignmentEditor()  {
    const { cid } = useParams();
    const { aid } = useParams();
    const dispatch = useDispatch();
    
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);
    
    const [assignment, setAssignment] = useState({
      title: "New Assignment123",
      description: "New Assignment Description",
      points: 100,
      due: "2020-01-01",
      available: "2020-01-01",
      course: cid,
    });

    const save = () => {
      if (aid === "New") {
        dispatch(addAssignment(assignment));
      } else {
        dispatch(updateAssignment(assignment));
      }
    }

    const update_values = (e: any) => {
      const { field, value } = e.target;
      setAssignment(prevState => ({
        ...prevState,
        [field]: value
      }))
    }
    
    useEffect(() => {
      if (aid !== "New") {
        const a = assignments.find((a: any) => a._id === aid);
        setAssignment(a);
      }
    })
    return (
      <Form id="wd-assignments-editor">
        <label htmlFor="wd-name"><h5>Assignment Name</h5></label>
        <Form.Control style={{ width: 600 }} id="wd-name" className="mb-2" value={assignment.title} onChange={update_values}/>
        <Form.Control style={{ width: 600, height: 400 }} as="textarea" id="wd-description" defaultValue="The assignment is available online Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following: Your full name and section Links to each of the lab assignments Link to the Kambas application Links to all relevant source code repositories The Kambas application should include a link to navigate back to the landing page" value={assignment?.description} />
        <br/>
        <Form.Group className="d-flex align-items-center">
          <Form.Label className="mr-3" style={{paddingRight: '20px', paddingLeft: '205px' }} htmlFor="wd-points">Points</Form.Label>
          <Form.Control style={{ width: 300 }} id="wd-points" defaultValue={100} value={assignment?.points} />
        </Form.Group>
        <br/>
        <Form.Group className="d-flex align-items-center">
          <Form.Label className="mr-3" style={{paddingRight: '20px', paddingLeft: '120px' }} htmlFor="wd-group">Assignment Group</Form.Label>
          <Form.Select style={{ width: 300 }} id="wd-group">
            <option>ASSIGNMENTS</option>
          </Form.Select>
        </Form.Group>
        <br/>
        <Form.Group className="d-flex align-items-center">
          <Form.Label className="mr-3" style={{paddingRight: '20px', paddingLeft: '130px' }} htmlFor="wd-grade-as">Display Grade as</Form.Label>
          <Form.Select style={{ width: 300 }} id="wd-grade-as">
            <option>Percentage</option>
          </Form.Select>
        </Form.Group>
        <br/>
        <Form.Group>
          <Form.Group className="d-flex align-items-center">
            <Form.Label className="mr-3" style={{paddingRight: '20px', paddingLeft: '130px' }} htmlFor="wd-submission-type">Submission Type</Form.Label>
            <Form.Select style={{ width: 300 }} id="wd-submission-type">
                <option>Online</option>
              </Form.Select>
            
          </Form.Group>
        <br />
          <Form.Group style={{ paddingLeft: '280px' }}>
            
            <Form.Label>Online Entry Options</Form.Label>
            <Form.Check type="checkbox" label="Text Entry" />
            <Form.Check type="checkbox" label="Website URL" />
            <Form.Check type="checkbox" label="Media Recordings" />
            <Form.Check type="checkbox" label="Student Annotation" />
            <Form.Check type="checkbox" label="File Uploads" />
          </Form.Group>
        </Form.Group>
        <br/>
        <Form.Group>
          <Form.Group className="d-flex align-items-center">
            <Form.Label className="mr-3" style={{paddingRight: '20px', paddingLeft: '205px' }}>Assign</Form.Label>
            <Form.Label htmlFor="wd-assign-to"><b>Assign to</b></Form.Label>
          </Form.Group>
            <Form.Group style={{ paddingLeft: '280px' }}>
              <Form.Control style={{ width: 300 }} id="wd-assign-to" defaultValue="Everyone" />
              <br />
              <Form.Label htmlFor="wd-due-date"><b>Due</b></Form.Label>
              <Form.Control type="date" style={{ width: 300 }} id="wd-due-date" value={assignment?.due} />
              <br />
              <Form.Group className="d-flex align-items-center">
                <Form.Label htmlFor="wd-available-from" style={{ paddingRight: '35px' }}><b>Available From</b></Form.Label>
                <Form.Label htmlFor="wd-available-until"><b>Until</b></Form.Label>
              </Form.Group>
              <Form.Group className="d-flex align-items-center">
                <Form.Control type="date" style={{ width: 150 }} id="wd-available-from" defaultValue={assignment?.available} />
                <Form.Control type="date" style={{ width: 150 }} id="wd-available-until" />
              </Form.Group>
            </Form.Group>
        </Form.Group>
        <br />
        <hr />
        <Form.Group className="d-flex align-items-center" style={{ paddingLeft: '470px'}}>
          <Button href={`#/Kambaz/Courses/${cid}/Assignments`} variant="light" size="sm">Cancel</Button>
          <Button href={`#/Kambaz/Courses/${cid}/Assignments`} variant="danger" size="sm" onClick={save}>Save</Button>
        </Form.Group>
      </Form>
  );}
  