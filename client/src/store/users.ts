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
  { name: "user123", email: "user123@gmail.com", password: "SafeP@ss1!" },
  { name: "example567", email: "example567@gmail.com", password: "StrongP@ss2!" },
  { name: "myemail89", email: "myemail89@gmail.com", password: "GoodP@ss3!" },
  { name: "demo456", email: "demo456@gmail.com", password: "MyS3cureP@ss!" },
  { name: "testuser99", email: "testuser99@gmail.com", password: "P@ssw0rd4U!" },
  { name: "sample321", email: "sample321@gmail.com", password: "S@feP@ss5!" },
  { name: "emailtest77", email: "emailtest77@gmail.com", password: "Tr@v3lP@ss!" },
  { name: "newuser555", email: "newuser555@gmail.com", password: "P@ssword67!" },
  { name: "checkit123", email: "checkit123@gmail.com", password: "S3cur3P@ss!" },
  { name: "trythis789", email: "trythis789@gmail.com", password: "QuickP@ss10!" },
];
