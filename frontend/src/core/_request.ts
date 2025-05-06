import axiosInstance from "../utils/axiosInstance";

export const registerUser = async (userData: any) => {
  const payload = {
    full_name: userData?.fullName,
    email: userData?.email,
    password: userData?.password,
  };
  try {
    const response = await axiosInstance.post("/api/auth/register", payload);
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

// LOGIN
export const loginUser = async (userData: any) => {
  const payload = {
    email: userData?.email,
    password: userData?.password,
  };
  try {
    const response = await axiosInstance.post("/api/auth/login", payload);
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

// ADD CANDIDATE
export const addCandidate = async (userData: any) => {
  const payload = {
    full_name: userData?.fullName,
    email: userData?.email,
    phone_number: userData?.phoneNumber,
    position: userData?.position,
    resume: userData?.resume,
    experience: userData?.experience,
    department: userData?.department,
  };
  try {
    const response = await axiosInstance.post(
      "/api/candidate/add-new",
      payload
    );
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

// GET ALL USERS
export const getAllUsers = async (data: string) => {
  try {
    const response = await axiosInstance.get("/api/candidate/get-users", {
      params: { type: data?.toLocaleLowerCase() },
    });
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

// GET USER
export const getUser = async (data: string) => {
  try {
    const response = await axiosInstance.get(`/api/candidate/get-user/${data}`);
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

// UPDATE USER
export const updateUser = async (data: any) => {
  try {
    const payload = {
      ...data,
      ...(data?._id && {
        id: data?._id,
      }),
      ...((data?.fullName || data?.name || data?.employeeName) && {
        full_name: data?.fullName || data?.name || data?.employeeName,
      }),
      ...((data?.phoneNumber || data?.phone) && {
        phone_number: data?.phoneNumber || data?.phone,
      }),
      ...(data?.department && {
        department: data?.department,
      }),
    };
    console.log(payload);
    const response = await axiosInstance.patch(
      "/api/candidate/edit-user/",
      payload
    );
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};
export const updateUserTask = async (data: any) => {
  try {
    const payload = {
      ...data,
      ...(data?._id && {
        id: data?._id,
      }),
      ...((data?.fullName || data?.name || data?.employeeName) && {
        full_name: data?.fullName || data?.name || data?.employeeName,
      }),
      ...((data?.phoneNumber || data?.phone) && {
        phone_number: data?.phoneNumber || data?.phone,
      }),
      ...(data?.department && {
        department: data?.department,
      }),
    };
    console.log(payload);
    const response = await axiosInstance.patch(
      "/api/candidate/edit-user/",
      payload
    );
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

// DELETE USER
export const deleteUser = async (data: string) => {
  try {
    const response = await axiosInstance.delete(
      `/api/candidate/delete-user/${data}`
    );
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const getSearch = async (data: string) => {
  try {
    const response = await axiosInstance.get(
      `/api/leave/search-name?query=${data}`
    );
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};
