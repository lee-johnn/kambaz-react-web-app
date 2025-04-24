import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;

export const updateQuiz = async (quizId: string, quiz: any) => {
  const { data } = await axiosWithCredentials.put(
    `${QUIZZES_API}/${quizId}`,
    quiz
  );
  return data;
};

export const deleteQuiz = async (quizId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${QUIZZES_API}/${quizId}`
  );
  return data;
};

export const findQuizById = async (quizId: string) => {
  const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}`);
  return data;
};

export const publishQuiz = async (quizId: string, publishState: boolean) => {
  const { data } = await axiosWithCredentials.put(
    `${QUIZZES_API}/${quizId}/publish`,
    { publishState }
  );
  return data;
};

export const createQuestionForQuiz = async (quizId: string, question: any) => {
  console.log("Creating question for quiz", quizId, question);
  const { data } = await axiosWithCredentials.post(
    `${QUIZZES_API}/${quizId}/questions`,
    question
  );
  console.log("Created question", data);
  return data;
};

export const findQuestionsForQuiz = async (quizId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${QUIZZES_API}/${quizId}/questions`
  );
  return data;
};

export const updateQuestion = async (question: any) => {
  const { data } = await axiosWithCredentials.put(
    `${REMOTE_SERVER}/api/quizzes/questions/${question._id}`,
    question
  );
  return data;
};

export const deleteQuestion = async (questionId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${REMOTE_SERVER}/api/quizzes/questions/${questionId}`
  );
  return data;
};

export const submitQuizAttempt = async (quizId: any, attempt: any) => {
  const response = await axiosWithCredentials.post(
    `${QUIZZES_API}/${quizId}/attempt/submit`,
    attempt
  );
  return response.data;
};

export const findQuizAttempts = async (quizId: string, userId: string) => {
  console.log("quizId", quizId);
  const response = await axiosWithCredentials.get(
    `${QUIZZES_API}/${quizId}/${userId}/attempts`
  );
  return response.data;
};

export const findQuizAttemptById = async (
  quizId: string,
  userId: string,
  attemptId: string
) => {
  const response = await axiosWithCredentials.get(
    `${QUIZZES_API}/${quizId}/${userId}/attempt/${attemptId}/results`
  );
  return response.data;
};
