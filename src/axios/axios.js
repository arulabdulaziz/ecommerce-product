// axios
import axios from "axios";
const axiosIns = axios.create({
  baseURL: "http://localhost:3004/",
  // headers: {
  //   Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  // },
});
const interceptResponse = (res) => {
  try {
    console.log(res, "3<<");
    return Promise.resolve(res);
  } catch (e) {
    // check for response code 123 and redirect to login
    console.log(e, "4<<");
    return Promise.resolve(res);
  }
};
const interceptResError = (error) => {
  if (error.message == "Network Error") {
    error.response = {
      data: {
        success: false,
        errors: [
          {
            message: "No Internet Connection",
            messageId: "Tidak ada Koneksi Internet",
          },
        ],
      },
    };
  }
  if (!error.response) {
    return Promise.reject(error);
  }
  const { status } = error.response;
  // console.log(error.response, "<< error2")
  if (status === 401) {
    // logout
    return Promise.reject(error);
  }
  if (status === 413) {
    error.response = {
      data: {
        success: false,
        errors: [
          {
            message: "File too large",
            messageId: "File terlalu besar",
          },
        ],
      },
    };
  }
  return Promise.reject(error);
};
axiosIns.interceptors.response.use(interceptResponse, interceptResError);

/* Request Interceptors */
const interceptReqErrors = (err) => Promise.reject(err);
const interceptRequest = (config) => {
  return config;
};
axiosIns.interceptors.request.use((config) => {
  // Do something before request is sent
  console.log(config, "5<<");
  return config;
}, interceptReqErrors);
export default axiosIns;
