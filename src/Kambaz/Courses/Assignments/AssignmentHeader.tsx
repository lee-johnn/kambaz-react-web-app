import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { Button } from "react-bootstrap";
export default function AssignmentHeader () {
    return (
        <div className="float-end text-align-center">
            <Button variant="secondary" className="position-relative me-2 rounded-5 border-black">40% of Total</Button>
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            <IoEllipsisVertical className="fs-4" />
        </div>
    );}