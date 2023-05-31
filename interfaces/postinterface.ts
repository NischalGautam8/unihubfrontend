import { userinterface } from "./userinterface";

export interface postinterface {
  _id: string;
  description: string;
  image: string;
  userId: userinterface;
  commentsCount: number;
  likesCount: number;
  hasLiked: boolean;
}
