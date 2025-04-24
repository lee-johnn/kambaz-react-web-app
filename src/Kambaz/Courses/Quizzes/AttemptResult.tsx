import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Container, Alert, Card, Badge } from "react-bootstrap";
import { useEffect, useState } from "react";
import * as quizClient from "./client";
import * as courseClient from "../client";

export default function AttemptResult() {
  const { cid, qid, uid, aid } = useParams();
  const [questions, setQuestion] = useState<any[]>([]);
  const [attemptData, setAttemptData] = useState<any>({});
  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const fetchQuiz = async () => {
    try {
      if (cid && qid) {
        const quiz = await courseClient.findQuizById(cid, qid);
        console.log(quiz);
        setQuiz(quiz);
        return quiz;
      }
      throw new Error("Course ID or Quiz ID is undefined");
    } catch (error) {
      console.error("Error fetching quiz:", error);
    } finally {
      setLoading(false);
    }
  };

  const { userAnswers, score, isPreviewMode } = useSelector(
    (state: any) => state.quizAttemptReducer
  );

  const getAnswersFromUser = async () => {
    try {
      console.log("getAnswersFromUser", qid, uid, aid);
      const attempt =
        qid && uid && aid
          ? await quizClient.findQuizAttemptById(qid, uid, aid)
          : null;
      console.log("user attempt", attempt);
      setAttemptData(attempt);
    } catch (error) {
      console.error("Error fetching user answers:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchQuiz();
      await getAnswersFromUser();
      setLoading(false);
    };

    loadData();
  }, []);

  // Get questions from API or Redux
  const fetchQuestions = async (_quizId: string) => {
    try {
      if (!_quizId) {
        throw new Error("Quiz ID is undefined");
      }
      const questions = await quizClient.findQuestionsForQuiz(_quizId);
      console.log(questions);
      setQuestion(questions);
      return questions;
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    if (cid && qid) {
      fetchQuestions(qid);
    }
  }, [cid, qid]);

  const isCorrect = (question: any, answers: any) => {
    const userAnswer = answers[question._id];

    if (userAnswer === undefined) return false;

    switch (question.type) {
      case "MultipleChoice":
        const selectedOption = question.options.find(
          (opt: any) => opt.id === userAnswer
        );
        return selectedOption && selectedOption.isCorrect;

      case "TrueFalse":
        return userAnswer === question.correctAnswer;

      case "FillInBlank":
        // Add a check to ensure correctAnswers exists and is an array
        if (
          !question.correctAnswers ||
          !Array.isArray(question.correctAnswers)
        ) {
          return false;
        }
        const normalizedUserAnswer = String(userAnswer).trim().toLowerCase();
        const normalizedCorrectAnswers = question.correctAnswers.map(
          (ans: string) => ans.trim().toLowerCase()
        );
        return normalizedCorrectAnswers.includes(normalizedUserAnswer);

      default:
        return false;
    }
  };

  const renderAnswerFeedback = (question: any, answers: any) => {
    console.log("renderAnswerFeedback", question, answers);
    const userAnswer = answers[question._id];
    const correct = isCorrect(question, answers);

    switch (question.type) {
      case "MultipleChoice":
        return (
          <div className="mt-3">
            <div className="mb-2">
              <strong>Selected Answer:</strong>
            </div>
            {question.options.map((option: any) => (
              <div
                key={option.id}
                className={`p-2 mb-2 rounded ${
                  userAnswer === option.id
                    ? option.isCorrect
                      ? "bg-success bg-opacity-10"
                      : "bg-danger bg-opacity-10"
                    : option.isCorrect
                    ? "bg-success bg-opacity-10"
                    : ""
                }`}
              >
                <input
                  type="radio"
                  className="form-check-input"
                  name={`question-${question._id}`}
                  id={`option-${option.id}`}
                  checked={userAnswer === option.id}
                  readOnly
                  style={{ opacity: 1 }}
                />{" "}
                {""}
                {option.text}
                {option.isCorrect && (
                  <Badge bg="success" className="ms-2">
                    Correct
                  </Badge>
                )}
                {userAnswer === option.id && !option.isCorrect && (
                  <Badge bg="danger" className="ms-2">
                    Incorrect
                  </Badge>
                )}
              </div>
            ))}
          </div>
        );

      case "TrueFalse":
        return (
          <div className="mt-3">
            <div className="mb-2">
              <strong>Selected Answer:</strong>
            </div>
            <div
              className={`p-2 mb-2 rounded ${
                userAnswer === true
                  ? question.correctAnswer
                    ? "bg-success bg-opacity-10"
                    : "bg-danger bg-opacity-10"
                  : question.correctAnswer === true
                  ? "bg-success bg-opacity-10"
                  : ""
              }`}
            >
              <input
                type="radio"
                className="form-check-input"
                name={`question-${question._id}-true`}
                checked={userAnswer === true}
                readOnly
                style={{ opacity: 1 }}
              />{" "}
              True
              {question.correctAnswer === true && (
                <Badge bg="success" className="ms-2">
                  Correct
                </Badge>
              )}
              {userAnswer === true && !question.correctAnswer && (
                <Badge bg="danger" className="ms-2">
                  Incorrect
                </Badge>
              )}
            </div>
            <div
              className={`p-2 mb-2 rounded ${
                userAnswer === false
                  ? question.correctAnswer === false
                    ? "bg-success bg-opacity-10"
                    : "bg-danger bg-opacity-10"
                  : question.correctAnswer === false
                  ? "bg-success bg-opacity-10"
                  : ""
              }`}
            >
              <input
                type="radio"
                className="form-check-input"
                name={`question-${question._id}-false`}
                checked={userAnswer === false}
                readOnly
                style={{ opacity: 1 }}
              />{" "}
              False
              {question.correctAnswer === false && (
                <Badge bg="success" className="ms-2">
                  Correct
                </Badge>
              )}
              {userAnswer === false && question.correctAnswer !== false && (
                <Badge bg="danger" className="ms-2">
                  Incorrect
                </Badge>
              )}
            </div>
          </div>
        );

      case "FillInBlank":
        return (
          <div className="mt-3">
            <div className="mb-2">
              <strong>Your Answer:</strong> {userAnswer || "(no answer)"}
            </div>
            <div className="mb-2">
              <strong>Accepted Answers:</strong>{" "}
              {question.correctAnswers && Array.isArray(question.correctAnswers)
                ? question.correctAnswers.join(", ")
                : "No correct answers provided"}
            </div>
            {correct ? (
              <Badge bg="success">Correct</Badge>
            ) : (
              <Badge bg="danger">Incorrect</Badge>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  // Convert the array of answers to a map keyed by question ID
  const processAnswers = (answers: any) => {
    if (!answers || !Array.isArray(answers)) return {};

    // Create an object where keys are question IDs and values are the user's answers
    const answerMap: Record<string, any> = {};
    answers.forEach((answer) => {
      if (answer.questionId) {
        answerMap[answer.questionId] = answer.answer;
      }
    });
    return answerMap;
  };

  // Process the answers from database format to the format expected by our functions
  const processedAnswers = processAnswers(attemptData?.answers);

  if (loading) {
    return (
      <Container className="my-4">
        <div className="text-center">
          <p>Loading quiz results...</p>
        </div>
      </Container>
    );
  }

  if (!quiz) {
    return (
      <Container className="my-4">
        <Alert variant="danger">
          Failed to load quiz. Please try again later.
        </Alert>
      </Container>
    );
  }

  return isPreviewMode ? (
    <Container className="my-4">
      <h2 className="mb-3">{quiz.title} - Results</h2>
      {(currentUser?.role === "ADMIN" || currentUser?.role === "FACULTY") && (
        <Alert variant="danger" className="mb-4">
          <strong>Preview Mode</strong> - This is a preview of the quiz.
        </Alert>
      )}
      <p>
        Score for this quiz: <strong>{score.points}</strong> out of{" "}
        {score.total}
      </p>
      <h3 className="mb-3">Question Details</h3>
      {questions.map((question: any, index: number) => (
        <Card key={question._id} className="mb-3">
          <Card.Header className="d-flex justify-content-between align-items-center">
            <div>
              <strong>Question {index + 1}</strong> ({question.points} pts)
            </div>
            <Badge bg={isCorrect(question, userAnswers) ? "success" : "danger"}>
              {isCorrect(question, userAnswers) ? "Correct" : "Incorrect"}
            </Badge>
          </Card.Header>
          <Card.Body>
            <Card.Title>{question.question}</Card.Title>
            {renderAnswerFeedback(question, userAnswers)}
          </Card.Body>
        </Card>
      ))}
    </Container>
  ) : (
    <Container className="my-4">
      <h2 className="mb-3">{quiz.title} - Results</h2>
      <p>
        Score for this quiz: <strong>{attemptData.score}</strong> out of{" "}
        {attemptData.totalPoints}
      </p>
      <h3 className="mb-3">Question Details</h3>
      {questions.map((question: any, index: number) => (
        <Card key={question._id} className="mb-3">
          <Card.Header className="d-flex justify-content-between align-items-center">
            <div>
              <strong>Question {index + 1}</strong> ({question.points} pts)
            </div>
            <Badge
              bg={isCorrect(question, processedAnswers) ? "success" : "danger"}
            >
              {isCorrect(question, processedAnswers) ? "Correct" : "Incorrect"}
            </Badge>
          </Card.Header>
          <Card.Body>
            <Card.Title>{question.question}</Card.Title>
            {renderAnswerFeedback(question, processedAnswers)}
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}
