import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface Question {
  _id: string;
  type: string;
  points: number;
  question: string;
  options?: QuestionOption[];
  correctAnswer?: boolean;
  correctAnswers?: string[];
}

interface ScoreState {
  points: number;
  total: number;
}

interface QuizAttemptState {
  userAnswers: Record<string, any>;
  isSubmitted: boolean;
  score: ScoreState;
  isPreviewMode: boolean;
  showResults: boolean;
}

const initialState: QuizAttemptState = {
  userAnswers: {},
  isSubmitted: false,
  score: { points: 0, total: 0 },
  isPreviewMode: false,
  showResults: false,
};

const quizAttemptSlice = createSlice({
  name: "quizAttempt",
  initialState,
  reducers: {
    setAnswerForQuestion: (
      state,
      action: PayloadAction<{ questionId: string; answer: any }>
    ) => {
      state.userAnswers[action.payload.questionId] = action.payload.answer;
    },
    setIsPreviewMode: (state, action: PayloadAction<boolean>) => {
      state.isPreviewMode = action.payload;
    },
    submitQuiz: (state, action: PayloadAction<Question[]>) => {
      state.isSubmitted = true;

      // Calculate score
      let pointsEarned = 0;
      let totalPoints = 0;

      action.payload.forEach((question) => {
        totalPoints += question.points;
        const userAnswer = state.userAnswers[question._id];

        if (userAnswer !== undefined) {
          switch (question.type) {
            case "MultipleChoice":
              const selectedOption = question.options?.find(
                (opt) => opt.id === userAnswer
              );
              if (selectedOption?.isCorrect) {
                pointsEarned += question.points;
              }
              break;

            case "TrueFalse":
              if (userAnswer === question.correctAnswer) {
                pointsEarned += question.points;
              }
              break;

            case "FillInBlank":
              const normalizedUserAnswer = String(userAnswer)
                .trim()
                .toLowerCase();
              const normalizedCorrectAnswers =
                question.correctAnswers?.map((ans) =>
                  ans.trim().toLowerCase()
                ) || [];

              if (normalizedCorrectAnswers.includes(normalizedUserAnswer)) {
                pointsEarned += question.points;
              }
              break;

            default:
              break;
          }
        }
      });

      state.score = { points: pointsEarned, total: totalPoints };
    },
    showResultsScreen: (state) => {
      state.showResults = true;
    },
    hideResultsScreen: (state) => {
      state.showResults = false;
    },
    resetQuizAttempt: () => initialState,
  },
});

export const {
  setAnswerForQuestion,
  setIsPreviewMode,
  submitQuiz,
  showResultsScreen,
  hideResultsScreen,
  resetQuizAttempt,
} = quizAttemptSlice.actions;

export default quizAttemptSlice.reducer;
