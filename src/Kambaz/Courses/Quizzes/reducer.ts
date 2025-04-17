import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    quizzes: [] as any[],
};

const quizzesSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        setQuizzes: (state, action) => {
            state.quizzes = action.payload;
        },
        addQuiz: (state, { payload: quiz }) => {
            const now = new Date().toISOString();
            const newQuiz = {
                title: quiz.title || "New Quiz",
                course: quiz.course,
                description: quiz.description || "Quiz description",
                quizType: quiz.quizType || "GRADED_QUIZ",
                totalPoints: quiz.totalPoints || 0,
                assignmentGroup: quiz.assignmentGroup || "QUIZZES",
                shuffleAnswers: quiz.shuffleAnswers || true,
                hasTimeLimit: quiz.hasTimeLimit || true,
                timeLimit: quiz.timeLimit || 20,
                multipleAttempts: quiz.multipleAttempts || false,
                allowedAttempts: quiz.allowedAttempts || 1,
                showCorrectAnswers: quiz.showCorrectAnswers || true,
                showCorrectAnswersDate: quiz.showCorrectAnswersDate || now,
                accessCode: quiz.accessCode || "",
                oneQuestionAtATime: quiz.oneQuestionAtATime || true,
                webcamRequired: quiz.webcamRequired || false,
                lockQuestionsAfterAnswering: quiz.lockQuestionsAfterAnswering || false,
                availableDate: quiz.availableDate || now,
                untilDate: quiz.untilDate || now,
                dueDate: quiz.dueDate || now,
                published: quiz.published || false,
                questions: quiz.questions || [],
            };
            state.quizzes = [...state.quizzes, newQuiz];
        },
        deleteQuiz: (state, { payload: quizId }) => {
            state.quizzes = state.quizzes.filter(
                (q: any) => q._id !== quizId
            );
        },
        updateQuiz: (state, { payload: quiz }) => {
            state.quizzes = state.quizzes.map((q: any) =>
                q._id === quiz._id ? quiz : q
            );
        },
        publishQuiz: (state, { payload: { quizId, publishState } }) => {
            state.quizzes = state.quizzes.map((q: any) =>
                q._id === quizId ? { ...q, published: publishState } : q
            );
        },
        addQuestionToQuiz: (state, { payload: { quizId, question } }) => {
            state.quizzes = state.quizzes.map((q: any) => {
                if (q._id === quizId) {
                    return {
                        ...q,
                        questions: [...q.questions, question],
                        points: q.points + (question.points || 1)
                    };
                }
                return q;
            });
        },
        updateQuestionInQuiz: (state, { payload: { quizId, question } }) => {
            state.quizzes = state.quizzes.map((q: any) => {
                if (q._id === quizId) {
                    const oldQuestion = q.questions.find((qq: any) => qq._id === question._id);
                    const pointsDifference = (question.points || 1) - (oldQuestion?.points || 1);

                    return {
                        ...q,
                        questions: q.questions.map((qq: any) =>
                            qq._id === question._id ? question : qq
                        ),
                        points: q.points + pointsDifference
                    };
                }
                return q;
            });
        },
        removeQuestionFromQuiz: (state, { payload: { quizId, questionId } }) => {
            state.quizzes = state.quizzes.map((q: any) => {
                if (q._id === quizId) {
                    const questionToRemove = q.questions.find((qq: any) => qq._id === questionId);
                    return {
                        ...q,
                        questions: q.questions.filter((qq: any) => qq._id !== questionId),
                        points: q.points - (questionToRemove?.points || 1)
                    };
                }
                return q;
            });
        }
    },
});

export const {
    setQuizzes,
    addQuiz,
    deleteQuiz,
    updateQuiz,
    publishQuiz,
    addQuestionToQuiz,
    updateQuestionInQuiz,
    removeQuestionFromQuiz
} = quizzesSlice.actions;

export default quizzesSlice.reducer;