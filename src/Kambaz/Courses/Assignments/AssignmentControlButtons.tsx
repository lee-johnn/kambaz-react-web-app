import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";

export default function AssignmentControlButtons() {
    return (
        <div className="float-end">
            <button type="button" className="btn btn-light btn-sm me-2" style={{ borderRadius: '20px' }}>40% of Total</button>
            <FaPlus />
            <IoEllipsisVertical className="fs-4" />
        </div>
    );
}