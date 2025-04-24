import * as courseClient from "../client";
import * as quizClient from "./client";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Card } from "react-bootstrap";
import {
  setAnswerForQuestion,
  submitQuiz,
  showResultsScreen,
} from "./quizAttemptReducer";
import AttemptResult from "./AttemptResult";
import store from "../../store";
import { v4 as uuidv4 } from "uuid";

export default function RenderQuiz() {
  const { cid, qid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<any>(null);
  const startTime = new Date();

  const { currentUser } = useSelector((state: any) => state.accountReducer);

  // const quiz = useSelector((state: any) =>
  //   state.quizzesReducer.quizzes.find((quiz: any) => quiz._id === qid)
  // );
  const { userAnswers, isSubmitted, isPreviewMode, showResults } = useSelector(
    (state: any) => state.quizAttemptReducer
  );

  const isOneQuestionAtATime = quiz?.oneQuestionAtATime;
  const [questions, setQuestion] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const fetchQuiz = async (_courseId: string, _quizId: string) => {
    if (cid && qid) {
      const quiz = await courseClient.findQuizById(cid, qid);
      console.log(quiz);
      setQuiz(quiz);
      return quiz;
    }
    throw new Error("Course ID or Quiz ID is undefined");
  };

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
      fetchQuiz(cid, qid);
      fetchQuestions(qid);
    }
  }, [cid, qid]);

  // useEffect(() => {
  //   if (isSubmitted && showResults && !isPreviewMode) {
  //     navigate(`/courses/${cid}/quizzes/${qid}/attempt/result`);
  //   }
  //   console.log("isPreviewMode:" + isPreviewMode);
  // }, [isSubmitted, showResults, cid, qid, navigate]);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleAnswerChange = (questionId: string, answer: any) => {
    dispatch(setAnswerForQuestion({ questionId, answer }));
  };

  const handleSubmitQuiz = () => {
    // First submit the quiz to calculate score
    dispatch(submitQuiz(questions));

    // If in student mode, save to database
    if (currentUser.role === "STUDENT") {
      submitToDatabase();
    }

    // Show results screen
    dispatch(showResultsScreen());
  };

  const submitToDatabase = async () => {
    const currentScore = store.getState().quizAttemptReducer.score;

    // Create formatted attempt object from userAnswers
    try {
      const attemptData = {
        _id: uuidv4(),
        quizId: qid,
        userId: currentUser._id, // Get from auth
        score: currentScore.points,
        totalPoints: currentScore.total,
        startTime: startTime, // Store quiz start time when quiz loads
        endTime: new Date(),
        answers: Object.entries(userAnswers).map(([questionId, answer]) => ({
          questionId,
          answer,
        })),
      };

      console.log("Submitting student answers to database:", attemptData);
      const result = await quizClient.submitQuizAttempt(qid, attemptData);
      console.log("Submission successful:", result);
      navigate(
        `/Kambaz/Courses/${cid}/quizzes/${qid}/${currentUser._id}/attempt/${attemptData._id}/results`
      );
      return result;
    } catch (error) {
      console.error("Error submitting quiz attempt:", error);
      // Handle the error appropriately (show user message, etc.)
      throw error;
    }
  };

  const QuestionHeader = ({
    index,
    points,
  }: {
    index: number;
    points: number;
  }) => (
    <Card.Header className="d-flex justify-content-between align-items-center">
      <div>
        <strong>Question {index + 1}</strong> ({points} pts)
      </div>
    </Card.Header>
  );

  //   <Card.Body>
  //   <Card.Title>{question.question}</Card.Title>
  // </Card.Body>
  // </Card>

  const renderQuestion = (question: any, index: number) => {
    const questionId = question._id;
    const userAnswer = userAnswers[questionId];

    switch (question.type) {
      case "MultipleChoice":
        return (
          <Card>
            {QuestionHeader({ index, points: question.points })}
            <Card.Body>
              <Card.Title>{question.question}</Card.Title>
              <hr />
              <div className="options">
                {question.options.map((option: any) => (
                  <div key={option.id} className="form-check mb-2">
                    <input
                      type="radio"
                      className="form-check-input"
                      name={`question-${questionId}`}
                      id={`option-${option.id}`}
                      checked={userAnswer === option.id}
                      onChange={() => handleAnswerChange(questionId, option.id)}
                      disabled={isSubmitted}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`option-${option.id}`}
                    >
                      {option.text}
                    </label>
                    <hr />
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        );

      case "TrueFalse":
        return (
          <Card>
            {QuestionHeader({ index, points: question.points })}
            <Card.Body>
              <Card.Title>{question.question}</Card.Title>
              <hr />
              <div className="options">
                <div className="form-check mb-2">
                  <input
                    type="radio"
                    className="form-check-input"
                    name={`question-${questionId}`}
                    id={`true-${questionId}`}
                    checked={userAnswer === true}
                    onChange={() => handleAnswerChange(questionId, true)}
                    disabled={isSubmitted}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`true-${questionId}`}
                  >
                    True
                  </label>
                  <hr />
                </div>
                <div className="form-check mb-2">
                  <input
                    type="radio"
                    className="form-check-input"
                    name={`question-${questionId}`}
                    id={`false-${questionId}`}
                    checked={userAnswer === false}
                    onChange={() => handleAnswerChange(questionId, false)}
                    disabled={isSubmitted}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`false-${questionId}`}
                  >
                    False
                  </label>
                </div>
              </div>
            </Card.Body>
          </Card>
        );

      case "FillInBlank":
        return (
          <Card>
            {QuestionHeader({ index, points: question.points })}
            <Card.Body>
              <Card.Title>{question.question}</Card.Title>
              <hr />
              <input
                type="text"
                className="form-control"
                placeholder="Your answer"
                value={userAnswer || ""}
                onChange={(e) => handleAnswerChange(questionId, e.target.value)}
                disabled={isSubmitted}
              />
            </Card.Body>
          </Card>
        );

      default:
        return null;
    }
  };

  const renderNavigationButtons = () => {
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    return (
      <div className="d-flex justify-content-between mt-3">
        <Button
          variant="secondary"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0 || isSubmitted}
        >
          Previous
        </Button>
        <div className="d-flex align-items-center">
          <span>
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
        </div>
        {isLastQuestion ? (
          <Button
            variant="success"
            onClick={handleSubmitQuiz}
            disabled={isSubmitted}
          >
            Submit
          </Button>
        ) : (
          <Button variant="primary" onClick={handleNext} disabled={isSubmitted}>
            Next
          </Button>
        )}
      </div>
    );
  };

  console.log("isSubmitted:", isSubmitted);
  console.log("showResults:", showResults);
  console.log("userAnswers:", userAnswers);
  console.log("questions:", questions);
  console.log("quiz:", quiz);
  return (
    <div className="d-flex flex-column">
      {!isPreviewMode && (
        <div className="mb-3">
          <h3>{quiz?.title}</h3>
          <p>{quiz?.description}</p>
        </div>
      )}

      {isSubmitted && showResults ? (
        <div>
          {quiz && questions && questions.length > 0 ? (
            <AttemptResult />
          ) : (
            <p>Loading quiz results...</p>
          )}
        </div>
      ) : (
        <div>
          {questions.length > 0 && (
            <>
              {isOneQuestionAtATime ? (
                <div className="mb-3">
                  {renderQuestion(
                    questions[currentQuestionIndex],
                    currentQuestionIndex
                  )}
                  {renderNavigationButtons()}
                </div>
              ) : (
                <>
                  {questions.map((question: any, index: number) => (
                    <div key={question._id} className="mb-3">
                      {renderQuestion(question, index)}
                    </div>
                  ))}
                  <div className="d-flex justify-content-end mt-4 mb-5">
                    <Button
                      variant="success"
                      onClick={handleSubmitQuiz}
                      disabled={isSubmitted}
                    >
                      Submit
                    </Button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
