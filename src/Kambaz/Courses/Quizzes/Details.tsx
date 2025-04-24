import { Button, Col, Row, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaPencil } from "react-icons/fa6";
import { useSelector } from "react-redux";
import * as quizClient from "./client";

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const now = new Date().toISOString().slice(0, 16);

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isStudent = currentUser?.role === "STUDENT";

  const [questionCount, setQuestionCount] = useState(0);
  const [attempts, setAttempts] = useState([]);

  const formatDueDate = (dateTime: string) => {
    if (!dateTime) return "";
    const date = new Date(dateTime);
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    const time = date
      .toLocaleString("default", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
      .toLowerCase();
    return `${month} ${day} at ${time}`;
  };

  const formatDateForInput = (dateTime: string) => {
    try {
      const date = new Date(dateTime);
      if (isNaN(date.getTime())) {
        return new Date().toISOString().slice(0, 16);
      }
      return date.toISOString().slice(0, 16);
    } catch (error) {
      console.error("Error formatting date for input:", error);
      return new Date().toISOString().slice(0, 16);
    }
  };

  const formatDuration = (durationMs: any) => {
    if (!durationMs || isNaN(durationMs)) return "N/A";

    // Convert to seconds
    let totalSeconds = Math.floor(durationMs / 1000);

    // Calculate hours, minutes, seconds
    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);

    // Return formatted string
    if (hours > 0) {
      return `${hours} hours`;
    } else {
      return `${minutes} minutes`;
    }
  };

  const quiz = useSelector((state: any) => state.quizzesReducer.quizzes).find(
    (quiz: any) => quiz._id === qid
  );

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
    allowedAttempts: quiz?.maxAttempts || quiz?.allowedAttempts || 1,
    showCorrectAnswers: quiz?.showCorrectAnswers || false,
    accessCode: quiz?.accessCode || "",
    oneQuestionAtATime: quiz?.oneQuestionAtATime || true,
    webcamRequired: quiz?.webcamRequired || false,
    lockQuestionsAfterAnswering: quiz?.lockQuestionsAfterAnswering || false,
    dueDate: formatDateForInput(quiz?.dueDate || now),
    availableDate: formatDateForInput(quiz?.availableDate || now),
    untilDate: formatDateForInput(quiz?.untilDate || now),
  });

  useEffect(() => {
    const getQuestions = async () => {
      try {
        if (qid) {
          const questions = await quizClient.findQuestionsForQuiz(qid);
          setQuestionCount(questions.length);
        } else {
          console.error("Quiz ID is undefined");
          setQuestionCount(0);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
        setQuestionCount(0);
      }
    };

    getQuestions();
  }, [quizData._id]);

  const getQuizAttempts = async () => {
    try {
      if (qid) {
        console.log("Fetching quiz attempts for quiz ID:", qid);
        const quizAttempts = await quizClient.findQuizAttempts(
          qid,
          currentUser._id
        );
        console.log("Quiz Attempts:", quizAttempts);
        return quizAttempts;
      } else {
        console.error("Quiz ID is undefined");
      }
    } catch (error) {
      console.error("Error fetching quiz attempts:", error);
    }
    return [];
  };

  useEffect(() => {
    const fetchAttempts = async () => {
      try {
        const data = await getQuizAttempts();
        setAttempts(data);
      } catch (error) {
        console.error("Error fetching attempts:", error);
      }
    };

    fetchAttempts();
  }, [qid, currentUser._id]); // Dependencies

  const renderAttempts = () => {
    return (
      <>
        {" "}
        <h4>Attempt History</h4>
        <Table>
          <thead>
            <tr>
              <th></th>
              <th>Attempt</th>
              <th>Time</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {attempts.map((attempt: any) => {
              // Calculate duration in milliseconds
              const startTime = new Date(attempt.startTime).getTime();
              const endTime = new Date(attempt.endTime).getTime();
              const durationMs = endTime - startTime;

              return (
                <tr key={attempt._id}>
                  <td></td>
                  <td
                    className="text-primary cursor-pointer"
                    onClick={() =>
                      navigate(
                        `/Kambaz/Courses/${cid}/Quizzes/${qid}/${currentUser._id}/attempt/${attempt._id}/results`
                      )
                    }
                    style={{ cursor: "pointer", textDecoration: "underline" }}
                  >
                    Attempt {attempt.attemptNumber}
                  </td>
                  <td>{formatDuration(durationMs)}</td>
                  <td>{attempt.score}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </>
    );
  };

  return (
    <div className="m-4">
      {isStudent ? (
        <div>
          <div className="border rounded p-3 mb-4">
            <h3>
              <strong>{quizData.title}</strong>
            </h3>

            <Table>
              <thead>
                <tr>
                  <th>Due</th>
                  <th>Available</th>
                  <th>Points</th>
                  <th>Questions</th>
                  <th>Time Limit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{formatDueDate(quizData.dueDate)}</td>
                  <td>
                    {formatDueDate(quizData.availableDate)} -{" "}
                    {formatDueDate(quizData.untilDate)}
                  </td>
                  <td>{quizData.totalPoints}</td>
                  <td>{questionCount}</td>
                  <td>{quizData.timeLimit} min</td>
                </tr>
              </tbody>
              <thead>
                <tr>
                  <th>Allowed Attempts</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{quizData.allowedAttempts}</td>
                </tr>
              </tbody>
            </Table>
            {attempts.length < quizData.allowedAttempts &&
              new Date(quizData.dueDate) > new Date() && (
                <div className="my-3 d-flex justify-content-center">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() =>
                      navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/attempt`)
                    }
                  >
                    Start Quiz
                  </Button>
                </div>
              )}
          </div>
          {Array.isArray(attempts) && attempts.length > 0 && (
            <div className="border rounded p-3 mb-4">{renderAttempts()}</div>
          )}
        </div>
      ) : (
        <>
          <div className="mb-3 d-flex justify-content-center">
            <Button
              variant="secondary"
              size="lg"
              className="me-1"
              onClick={() => {
                navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/preview`);
              }}
            >
              Preview
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="me-1"
              onClick={() => {
                navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/edit`);
              }}
            >
              <FaPencil /> Edit
            </Button>
          </div>

          <div className="border rounded p-3 mb-4">
            <h3>
              <strong>{quizData.title}</strong>
            </h3>
            <Row className="mb-3">
              <Col sm={4} className="text-end fw-bold">
                Quiz Type:
              </Col>
              <Col sm={8}>
                {quizData.quizType === "Graded Quiz"
                  ? "Graded Quiz"
                  : quizData.quizType}
              </Col>
            </Row>

            <Row className="mb-3">
              <Col sm={4} className="text-end fw-bold">
                Points:
              </Col>
              <Col sm={8}>{quizData.totalPoints}</Col>
            </Row>

            <Row className="mb-3">
              <Col sm={4} className="text-end fw-bold">
                Assignment Group:
              </Col>
              <Col sm={8}>{quizData.assignmentGroup}</Col>
            </Row>

            <Row className="mb-3">
              <Col sm={4} className="text-end fw-bold">
                Shuffle Answers:
              </Col>
              <Col sm={8}>{quizData.shuffleAnswers ? "Yes" : "No"}</Col>
            </Row>

            <Row className="mb-3">
              <Col sm={4} className="text-end fw-bold">
                Time Limit:
              </Col>
              <Col sm={8}>{quizData.timeLimit} Minutes</Col>
            </Row>

            <Row className="mb-3">
              <Col sm={4} className="text-end fw-bold">
                Multiple Attempts:
              </Col>
              <Col sm={8}>{quizData.multipleAttempts ? "Yes" : "No"}</Col>
            </Row>

            <Row className="mb-3">
              <Col sm={4} className="text-end fw-bold">
                Attempt Count:
              </Col>
              <Col sm={8}>{quizData.allowedAttempts}</Col>
            </Row>

            <Row className="mb-3">
              <Col sm={4} className="text-end fw-bold">
                Access Code:
              </Col>
              <Col sm={8}>{quizData.accessCode}</Col>
            </Row>

            <Row className="mb-3">
              <Col sm={4} className="text-end fw-bold">
                Show Correct Answers:
              </Col>
              <Col sm={8}>{quizData.showCorrectAnswers ? "Yes" : "No"}</Col>
            </Row>

            <Row className="mb-3">
              <Col sm={4} className="text-end fw-bold">
                One Question at a Time:
              </Col>
              <Col sm={8}>{quizData.oneQuestionAtATime ? "Yes" : "No"}</Col>
            </Row>

            <Row className="mb-3">
              <Col sm={4} className="text-end fw-bold">
                Webcam Required:
              </Col>
              <Col sm={8}>{quizData.webcamRequired ? "Yes" : "No"}</Col>
            </Row>

            <Row className="mb-3">
              <Col sm={4} className="text-end fw-bold">
                Lock Questions After Answering:
              </Col>
              <Col sm={8}>
                {quizData.lockQuestionsAfterAnswering ? "Yes" : "No"}
              </Col>
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
        </>
      )}
    </div>
  );
}
