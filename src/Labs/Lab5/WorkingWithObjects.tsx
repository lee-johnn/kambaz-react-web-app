import  { useState } from "react";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export default function WorkingWithObjects() {
    const [assignment, setAssignment] = useState({
        id: 1, title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10", completed: false, score: 100,
    });
    const [module, setModule] = useState({
        id: 'm1', name: 'Web Development1',
        description: 'Create websites',
        course: 'm101'
    });
      
    const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`
    const MODULE_API_URL = `${REMOTE_SERVER}/lab5/module`
  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>
      <h4>Modifying Properties</h4>
      <a id="wd-update-assignment-title"
         className="btn btn-primary float-end"
         href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
        Update Title
      </a>
      <input className="form-control w-75" id="wd-assignment-title"
        value={assignment.title} onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })}/>
      <hr />
      <h4>Retrieving Objects</h4>
      <a id="wd-retrieve-assignments" className="btn btn-primary"
         href={`${REMOTE_SERVER}/lab5/assignment`}>
        Get Assignment
      </a><hr/>
      <h4>Retrieving Properties</h4>
      <a id="wd-retrieve-assignment-title" className="btn btn-primary"
         href={`${REMOTE_SERVER}/lab5/assignment/title`}>
        Get Title
      </a><hr/>
      <h4>Retrieving Module Properties</h4>
      <a id="wd-retrieve-module-name" className="btn btn-primary"
         href={`${REMOTE_SERVER}/lab5/module/name`}>
        Get Module Name
      </a><hr/>
      <h4>Modifying Module Properties</h4>
      <a id="wd-update-module-name" className="btn btn-primary float-end"
         href={`${ASSIGNMENT_API_URL}/name/${module.name}`}>
        Update Module Name
      </a>
      <input className="form-control w-75" value={module.name} onChange={(e) => 
        setModule({ ...module, name: e.target.value })}/>
      <br/>
      <a id="wd-update-score" className="btn btn-primary float-end"
         href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}>
        Update Score
      </a>
      <input type="number" className="form-control w-75" value={assignment.score} onChange={(e) => 
        setAssignment({ ...assignment, score: parseInt(e.target.value) })}/>
      <br/>
      <a id="wd-update-status" className="btn btn-primary float-end"
         href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}>
        Update Completed Status
      </a>
      <input type="checkbox" checked={assignment.completed} onChange={(e) => 
        setAssignment({ ...assignment, completed: e.target.checked })}/>
      <br/><br/>
      <a id="wd-update-description" className="btn btn-primary float-end" 
         href={`${MODULE_API_URL}/description/${encodeURIComponent(module.description)}`}>
        Update Description
      </a>
      <input type="text" className="form-control w-75 " value={module.description} onChange={(e) => 
        setModule({ ...module, description: e.target.value })}/>
      <hr/>
    </div>
);}