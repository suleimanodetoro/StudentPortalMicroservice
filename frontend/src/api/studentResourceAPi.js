import { toast } from "react-hot-toast";
import axiosApiInstance from "../helper/axiosInstance";

const StudentResourceAPi = {
  async fetchStudents() {
    const response = await axiosApiInstance({
      url: "/api/students-by-user",
    });

    if (![200, 201].includes(response.status)) {
      toast.error("Internal server error, Please try again later.");
    }
    return response.data;
  },

  async getStudent(id) {
    const response = await axiosApiInstance.get(`/api/students/${id}`);

    if (![200, 201].includes(response.status)) {
      toast.error("Internal server error, Please try again later.");
    }
    return response.data;
  },
  async updateStudent({ data, id }) {
    const response = await axiosApiInstance({
      method: "put",
      url: `/api/students/${id}`,
      data,
    });

    if ([200, 201].includes(response.status)) {
      toast.success("Student updated successfully");
    }
    return response.data;
  },
};

export const { fetchStudents, getStudent, updateStudent } =
  StudentResourceAPi;

export default StudentResourceAPi;
