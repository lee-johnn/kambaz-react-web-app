import axios from "axios";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;
const axiosWithCredentials = axios.create({ withCredentials: true });

export function getAllEnrollments() {
  return axiosWithCredentials.get(ENROLLMENTS_API);
}

export function findEnrollmentForUser(courseId: string, userId: string = "current") {
  return axiosWithCredentials.get(`${ENROLLMENTS_API}/${userId}/${courseId}`);
}
