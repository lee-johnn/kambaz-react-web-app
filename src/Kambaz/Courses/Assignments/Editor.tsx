export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor">
        <label htmlFor="wd-name"><b>Assignment Name</b></label><br/><br/>
        <input id="wd-name" value="A1 - ENV + HTML" />
        <br /><br />
        <textarea id="wd-description">
          The assignment is available online
          Submit a link to the landing page of your Web Application
          running on Netlify. The landing page should include the following:
          Your full name and section Links to each of the lab assignments Link to the Kambaz
          application Links to all relevant source code respositories
          The Kambaz application should include a link to navigate back to the landing page.
        </textarea>
        <br/><br/>
        <table>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label><br/><br/>
            </td>
            <td>
              <input id="wd-points" value={100} /><br/><br/>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-group">Assignment Group</label><br/><br/>
            </td>
            <td>
                <select id="wd-select-one-genre">
                    <option value="ASSIGNMENT">ASSIGNMENT</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select><br/><br/>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade-as">Display Grade as</label><br/><br/>
            </td>
            <td>
                <select id="wd-select-one-genre">
                    <option value="Percentage">Percentage</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select><br/><br/>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
                <select id="wd-select-one-genre">
                    <option value="Online">Online</option>
                </select><br/><br/>
                <label>Online Entry Options</label><br/>
                <input type="checkbox"
                       name="wd-submission-type" id="wd-text-entry"/>
                <label htmlFor="wd-chkbox-text-entry">Text Entry</label><br/>
                <input type="checkbox"
                       name="wd-submission-type" id="wd-website-url"/>
                <label htmlFor="wd-chkbox-website-url">Website URL</label><br/>
                <input type="checkbox"
                       name="wd-submission-type" id="wd-media-recordings"/>
                <label htmlFor="wd-chkbox-media-recordings">Media Recordings</label><br/>
                <input type="checkbox"
                       name="wd-submission-type" id="wd-student-annotation"/>
                <label htmlFor="wd-chkbox-student-annotation">Student Annotation</label><br/>
                <input type="checkbox"
                       name="wd-submission-type" id="wd-file-upload"/>
                <label htmlFor="wd-chkbox-file-upload">File Upload</label><br/>
            </td>
          </tr><br></br>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-assign-to">Assign Assign to</label><br />
              <input type="text" id="wd-assign-to" value="Everyone"/>
            </td>
          </tr><br></br>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-assign-to">Due</label>
              <td align="right" valign="bottom">
                <input type="date" id="wd-due-date" defaultValue="2024-05-13"/>
              </td>
            </td>
          </tr><br></br>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-available-from">Available from</label>
            </td>
            <td align="left" valign="top">
              <label htmlFor="wd-available-until">Until</label>
            </td>
          </tr>
          <tr>
          <td align="right" valign="top">
                <input type="date" id="wd-available-from" defaultValue="2024-05-06"/>
          </td>
          <td align="left" valign="top">
                <input type="date" id="wd-available-until" defaultValue="2024-05-20"/>
          </td>
          </tr>
        <tr>
          <td align="right" valign="top" colSpan={2}>
            <hr />
            <button id="wd-cancel" type="button">
                Cancel
            </button>
            <button id="wd-save" type="button">
                Save
            </button>
          </td>
        </tr>
    </table>
</div>
  );
}  