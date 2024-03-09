import axios, { AxiosError } from "axios";
// import { getUserFromLocalStorage } from "./localStorage";
// import _ from "lodash";

const authFetch = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// authFetch.interceptors.request.use(
//   (config) => {
//     const user = getUserFromLocalStorage();
//     if (user) {
//       config.headers!["Authorization"] = `Bearer ${user.jwt}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// authFetch.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error: AxiosError) => {
//     let codeError = error.response?.status;
//     let message = error.message;
//     const data = error.response?.data as { errorCode: number; message: string };
//     const { pathname } = window.location;

//     if (pathname !== "/" && pathname !== "/login") {
//       if (!_.isEmpty(data)) {
//         codeError = data.errorCode;
//         message = data.message;
//       }
//       localStorage.setItem(
//         "error",
//         JSON.stringify({
//           codeError,
//           pathname,
//           message:
//             codeError === 401 && pathname !== "/" && pathname !== "/login"
//               ? "Token has expired, please Login again"
//               : message,
//         })
//       );
//       window.dispatchEvent(new Event("storage"));
//     }
//     return Promise.reject(error);
//   }
// );

export const checkForUnauthorizedResponse = (error: any, thunkAPI: any) => {
  return thunkAPI.rejectWithValue(error.response);
};

export default authFetch;
