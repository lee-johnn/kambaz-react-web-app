import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FaTrash } from "react-icons/fa";

export default function AssignmentControlButtons({ assignmentId, deleteAssignment }: {
    assignmentId: string; 
    deleteAssignment: (assignmentId: string) => void
}) {
    return (
        <div className="float-end">
            <GreenCheckmark />
            <IoEllipsisVertical className="fs-4" />
            <FaTrash className="text-danger me-2 mb-1" onClick={(e) => {
                e.preventDefault();
                const check = window.confirm(
                    "Are you sure you want to delete this assignment?"
                );
                if (check) {
                    deleteAssignment(assignmentId);
                }
            }}/>
        </div>
    );}