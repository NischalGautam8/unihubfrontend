import messageinterface from "@/interfaces/messageinterface";
import cookie from "js-cookie";
const determineMarginAndBackground = (message: messageinterface) => {
  const user = JSON.parse(cookie.get("user"));
  // console.log(user.userid, "sender", message.sender);
  if (user.userid == message.sender) {
    return { marginLeft: "auto" };
  } else {
    return { marginLeft: 10 };
  }
};

export { determineMarginAndBackground };
