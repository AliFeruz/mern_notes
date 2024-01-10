
export type IUser = {
    _id: string;
    username: string;
    email: string;
    password: string;
  };

export type Note = {
  _id: string;
  createdAt: string;
  userId: string;
  title: string;
  text: string;
}