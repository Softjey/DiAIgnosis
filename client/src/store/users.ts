export interface User {
  email: string;
  name: string;
  password: string;
}

export const users: User[] = [
  {
    name: "Alexander Polin",
    email: "alexander.polin@gmail.com",
    password: "pjatk12345678",
  },
  {
    name: "Jean-Luc Momprivé",
    email: "jean.luc.momprive@gmail.com",
    password: "intel12345678",
  },
  {
    name: "Wojciech Jankowski",
    email: "wojciech.jankowski@gmail.com",
    password: "h@sl0Dyrector@",
  },
  {
    name: "Bartłomiej Przybyciel",
    email: "bartlomiej.przybyciel@gmail.com",
    password: "h@sl0Dyrector@",
  },
  {
    name: "Marcin Szulc",
    email: "marcin.szulc@gmail.com",
    password: "theStrongestPassword",
  },
];
