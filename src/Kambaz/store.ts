import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentsReducer from "./Courses/Assignments/reducer";
import enrollmentsReducer from "./reducer";
import quizzesReducer from "./Courses/Quizzes/reducer";
import quizAttemptReducer from "./Courses/Quizzes/quizAttemptReducer";
const store = configureStore({
  reducer: {
    modulesReducer,
    accountReducer,
    assignmentsReducer,
    enrollmentsReducer,
    quizzesReducer,
    quizAttemptReducer,
  },
});
export default store;
