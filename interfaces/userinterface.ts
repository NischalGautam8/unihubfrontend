export interface userinterface {
  _id: string;
  userid?: string;
  username: string;
  firstName: string;
  lastName: string;
  gender: string;
  password?: string;
  followers?: userinterface[];
  following?: {
    type: Array<userinterface>;
  };
  googleId?: string;
  profilepic?: string;
  createdAt:string;
}
