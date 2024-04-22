import { UserDTO } from "../dtos/userDTO";
import { storageUserListUpdate } from "./storageUserList";
import { USER_LOGGED } from "./storages";

export const storageUserSave = (user: UserDTO) => {
  try {
    localStorage.setItem(USER_LOGGED, JSON.stringify(user));
  } catch (error) {
    console.error("Failed to save user data:", error);
  }
};
export const storageUserGet = () => {
  try {
    const storage = localStorage.getItem(USER_LOGGED);
    return storage ? JSON.parse(storage) : null;
  } catch (error) {
    console.error("Failed to parse user data:", error);
    return null;
  }
};

export const storageUserRemove = () => {
  localStorage.removeItem(USER_LOGGED);
};

export const storageUserUpdate = (userUpdated: UserDTO) => {
  storageUserListUpdate(userUpdated);
  localStorage.setItem(USER_LOGGED, JSON.stringify(userUpdated));
};
