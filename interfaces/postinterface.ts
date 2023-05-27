import { userinterface } from "./userinterface";

export interface postinterface {
  _id: string;
  description: string;
  postimage: string;
  userId: userinterface;
  commentsCount: number;
  likesCount: number;
  hasLiked:boolean;
}
