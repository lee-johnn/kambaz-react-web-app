import { FaAlignJustify } from "react-icons/fa";
import * as courseClient from "../client";
import * as quizClient from "./client";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Form } from "react-bootstrap";

export default function Preview() {
  const { cid, qid } = useParams();
  const quiz = useSelector((state: any) =>
    state.quizzesReducer.quizzes.find((quiz: any) => quiz._id === qid)
  );

  const [questions, setQuestion] = useState([]);

  const fetchQuiz = async (_courseId: string, _quizId: string) => {
    if (cid && qid) {
      const quiz = await courseClient.findQuizById(cid, qid);
      return quiz;
    }
    throw new Error("Course ID or Quiz ID is undefined");
    return quiz;
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

  const renderQuestion = (question: any, index: number) => {
    switch (question.type) {
      case "MultipleChoice":
        return (
          <div>
            <h4>Question {index + 1}</h4>
            <p>{question.question}</p>
            <div className="options">
              {question.options.map((option: any) => (
                <div key={option.id} className="form-check mb-2">
                  <input
                    type="radio"
                    className="form-check-input"
                    name={`question-${question._id}`}
                    id={`option-${option.id}`}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`option-${option.id}`}
                  >
                    {option.text}
                  </label>
                </div>
              ))}
            </div>
          </div>
        );

      case "TrueFalse":
        return (
          <div>
            <h4>Question {index + 1}</h4>
            <p>{question.question}</p>
            <div className="options">
              <div className="form-check mb-2">
                <input
                  type="radio"
                  className="form-check-input"
                  name={`question-${question._id}`}
                  id={`true-${question._id}`}
                />
                <label
                  className="form-check-label"
                  htmlFor={`true-${question._id}`}
                >
                  True
                </label>
              </div>
              <div className="form-check mb-2">
                <input
                  type="radio"
                  className="form-check-input"
                  name={`question-${question._id}`}
                  id={`false-${question._id}`}
                />
                <label
                  className="form-check-label"
                  htmlFor={`false-${question._id}`}
                >
                  False
                </label>
              </div>
            </div>
          </div>
        );

      case "FillInBlank":
        return (
          <div>
            <h4>Question {index + 1}</h4>
            <p>{question.question}</p>
            <input
              type="text"
              className="form-control"
              placeholder="Your answer"
            />
          </div>
        );
    }
  };

  return (
    <div className="container">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {quiz?.title} &gt; Preview
      </h2>
      <hr />
      <div className="d-flex flex-column">
        <div className="mb-3">
          <h3>{quiz?.title}</h3>
          <p>{quiz?.description}</p>
        </div>
        <div>
          {questions.map((question: any, index: number) => (
            <div key={question._id} className="mb-3">
              <Container className="border rounded p-3">
                {renderQuestion(question, index)}
              </Container>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
