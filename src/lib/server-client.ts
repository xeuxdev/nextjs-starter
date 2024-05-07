import axios from "axios";

export const APIs = {
  // auth
  createAccount: "/api/user/create",
  login: "/api/user/login",
  resetPasswordRequest: "/api/user/reset/reset-password-request",
  resetPassword: "/api/user/reset/reset-password",
  setupProfile: "/api/private/profile/setup",
  // settings
  updateProfileInfo: "/api/private/profile/update/info",
  updateProfileNotifications: "/api/private/profile/update/notifications",
  changePassword: "/api/private/profile/update/account/change-password",
  linkAccounts: "/api/private/profile/update/account/linked-accounts",
  deleteAccount: "/api/user/delete",
};

export const postRequest = async <T, P>(params: {
  url: string;
  payload: P;
}) => {
  const { data } = await axios.post<T>(params.url, params.payload);

  return data;
};

export const putRequest = async <T, P>(params: { url: string; payload: P }) => {
  const { data } = await axios.put<T>(params.url, params.payload);

  return data;
};

export const deleteRequest = async <T>(params: { url: string }) => {
  const { data } = await axios.delete<T>(params.url);

  return data;
};
