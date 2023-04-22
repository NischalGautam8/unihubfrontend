import { userinterface } from "./userinterface";

export interface commentinterface {
  user: userinterface;
  _id: string;
  content: string;
  postid: string;
  firstName: string;
  lastName: string;
  username: string;
  createdAt: string;
  likes: Array<string>;
  commentimage: string;
  replies: Array<String>;
  // compontenttype?: string; //can be reply,notecomment or comment
}
