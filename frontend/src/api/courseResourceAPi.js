import { toast } from "react-hot-toast";
import axiosApiInstance from "../helper/axiosInstance";

const CourseResourceAPI = {
  async fetchCourse({ size = 20, page = 0, name = "" }) {
    const response = await axiosApiInstance({
      url: "/api/courses",
      params: {
        size,
        page,
        name,
      },
    });
    if (![200, 201].includes(response.status)) {
      toast.error("Internal server error, Please try again later.");
    }
    return response.data;
  },
  async getCourse(id) {
    const response = await axiosApiInstance.get(`/api/courses/${id}`);

    if (![200, 201].includes(response.status)) {
      toast.error("Internal server error, Please try again later.");
    }
    return response.data;
  },
  async createCourse(data) {
    const response = await axiosApiInstance({
      method: "post",
      url: "/api/courses",
      data,
    });

    if ([200, 201].includes(response.status)) {
      toast.success("Course created successfully");
    }
    return response.data;
  },
  async updateCourse({ data, id }) {
    const response = await axiosApiInstance({
      method: "put",
      url: `/api/courses/${id}`,
      data,
    });

    if ([200, 201].includes(response.status)) {
      toast.success("Course updated successfully");
    }
    return response.data;
  },
  async deleteCourse(id) {
    const response = await axiosApiInstance({
      method: "delete",
      url: `/api/courses/${id}`,
    });

    if ([200, 201, 204].includes(response.status)) {
      toast.success("Course deleted successfully");
    }
    return response.data;
  },
};

export const {
  fetchCourse,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} = CourseResourceAPI;

export default CourseResourceAPI;
