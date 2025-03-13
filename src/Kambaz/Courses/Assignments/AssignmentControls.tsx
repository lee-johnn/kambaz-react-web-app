import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useParams } from "react-router";
export default function AssignmentControls() {
    const { cid } = useParams();
    return (
        <div id="wd-assignment-controls" className="text-nowrap d-flex align-items-center gap-4">
            <InputGroup.Text style={{ width: "400px"}} className="rounded-0 border-grey">
                <FaSearch className="me-2"/>
                <Form.Control id="wd-assignment-search" placeholder="Search..."/>
            </InputGroup.Text >
            <Button variant="secondary" className="flex-end" size="lg"><FaPlus className="position-relative me-2" /> Module</Button>
            <Button variant="danger" className="flex-end" size="lg" href={`#/Kambaz/Courses/${cid}/Assignments/New`}><FaPlus className="position-relative me-2" /> 
                Assignment
            </Button>
        </div>
    );}