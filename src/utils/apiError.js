export const getApiError = (error, fallback = "Please try again in a moment.") => {
  const response = error?.response?.data;
  const statusCode = response?.statusCode || error?.response?.status;

  return {
    type: "error",
    message: response?.message || error?.message || fallback,
    code: statusCode || null,
  };
};

export const getSuccessStatus = (message) => ({
  type: "success",
  message,
});
