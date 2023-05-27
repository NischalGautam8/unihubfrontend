import axios from "axios";
const getFollowingModule = async (userid) => {
  const follwing = await axios.get(
    "http://localhost:5000/api/following/" + userid
  );
  return follwing;
};
const createPost = async (description, userId, jwt) => {
  try {
    const response = await axios.post("http://localhost:5000/api/posts", {
      description,
      userId,
      jwt,
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

const handleLikeUtil = async (_id, userid) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/posts/like/${_id}`,
      {
        userid,
      }
    );
    return response;
  } catch (err) {}
};
const handleUnlikeUtil = async (_id, userid) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/posts/unlike/${_id}`,
      {
        userid,
      }
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};
const createConversation = async (users) => {
  var name = "";
  console.log(users.length);
  if (users.length == 2) {
    name = users[0].firstName;
  } else {
    for (var i = 0; i < 2; i++) {
      name = name + "," + users[i].firstName;
    }
    name = name + ` ${users.length - 2} others`;
  }
  console.log(name);
  const conversation = await axios.post(
    "http://localhost:5000/api/conversation",
    {
      name: name,
      users: users,
    }
  );
  return conversation;
};
const getSingleNote = async (id, userid) => {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/" + "notes/view/" + id + "?userid=" + userid
    );
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
const getComment = async (compontenttype, refid) => {
  try {
    console.log(compontenttype);
    const res = await axios.get(
      "http://localhost:5000/api/" + `${compontenttype}/${refid}`
    );
    console.log(res);

    return res;
  } catch (err) {
    console.log(err);
  }
};
const makeComment = async (compontenttype, refid, userinfo, comment) => {
  try {
    console.log("userinfo", userinfo);
    const comm = await axios.post(
      "http://localhost:5000/api/" + `${compontenttype}/${refid}`,
      {
        content: comment,
        userid: userinfo.userid,
      }
    );
    return comm;
  } catch (err) {
    console.log(err);
  }
};
const getNotesClientSide = async (page, subject) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/notes?page=${page}&&subject=${subject}`
    );
    // console.log(res);
    return res.data.notes;
  } catch (err) {
    console.log(err);
  }
};
const getRating = async (noteid, userid) => {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/" + "notes/rate/" + noteid,
      {
        userid,
      }
    );
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
const rateNote = async (noteid, userid, rating) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/" + "notes/rate/" + noteid,
      {
        userid: userid,
        rating,
      }
    );
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};
export {
  getFollowingModule,
  createConversation,
  getSingleNote,
  getComment,
  makeComment,
  getNotesClientSide,
  rateNote,
  getRating,
  handleLikeUtil,
  handleUnlikeUtil,
  createPost,
};
