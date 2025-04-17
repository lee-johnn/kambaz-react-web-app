import {Button, Col, Row, Table} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import {v4 as uuidv4} from "uuid";
import {FaPencil} from "react-icons/fa6";
import {useSelector} from "react-redux";

export default function QuizDetails() {
    const {cid, qid} = useParams();
    const navigate = useNavigate();
    const now = new Date().toISOString().slice(0, 16);

    const formatDueDate = (dateTime: string) => {
        if (!dateTime) return '';
        const date = new Date(dateTime);
        const month = date.toLocaleString('default', {month: 'short'});
        const day = date.getDate();
        const time = date.toLocaleString('default', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        }).toLowerCase();
        return `${month} ${day} at ${time}`
    }

    const formatDateForInput = (dateTime: string) => {
        try {
            const date = new Date(dateTime);
            if (isNaN(date.getTime())) {
                return new Date().toISOString().slice(0, 16);
            }
            return date.toISOString().slice(0, 16);
        } catch (error) {
            console.error('Error formatting date for input:', error);
            return new Date().toISOString().slice(0, 16);
        }
    };

    const quiz = useSelector((state: any) => state.quizzesReducer.quizzes)
        .find((quiz: any) => quiz._id === qid);

    const [quizData] = useState({
        _id: quiz?._id || uuidv4(),
        title: quiz?.title || "New Quiz",
        course: quiz?.course || cid,
        description: quiz?.description || "Quiz description",
        totalPoints: quiz?.totalPoints || 100,
        quizType: quiz?.quizType || "Graded Quiz",
        assignmentGroup: quiz?.assignmentGroup || "Quizzes",
        shuffleAnswers: quiz?.shuffleAnswers || true,
        hasTimeLimit: quiz?.hasTimeLimit || true,
        timeLimit: quiz?.timeLimit || 20,
        multipleAttempts: quiz?.multipleAttempts || false,
        allowedAttempts: quiz?.allowedAttempts || 1,
        showCorrectAnswers: quiz?.showCorrectAnswers || false,
        accessCode: quiz?.accessCode || "",
        oneQuestionAtATime: quiz?.oneQuestionAtATime || true,
        webcamRequired: quiz?.webcamRequired || false,
        lockQuestionsAfterAnswering: quiz?.lockQuestionsAfterAnswering || false,
        dueDate: formatDateForInput(quiz?.dueDate || now),
        availableDate: formatDateForInput(quiz?.availableDate || now),
        untilDate: formatDateForInput(quiz?.untilDate || now),
    });

    return (
        <div className="m-4">
            <div className="mb-3 d-flex justify-content-center">
                <Button variant="secondary" size="lg" className="me-1" onClick={() => {
                    navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/edit`)
                //     THIS NEEDS CHANGES
                }}>
                    Preview
                </Button>
                <Button variant="secondary" size="lg" className="me-1" onClick={() => {
                    navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/edit`)
                }}>
                    <FaPencil/> Edit
                </Button>
            </div>

            <div className="border rounded p-3 mb-4">
                <h3><strong>{quizData.title}</strong></h3>
                <Row className="mb-3">
                    <Col sm={4} className="text-end fw-bold">Quiz Type:</Col>
                    <Col sm={8}>{quizData.quizType === "Graded Quiz" ? "Graded Quiz" : quizData.quizType}</Col>
                </Row>

                <Row className="mb-3">
                    <Col sm={4} className="text-end fw-bold">Points:</Col>
                    <Col sm={8}>{quizData.totalPoints}</Col>
                </Row>

                <Row className="mb-3">
                    <Col sm={4} className="text-end fw-bold">Assignment Group:</Col>
                    <Col sm={8}>{quizData.assignmentGroup}</Col>
                </Row>

                <Row className="mb-3">
                    <Col sm={4} className="text-end fw-bold">Shuffle Answers:</Col>
                    <Col sm={8}>{quizData.shuffleAnswers ? "Yes" : "No"}</Col>
                </Row>

                <Row className="mb-3">
                    <Col sm={4} className="text-end fw-bold">Time Limit:</Col>
                    <Col sm={8}>{quizData.timeLimit} Minutes</Col>
                </Row>

                <Row className="mb-3">
                    <Col sm={4} className="text-end fw-bold">Multiple Attempts:</Col>
                    <Col sm={8}>{quizData.multipleAttempts ? "Yes" : "No"}</Col>
                </Row>

                <Row className="mb-3">
                    <Col sm={4} className="text-end fw-bold">Attempt Count:</Col>
                    <Col sm={8}>{quizData.allowedAttempts}</Col>
                </Row>

                <Row className="mb-3">
                    <Col sm={4} className="text-end fw-bold">Access Code:</Col>
                    <Col sm={8}>{quizData.accessCode}</Col>
                </Row>

                <Row className="mb-3">
                    <Col sm={4} className="text-end fw-bold">Show Correct Answers:</Col>
                    <Col sm={8}>{quizData.showCorrectAnswers ? "Yes" : "No"}</Col>
                </Row>

                <Row className="mb-3">
                    <Col sm={4} className="text-end fw-bold">One Question at a Time:</Col>
                    <Col sm={8}>{quizData.oneQuestionAtATime ? "Yes" : "No"}</Col>
                </Row>

                <Row className="mb-3">
                    <Col sm={4} className="text-end fw-bold">Webcam Required:</Col>
                    <Col sm={8}>{quizData.webcamRequired ? "Yes" : "No"}</Col>
                </Row>

                <Row className="mb-3">
                    <Col sm={4} className="text-end fw-bold">Lock Questions After Answering:</Col>
                    <Col sm={8}>{quizData.lockQuestionsAfterAnswering ? "Yes" : "No"}</Col>
                </Row>

                <Table>
                    <thead>
                    <tr>
                        <th>Due</th>
                        <th>For</th>
                        <th>Available from</th>
                        <th>Until</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{formatDueDate(quizData.dueDate)}</td>
                        <td>Everyone</td>
                        <td>{formatDueDate(quizData.availableDate)}</td>
                        <td>{formatDueDate(quizData.untilDate)}</td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    );
}