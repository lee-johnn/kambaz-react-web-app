import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";

export default function QuizControls({ addQuiz }: { addQuiz: () => void }) {
  return (
    <div
      id="wd-quiz-controls"
      className="d-flex justify-content-end align-items-center pb-3"
    >
      <div className="input-group">
        <span className="input-group-text">
          <CiSearch />
        </span>
        <input
          type="text"
          id="wd-search-quiz"
          className="form-control"
          placeholder="Search for Quiz"
        />
      </div>

      <div className="d-flex ms-3">
        <button
          id="wd-add-quiz-btn"
          className="btn btn-lg btn-danger d-flex align-items-center justify-content-center"
        >
          <FaPlus className="me-2" onClick={addQuiz} />
          <h6 className="d-none d-sm-block m-0">Quiz</h6>
        </button>
        <button
          id="wd-quiz-btn"
          className="btn btn-secondary ms-2 d-flex align-items-center"
        >
          <IoEllipsisVertical className="fs-4" />
        </button>
      </div>
    </div>
  );
}
