import { toast } from "react-hot-toast";
import axiosApiInstance from "../helper/axiosInstance";

const userAPIs = {
  async searchUser(username) {
    const response = await axiosApiInstance.get(`/users/${username}`);

    if (![200, 201].includes(response.status)) {
      toast.error("Internal server error, Please try again later.");
    }
    return response.data;
  },
  async allUsers({ size = 20, page = 0, name = "" }) {
    const response = await axiosApiInstance({
      url: "/users/all-user",
      params: {
        size,
        page,
        email: name,
      },
    });

    if (![200, 201].includes(response.status)) {
      toast.error("Internal server error, Please try again later.");
    }
    return response.data;
  },
  async getUser(id) {
    const response = await axiosApiInstance.get(`/users/${id}`);

    if (![200, 201].includes(response.status)) {
      toast.error("Internal server error, Please try again later.");
    }
    return response.data;
  },
  async currentUser() {
    const response = await axiosApiInstance.get("/users/me");
    if (![200, 201].includes(response.status)) {
      toast.error("Internal server error, Please try again later.");
    }
    return response.data;
  },

  async refreshToken() {
    const response = await axiosApiInstance({
      url: "/users/refresh",
    });

    if ([200, 201].includes(response.status)) {
      toast.success("Password Changes successfully");
    }
    return response.data;
  },
  async signIn(params) {
    const response = await axiosApiInstance({
      method: "post",
      url: "/users/signin",
      params,
    });

    if ([200, 201].includes(response.status)) {
      toast.success("Signing successfully");
    }
    return response.data;
  },
  async signUp(data) {
    const response = await axiosApiInstance({
      method: "post",
      url: "/users/signup",
      data,
    });

    if ([200, 201].includes(response.status)) {
      toast.success("Signup successfully");
    }
    return response.data;
  },
  async updatePassword(data) {
    const response = await axiosApiInstance({
      method: "post",
      url: "/users/update-password",
      data,
    });

    if ([200, 201].includes(response.status)) {
      toast.success("Signup successfully");
    }
    return response.data;
  },

  async updateUser({ data, id }) {
    const response = await axiosApiInstance({
      method: "put",
      url: `/users/update-user/${id}`,
      data,
    });
    if ([200, 201, 204].includes(response.status)) {
      toast.success("User deleted successfully");
    }
    return response;
  },
  async deleteUser(username) {
    const response = await axiosApiInstance({
      url: `/users/${username}`,
      method: "delete",
    });
    if ([200, 201, 204].includes(response.status)) {
      toast.success("User deleted successfully");
    }
    return response;
  },
};

export const {
  searchUser,
  getUser,
  allUsers,
  currentUser,
  refreshToken,
  signIn,
  signUp,
  deleteUser,
  updatePassword,
  updateUser,
} = userAPIs;

export default userAPIs;
