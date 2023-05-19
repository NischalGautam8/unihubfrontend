import { userinterface } from "./userinterface";

export interface noteinterface {
  name: string;
  url: string;
  uploadedBy: userinterface;
  ratingsMap: Map<string, string>;
  size: number;
  subject: string;
  _id: string;
  comments: [string];
  createdAt: string;
  updatedAt: string;
}
