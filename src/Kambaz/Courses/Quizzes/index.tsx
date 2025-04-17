import { ListGroup } from "react-bootstrap";
import { FaRocket } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setQuizzes } from "./reducer.ts";
import * as coursesClient from "../client";
import * as quizzesClient from "./client";
import { useEffect } from "react";
import { GoTriangleDown } from "react-icons/go";
import QuizControls from "./QuizControls.tsx";
import GreenCheckmark from "../Modules/GreenCheckmark.tsx";
import RedCheckmark from "./RedCheckmark.tsx";


export default function Quizzes() {
    const { cid } = useParams();

    const formatDueDate = (dateTime: string) => {
        if (!dateTime) return '';
        const date = new Date(dateTime);
        const month = date.toLocaleString('default', { month: 'short' });
        const day = date.getDate();
        const time = date.toLocaleString('default', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        }).toLowerCase();
        return `${month} ${day} at ${time}`
    }
    const navigate = useNavigate();
    const handleAddQuiz = () => {
      navigate(`/Kambaz/Courses/${cid}/Quizzes/new/edit`);
    };

    const getAvailability = (quiz: any) => {
        const now = new Date();
        const availableFrom = quiz.availableDate ? new Date(quiz.availableDate) : null;
        const availableUntil = quiz.untilDate ? new Date(quiz.untilDate) : null;

        if (!availableUntil || !availableFrom) return null;

        if (now > availableUntil) {
            return <span className="text-secondary fw-semibold">Closed</span>;
        } else if (now >= availableFrom && now <= availableUntil) {
            return <span className="text-success fw-semibold">Available</span>;
        } else if (now < availableFrom) {
            return (
                <span className="text-danger fw-semibold">
                    Not available until {formatDueDate(quiz.availableDate)}
                </span>
            );
        }

        return null;
    };

    const dispatch = useDispatch();
    const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);

    const fetchQuizzes = async () => {
        const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
        dispatch(setQuizzes(quizzes));
    };
    useEffect(() => {
        fetchQuizzes();
    }, []);

    const handleDeleteQuiz = async (quizId: string) => {
        await quizzesClient.deleteQuiz(quizId);
        fetchQuizzes();
    };

    const togglePublish = async (quiz: any) => {
        await quizzesClient.publishQuiz(quiz._id, !quiz.published);
        fetchQuizzes();
    };

    return (
        <div id="wd-quizzes">
            <QuizControls addQuiz={handleAddQuiz} /><br /><br /><br /><br />
            <ListGroup className="list-group rounded-0" id="wd-quiz">
                <ListGroup.Item className="wd-quiz list-group-item p-0 fs-5">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <GoTriangleDown className="me-2 fs-3" />
                        <b> Assignment Quizzes </b>
                    </div>
                    <ListGroup className="wd-quiz list-group rounded-0">
                        {quizzes.map((quiz: any) => (
                            <ListGroup.Item key={quiz._id} className="d-flex justify-content-between align-items-center px-3 py-2" style={{ borderLeft: "4px solid green" }}>
                                <div className="d-flex align-items-start gap-3 w-100">
                                    <div className="pt-1">
                                        <FaRocket className="text-success" />
                                    </div>
                                    <div className="flex-grow-1">
                                        <div className="fw-bold" style={{ cursor: 'pointer' }} onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/view`)}>
                                            {quiz.title}
                                        </div>
                                        <div>
                                            {getAvailability(quiz)}
                                            <span className="mx-2">|</span>
                                            <span><strong>Due</strong> {formatDueDate(quiz.dueDate)}</span>
                                            <span className="mx-2">|</span>
                                            <span>{quiz.totalPoints} pts</span>
                                            <span className="mx-2">|</span>
                                            <span>{quiz.questions?.length || 0} Questions</span>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center gap-3">
                                        <span style={{ cursor: "pointer" }} onClick={() => togglePublish(quiz)}>
                                            {quiz.published ? <GreenCheckmark /> : <RedCheckmark />}
                                        </span>
                                        <div className="dropdown">
                                            <ul className="dropdown-menu">
                                                <li><button className="dropdown-item" onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/edit`)}>Edit</button></li>
                                                <li><button className="dropdown-item" onClick={() => handleDeleteQuiz(quiz._id)}>Delete</button></li>
                                                <li><button className="dropdown-item" onClick={() => togglePublish(quiz)}>{quiz.published ? "Unpublish" : "Publish"}</button></li>
                                                <li><button className="dropdown-item" onClick={() => alert("Copy functionality not implemented")}>Copy</button></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </ListGroup.Item>
            </ListGroup>
        </div>
    );
}