import { UserDTO } from "../dtos/userDTO";
import { storageUserGet } from "./storageUser";
import { LIST_USERS, USER_LOGGED } from "./storages";

export const storageUserListGet = () => {
  const storage = localStorage.getItem(LIST_USERS);

  const list: UserDTO[] = storage ? JSON.parse(storage) : [];

  return list;
};

export const storageUserListAddNew = (user: UserDTO) => {
  const list = localStorage.getItem(LIST_USERS);

  const newList = list ? JSON.parse(list) : [];

  if (newList.length > 0) {
    newList.push(user);
  }
  localStorage.setItem(LIST_USERS, JSON.stringify(newList));
};

export const storageUserListFind = (
  email: string,
  password: string
): UserDTO => {
  const list = storageUserListGet();
  const userFound = list.find(
    (element) => element.email === email && element.password === password
  );
  const response = userFound !== undefined ? userFound : ({} as UserDTO);

  return response;
};

export const storageUserListRemove = (user: UserDTO) => {
  const list = storageUserListGet();
  const newList = list.filter((element) => element.id !== user.id);

  localStorage.setItem(LIST_USERS, JSON.stringify(newList));
  return newList;
};

export const storageUserListUpdate = (userUpdated: UserDTO) => {
  const list = storageUserListRemove(userUpdated);
  console.log({ list });
  localStorage.setItem(LIST_USERS, JSON.stringify([...list, userUpdated]));

  const loggedUser = storageUserGet();
  if (userUpdated.id === loggedUser.id)
    localStorage.setItem(USER_LOGGED, JSON.stringify(userUpdated));
};

export const storageUserVerifyEmail = (email: string) => {
  const list = storageUserListGet();

  const verifyEmail = list.find(
    (el) => el.email.toLowerCase() === email.toLowerCase()
  );

  if (verifyEmail) return true;
  return false;
};
