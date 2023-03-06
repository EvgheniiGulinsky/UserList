import IUser from "../types/IUser";

const getUsers = (): IUser[] => {
  const users = localStorage.getItem("users");
  if (users) {
    return JSON.parse(users);
  }
  return [];
};

const getUser = (id: string): IUser | undefined => {
  const users = getUsers();
  const user = users.find((user) => user.id === id);
  if (!user) {
    throw new Error("User not found!");
  }
  return user;
};

const addUser = (newUser: IUser): void => {
  const users = getUsers();
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
};

const changeUser = (newUser: IUser): void => {
  const users = getUsers();
  const newUsers = users.map((user) => {
    if (user.id === newUser.id) {
      return newUser;
    }
    return user;
  });
  localStorage.setItem("users", JSON.stringify(newUsers));
};

const removeUser = (id: string): void => {
  const users = getUsers();
  const newUsers = users.filter((user) => user.id !== id);
  localStorage.setItem("users", JSON.stringify(newUsers));
};

export { getUsers, getUser, addUser, changeUser, removeUser };
