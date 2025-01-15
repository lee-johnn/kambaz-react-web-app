export default function CourseStatus() {
    return (
      <div id="wd-course-status">
        <h2>Course Status</h2>
        <button>Unpublish</button> <button>Publish</button>
        <p id="wd-p-1">
        <button id="wd-all-good" onClick={() => alert("Import Existing Content")} type="button">
          Import Existing Content
        </button>
        <button>Import from commons</button>
        <button>Choose Home Page</button>
        <button>View Course Stream</button>
        <button>New Announcement</button>
        <button>New Analytics</button>
        <button>View Course Notifications</button>
        </p>
      </div>
    );
}