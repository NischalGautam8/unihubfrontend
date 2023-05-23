import { userinterface } from "./userinterface";

export interface postinterface {
  _id: string;
  description: string;
  firstName: string;
  lastName: string;
  username: string;
  postimage: string;
  userId: userinterface;
  comments: Array<string>;
  likes: Array<string>;
}
