import { useLocation, useParams } from "react-router";
import { assignments } from "../../Database";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function AssignmentEditor() {
    const { cid } = useParams();
    const { pathname } = useLocation();

    const aid = pathname.split("/").pop();
    const assignment = assignments.find(a => a._id === aid);

    // State for handling date inputs with both date and time
    const [dueDate, setDueDate] = useState(assignment?.due || "");
    const [availableFrom, setAvailableFrom] = useState(assignment?.available || "");
    const [availableUntil, setAvailableUntil] = useState("");

    return (
        <div id="wd-assignments-editor">
            <div className="container">
                <div className="row input-group mb-2">
                    <label htmlFor="wd-name" className="form-label">Assignment Name</label>
                    <input id="wd-name" className="form-control" value={assignment?.title} />
                </div>

                <div className="row input-group mb-2">
                    <textarea
                        id="wd-description"
                        className="form-control"
                        rows={10}
                        cols={60}
                        defaultValue={assignment?.description}
                    />
                </div>

                <div className="row mb-2">
                    <div className="col-3">
                        <label htmlFor="wd-points" className="col-form-label float-end">Points</label>
                    </div>
                    <div className="col">
                        <input id="wd-points" type="number" className="form-control" value={assignment?.points} />
                    </div>
                </div>

                <div className="row mb-2">
                    <div className="col-3">
                        <label htmlFor="wd-assign" className="col-form-label float-end">Assign</label>
                    </div>
                    <div className="col">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <label htmlFor="wd-assign-to" className="form-label"><b>Assign to</b></label>
                                    <div className="input-group">
                                        <input id="wd-assign-to" type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col">
                                        <label htmlFor="wd-due-date"><b>Due</b></label>
                                        <input
                                            id="wd-due-date"
                                            type="datetime-local"
                                            className="form-control"
                                            value={dueDate}
                                            onChange={(e) => setDueDate(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="row mt-2">
                                    <div className="col-6">
                                        <label htmlFor="wd-available-from"><b>Available from</b></label>
                                        <input
                                            id="wd-available-from"
                                            type="datetime-local"
                                            className="form-control"
                                            value={availableFrom}
                                            onChange={(e) => setAvailableFrom(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="wd-available-until"><b>Until</b></label>
                                        <input
                                            id="wd-available-until"
                                            type="datetime-local"
                                            className="form-control"
                                            value={availableUntil}
                                            onChange={(e) => setAvailableUntil(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <hr />
                </div>

                <div className="mb-2">
                    <Link key={'save'} to={`/Kambaz/Courses/${cid}/Assignments`}>
                        <input type="button" className="btn btn-danger float-end ms-2" value="Save" />
                    </Link>
                    <Link key={'cancel'} to={`/Kambaz/Courses/${cid}/Assignments`}>
                        <input type="button" className="btn btn-secondary float-end" value="Cancel" />
                    </Link>
                </div>

                <div className="row" style={{ height: '30px', width: '100%' }}></div>
            </div>
        </div>
    )
}