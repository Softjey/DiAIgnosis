export interface User {
  email: string;
  name: string;
  password: string;
}

export const users: User[] = [
  {
    name: "Test 1",
    email: "test1@mail.com",
    password: "strongP@ss!",
  },
  {
    name: "Test 2",
    email: "test2@mail.com",
    password: "secretP@ss!",
  },
];
