export const getApiUrl = () => {
    return window.env.REACT_APP_API_URL || "default-url";
  };