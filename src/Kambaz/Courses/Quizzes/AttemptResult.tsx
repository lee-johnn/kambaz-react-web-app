import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Container, Alert, Card, Badge, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import * as quizClient from "./client";

export default function AttemptResult({ quiz }: any) {
  const { cid, qid } = useParams();
  const [questions, setQuestion] = useState<any[]>([]);

  const { userAnswers, score, isPreviewMode } = useSelector(
    (state: any) => state.quizAttemptReducer
  );

  // Get questions from API or Redux
  const fetchQuestions = async (_quizId: string) => {
    if (!_quizId) {
      throw new Error("Quiz ID is undefined");
    }
    const questions = await quizClient.findQuestionsForQuiz(_quizId);
    console.log(questions);
    setQuestion(questions);
    return questions;
  };

  useEffect(() => {
    if (cid && qid) {
      fetchQuestions(qid);
    }
  }, [cid, qid]);

  // const percentage = (score.points / score.total) * 100;
  // const getScoreVariant = () => {
  //   if (percentage >= 80) return "success";
  //   if (percentage >= 70) return "primary";
  //   if (percentage >= 60) return "info";
  //   if (percentage >= 50) return "warning";
  //   return "danger";
  // };

  const isCorrect = (question: any) => {
    const userAnswer = userAnswers[question._id];

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
        const normalizedUserAnswer = String(userAnswer).trim().toLowerCase();
        const normalizedCorrectAnswers = question.correctAnswers.map(
          (ans: string) => ans.trim().toLowerCase()
        );
        return normalizedCorrectAnswers.includes(normalizedUserAnswer);

      default:
        return false;
    }
  };

  const renderAnswerFeedback = (question: any) => {
    const userAnswer = userAnswers[question._id];
    const correct = isCorrect(question);

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
              <strong>Your Answer:</strong> {userAnswer ? "True" : "False"}
            </div>
            <div className="mb-2">
              <strong>Correct Answer:</strong>{" "}
              {question.correctAnswer ? "True" : "False"}
            </div>
            {correct ? (
              <Badge bg="success">Correct</Badge>
            ) : (
              <Badge bg="danger">Incorrect</Badge>
            )}
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
              {question.correctAnswers.join(", ")}
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

  return (
    <Container className="my-4">
      <h2 className="mb-3">{quiz.title} - Results</h2>

      {isPreviewMode && (
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
            <Badge bg={isCorrect(question) ? "success" : "danger"}>
              {isCorrect(question) ? "Correct" : "Incorrect"}
            </Badge>
          </Card.Header>
          <Card.Body>
            <Card.Title>{question.question}</Card.Title>
            {renderAnswerFeedback(question)}
          </Card.Body>
        </Card>
      ))}

      <div className="d-flex justify-content-between mt-4 mb-5">
        <Button variant="secondary" onClick={() => window.history.back()}>
          Back to Quiz
        </Button>

        <Button variant="primary" onClick={() => window.location.reload()}>
          Retake Quiz
        </Button>
      </div>
    </Container>
  );
}
