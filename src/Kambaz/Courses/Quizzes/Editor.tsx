import {useState} from 'react';
import {Nav} from 'react-bootstrap';
import QuizDetailEditor from './QuizDetailEditor';
import {useSelector} from "react-redux";
import {v4 as uuidv4} from "uuid";
import {useParams} from "react-router-dom";

export default function QuizEditor() {
    const [activeTab, setActiveTab] = useState('details');
    const {cid, qid} = useParams();

    const now = new Date().toISOString().slice(0, 16);


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

    const [quizData, setQuizData] = useState({
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
        showCorrectAnswersDate: formatDateForInput(quiz?.showCorrectAnswersDate || now),
        accessCode: quiz?.accessCode || "",
        oneQuestionAtATime: quiz?.oneQuestionAtATime || true,
        webcamRequired: quiz?.webcamRequired || false,
        lockQuestionsAfterAnswering: quiz?.lockQuestionsAfterAnswering || false,
        dueDate: formatDateForInput(quiz?.dueDate || now),
        availableDate: formatDateForInput(quiz?.availableDate || now),
        untilDate: formatDateForInput(quiz?.untilDate || now),
    });

    return (
        <div>
            <Nav variant="tabs" className="mb-3">
                <Nav.Item>
                    <Nav.Link
                        active={activeTab === 'details'}
                        onClick={() => setActiveTab('details')}
                    >
                        Details
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        active={activeTab === 'questions'}
                        onClick={() => setActiveTab('questions')}
                    >
                        Questions
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            {activeTab === 'details' && <QuizDetailEditor quizData={quizData} setQuizData={setQuizData}/>}
            {activeTab === 'questions'}
        </div>
    );
}