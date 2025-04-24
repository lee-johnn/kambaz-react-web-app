import React, { useState, useEffect } from "react";
import {
  Button,
  FormCheck,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
  Card,
  ListGroup,
  Badge,
} from "react-bootstrap";
import Editor from "react-simple-wysiwyg";
import { v4 as uuidv4 } from "uuid";
import * as quizClient from "./client";

interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface Question {
  _id?: string;
  quizId: string;
  title: string;
  type: string;
  points: number;
  question: string;
  options?: QuestionOption[];
  correctAnswer?: boolean;
  correctAnswers?: string[];
  caseSensitive?: boolean;
}

interface QuestionEditorProps {
  quizData: any;
  setQuizData: React.Dispatch<React.SetStateAction<any>>;
}

export default function QuestionEditor({
  quizData,
  setQuizData,
}: QuestionEditorProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(
    null
  );
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);
  const [totalPoints, setTotalPoints] = useState<number>(0);

  const [questionData, setQuestionData] = useState<Question>({
    quizId: quizData._id,
    title: "",
    type: "MultipleChoice",
    points: 10,
    question: "",
    options: [
      { id: uuidv4(), text: "", isCorrect: true },
      { id: uuidv4(), text: "", isCorrect: false },
    ],
    correctAnswer: true,
    correctAnswers: [""],
    caseSensitive: false,
  });

  // Load questions when component mounts
  useEffect(() => {
    fetchQuestions();
  }, [quizData._id]);

  // Calculate total points whenever questions change
  useEffect(() => {
    const total = questions.reduce((sum, q) => sum + (q.points || 0), 0);
    setTotalPoints(total);

    // Update the parent quiz data with total points - use functional update
    setQuizData((prevData: any) => ({
      ...prevData,
      totalPoints: total,
    }));
  }, [questions]);

  // Initialize editing question data
  useEffect(() => {
    if (editingQuestionId) {
      const questionToEdit = questions.find((q) => q._id === editingQuestionId);
      if (questionToEdit) {
        setQuestionData({
          ...questionToEdit,
          options: questionToEdit.options || [
            { id: uuidv4(), text: "", isCorrect: true },
            { id: uuidv4(), text: "", isCorrect: false },
          ],
          correctAnswer:
            questionToEdit.correctAnswer !== undefined
              ? questionToEdit.correctAnswer
              : true,
          correctAnswers: questionToEdit.correctAnswers || [""],
          caseSensitive:
            questionToEdit.caseSensitive !== undefined
              ? questionToEdit.caseSensitive
              : false,
        });
      }
    } else if (isAddingNew) {
      // Reset form for new question
      setQuestionData({
        quizId: quizData._id,
        title: "",
        type: "MultipleChoice",
        points: 10,
        question: "",
        options: [
          { id: uuidv4(), text: "", isCorrect: true },
          { id: uuidv4(), text: "", isCorrect: false },
        ],
        correctAnswer: true,
        correctAnswers: [""],
        caseSensitive: false,
      });
    }
  }, [editingQuestionId, isAddingNew, quizData._id]);

  const fetchQuestions = async (): Promise<void> => {
    try {
      const fetchedQuestions = await quizClient.findQuestionsForQuiz(
        quizData._id
      );
      setQuestions(fetchedQuestions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleOptionChange = (index: number, key: string, value: any): void => {
    const updatedOptions = [...(questionData.options || [])];
    updatedOptions[index] = { ...updatedOptions[index], [key]: value };
    setQuestionData({ ...questionData, options: updatedOptions });
  };

  const addOption = (): void => {
    setQuestionData({
      ...questionData,
      options: [
        ...(questionData.options || []),
        { id: uuidv4(), text: "", isCorrect: false },
      ],
    });
  };

  const removeOption = (index: number): void => {
    const updatedOptions = (questionData.options || []).filter(
      (_, i) => i !== index
    );
    setQuestionData({ ...questionData, options: updatedOptions });
  };

  const handleSave = async (): Promise<void> => {
    try {
      // Create a new question object with only the common fields
      let saveData: Question = {
        quizId: questionData.quizId,
        title: questionData.title,
        type: questionData.type,
        points: questionData.points,
        question: questionData.question,
      };

      // Add type-specific fields
      if (questionData.type === "MultipleChoice") {
        saveData.options = questionData.options;
      } else if (questionData.type === "TrueFalse") {
        saveData.correctAnswer = questionData.correctAnswer;
      } else if (questionData.type === "FillInBlank") {
        saveData.correctAnswers = questionData.correctAnswers;
        saveData.caseSensitive = questionData.caseSensitive;
      }

      // Add ID if editing
      if (editingQuestionId) {
        saveData._id = editingQuestionId;
        await quizClient.updateQuestion(saveData);
      } else {
        await quizClient.createQuestionForQuiz(quizData._id, saveData);
      }

      console.log(saveData);
      // Refresh questions and reset form
      await fetchQuestions();
      setIsAddingNew(false);
      setEditingQuestionId(null);
    } catch (error) {
      console.error("Error saving question:", error);
    }
  };

  const handleCancel = (): void => {
    setIsAddingNew(false);
    setEditingQuestionId(null);
  };

  const handleDeleteQuestion = async (questionId: string): Promise<void> => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        await quizClient.deleteQuestion(questionId);
        await fetchQuestions();
      } catch (error) {
        console.error("Error deleting question:", error);
      }
    }
  };

  // Function to render question content in preview
  const renderQuestionPreview = (question: Question): JSX.Element => {
    return (
      <div>
        <div className="mb-2">
          <strong>Question:</strong>{" "}
          <span dangerouslySetInnerHTML={{ __html: question.question }}></span>
        </div>

        {question.type === "MultipleChoice" && question.options && (
          <div>
            <strong>Choices:</strong>
            <ul className="mb-0">
              {question.options.map((option) => (
                <li
                  key={option.id}
                  className={option.isCorrect ? "text-success fw-bold" : ""}
                >
                  {option.text} {option.isCorrect && "(Correct)"}
                </li>
              ))}
            </ul>
          </div>
        )}

        {question.type === "TrueFalse" && (
          <div>
            <strong>Correct Answer:</strong>{" "}
            {question.correctAnswer ? "True" : "False"}
          </div>
        )}

        {question.type === "FillInBlank" && question.correctAnswers && (
          <div>
            <strong>Acceptable Answers:</strong>
            <ul className="mb-0">
              {question.correctAnswers.map((answer, index) => (
                <li key={index}>{answer}</li>
              ))}
            </ul>
            <div className="mt-1">
              <small>
                Case sensitive: {question.caseSensitive ? "Yes" : "No"}
              </small>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render question editor form
  const renderQuestionForm = (): JSX.Element => {
    return (
      <div className="question-editor p-3 border rounded mb-4">
        <FormGroup className="mb-3">
          <FormLabel>Question Title</FormLabel>
          <FormControl
            value={questionData.title}
            onChange={(e) =>
              setQuestionData({ ...questionData, title: e.target.value })
            }
            placeholder="Enter a title for this question"
          />
        </FormGroup>

        <FormGroup className="mb-3">
          <FormLabel>Points</FormLabel>
          <FormControl
            type="number"
            value={questionData.points}
            onChange={(e) =>
              setQuestionData({
                ...questionData,
                points: parseInt(e.target.value) || 0,
              })
            }
            min="0"
          />
        </FormGroup>

        <FormGroup className="mb-3">
          <FormLabel>Question Type</FormLabel>
          <FormSelect
            value={questionData.type}
            onChange={(e) =>
              setQuestionData({
                ...questionData,
                type: e.target.value,
              })
            }
          >
            <option value="MultipleChoice">Multiple Choice</option>
            <option value="TrueFalse">True/False</option>
            <option value="FillInBlank">Fill in the Blank</option>
          </FormSelect>
        </FormGroup>

        <FormGroup className="mb-3">
          <FormLabel>Question</FormLabel>
          <Editor
            value={questionData.question}
            onChange={(e: any) =>
              setQuestionData({ ...questionData, question: e.target.value })
            }
          />
        </FormGroup>

        {/* Multiple Choice Question Options */}
        {questionData.type === "MultipleChoice" && questionData.options && (
          <div>
            <FormLabel>Choices</FormLabel>
            {questionData.options.map((opt, index) => (
              <FormGroup
                key={opt.id}
                className="d-flex align-items-center mb-2"
              >
                <FormCheck
                  type="radio"
                  name="correctAnswer"
                  className="me-2"
                  checked={opt.isCorrect}
                  onChange={() => {
                    const updated = questionData.options!.map((o, i) => ({
                      ...o,
                      isCorrect: i === index,
                    }));
                    setQuestionData({ ...questionData, options: updated });
                  }}
                />
                <FormControl
                  value={opt.text}
                  onChange={(e) =>
                    handleOptionChange(index, "text", e.target.value)
                  }
                  placeholder={`Choice ${index + 1}`}
                />
                <Button
                  variant="outline-danger"
                  className="ms-2"
                  onClick={() => removeOption(index)}
                  disabled={questionData.options!.length <= 2}
                >
                  Remove
                </Button>
              </FormGroup>
            ))}
            <Button
              variant="outline-primary"
              onClick={addOption}
              className="mt-2"
            >
              Add Choice
            </Button>
          </div>
        )}

        {/* True/False Question Options */}
        {questionData.type === "TrueFalse" && (
          <FormGroup>
            <FormLabel>Correct Answer</FormLabel>
            <div>
              <FormCheck
                type="radio"
                label="True"
                name="truefalse"
                id="true-option"
                checked={questionData.correctAnswer === true}
                onChange={() =>
                  setQuestionData({ ...questionData, correctAnswer: true })
                }
              />
              <FormCheck
                type="radio"
                label="False"
                name="truefalse"
                id="false-option"
                checked={questionData.correctAnswer === false}
                onChange={() =>
                  setQuestionData({ ...questionData, correctAnswer: false })
                }
              />
            </div>
          </FormGroup>
        )}

        {/* Fill in the Blank Question Options */}
        {questionData.type === "FillInBlank" && questionData.correctAnswers && (
          <div>
            <FormLabel>Correct Answers</FormLabel>
            {questionData.correctAnswers.map((ans, index) => (
              <FormGroup key={index} className="d-flex align-items-center mb-2">
                <FormControl
                  value={ans}
                  onChange={(e) => {
                    const updated = [...questionData.correctAnswers!];
                    updated[index] = e.target.value;
                    setQuestionData({
                      ...questionData,
                      correctAnswers: updated,
                    });
                  }}
                  placeholder={`Possible answer ${index + 1}`}
                />
                <Button
                  variant="outline-danger"
                  className="ms-2"
                  onClick={() => {
                    const updated = questionData.correctAnswers!.filter(
                      (_, i) => i !== index
                    );
                    setQuestionData({
                      ...questionData,
                      correctAnswers: updated,
                    });
                  }}
                  disabled={questionData.correctAnswers!.length <= 1}
                >
                  Remove
                </Button>
              </FormGroup>
            ))}
            <Button
              variant="outline-primary"
              onClick={() =>
                setQuestionData({
                  ...questionData,
                  correctAnswers: [...questionData.correctAnswers!, ""],
                })
              }
              className="mb-3 mt-2"
            >
              Add Answer
            </Button>

            <FormGroup className="mt-3">
              <FormCheck
                type="checkbox"
                label="Case Sensitive"
                checked={questionData.caseSensitive}
                onChange={(e) =>
                  setQuestionData({
                    ...questionData,
                    caseSensitive: e.target.checked,
                  })
                }
              />
            </FormGroup>
          </div>
        )}

        <hr />
        <div className="d-flex justify-content-end mt-3">
          <Button variant="secondary" className="me-2" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSave}>
            Save/Update Question
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="questions-manager">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Quiz Questions</h3>
        <div>
          <span className="me-3">
            Total Points: <Badge bg="primary">{totalPoints}</Badge>
          </span>
          <Button
            variant="primary"
            onClick={() => {
              setIsAddingNew(true);
              setEditingQuestionId(null);
            }}
            disabled={isAddingNew || editingQuestionId !== null}
          >
            New Question
          </Button>
        </div>
      </div>

      {/* Add new question form or edit existing question */}
      {(isAddingNew || editingQuestionId) && renderQuestionForm()}

      {/* List of questions */}
      <ListGroup className="mb-4">
        {questions.length === 0 && !isAddingNew && (
          <Card className="text-center p-4">
            <Card.Body>
              <Card.Text>
                No questions yet. Click "New Question" to add one.
              </Card.Text>
            </Card.Body>
          </Card>
        )}

        {questions.map((question) => (
          <ListGroup.Item key={question._id} className="mb-2 p-0 border-1">
            {editingQuestionId === question._id ? null : (
              <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <div>
                    <span className="fw-bold">{question.title}</span>
                    <Badge bg="secondary" className="ms-2">
                      {question.type === "MultipleChoice"
                        ? "Multiple Choice"
                        : question.type === "TrueFalse"
                        ? "True/False"
                        : "Fill in the Blank"}
                    </Badge>
                    <Badge bg="info" className="ms-2">
                      {question.points} pts
                    </Badge>
                  </div>
                  <div>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => setEditingQuestionId(question._id!)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDeleteQuestion(question._id!)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Header>
                <Card.Body>{renderQuestionPreview(question)}</Card.Body>
              </Card>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
