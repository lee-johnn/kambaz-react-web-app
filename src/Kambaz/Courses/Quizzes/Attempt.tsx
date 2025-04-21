import RenderQuiz from "./RenderQuiz";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsPreviewMode } from "./quizAttemptReducer";

export default function Attempt() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsPreviewMode(false));
    return () => {
      dispatch(setIsPreviewMode(false));
    };
  }, [dispatch]);

  return <RenderQuiz />;
}
