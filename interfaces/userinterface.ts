export interface userinterface {
  userid: string;
  username: string;
  firstName: string;
  lastName: string;
  gender: string;
  password?: string;
  followers?: {
    type: Array<userinterface>;
  };
  following?: {
    type: Array<userinterface>;
  };
  googleId?: string;
  profilepic?: string;
}
