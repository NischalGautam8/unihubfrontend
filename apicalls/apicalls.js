import axios from "axios";
const getFollowingModule = async (userid) => {
  const follwing = await axios.get(
    "https://unihubbackend.onrender.com/api/following/" + userid
  );
  return follwing;
};
const createPost = async (description, userId, jwt) => {
  try {
    const response = await axios.post(
      "https://unihubbackend.onrender.com/api/posts",
      {
        description,
        userId,
        jwt,
      }
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};

const handleLikeUtil = async (_id, userid, jwt) => {
  try {
    const response = await axios.post(
      `https://unihubbackend.onrender.com/api/posts/like/${_id}`,
      {
        userid,
        jwt,
      }
    );
    return response;
  } catch (err) {}
};

const handleUnlikeUtil = async (_id, userid, jwt) => {
  try {
    const response = await axios.post(
      `https://unihubbackend.onrender.com/api/posts/unlike/${_id}`,
      {
        userid,
        jwt,
      }
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};
const findUserByUsername = async (username) => {
  const res = await axios.get(
    "https://unihubbackend.onrender.com/api/usser/find",
    {
      username,
    }
  );
  return res.data.user;
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
    "https://unihubbackend.onrender.com/api/conversation",
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
      "https://unihubbackend.onrender.com/api/" +
        "notes/view/" +
        id +
        "?userid=" +
        userid
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
      "https://unihubbackend.onrender.com/api/" + `${compontenttype}/${refid}`
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
      "https://unihubbackend.onrender.com/api/" + `${compontenttype}/${refid}`,
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
      `https://unihubbackend.onrender.com/api/notes?page=${page}&&subject=${subject}`
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
      "https://unihubbackend.onrender.com/api/" + "notes/rate/" + noteid,
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
      "https://unihubbackend.onrender.com/api/" + "notes/rate/" + noteid,
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
const fetchUserPosts = async (userId, page, myid) => {
  console.log("fetchuserposts", userId, myid);
  const res = await axios.get(
    `https://unihubbackend.onrender.com/api/posts/user/${userId}?page=${page}&&myid=${myid}`
  );
  return res;
};
const getSavedPosts = async (userId, page, jwt) => {
  const res = await axios.get(
    `https://unihubbackend.onrender.com/api/posts/saved/${userId}?page=${page}`,
    {
      headers: {
        authorization: `Bearer ${jwt}`,
      }, //res.data.msg
    }
  ); //send jwt
  return res;
};
const findPosts = async (querystring, userid) => {
  console.log("querystring", querystring);
  console.log("usserid", userid);
  const res = await axios.get(
    `https://unihubbackend.onrender.com/api/posts/find?querystring=${querystring}&&userid=${userid}`
  );
  return res;
};
const findNotes = async (querystring) => {
  console.log(querystring);
  const res = await axios.get(
    `https://unihubbackend.onrender.com/api/notes/find?querystring=${querystring}`
  );
  return res;
};
const findUsers = async (querystring) => {
  const res = await axios.get(
    `https://unihubbackend.onrender.com/api/users/find?querystring=${querystring}`
  );
  return res;
};
const fetchPosts = async (userid, page) => {
  const res = await fetch(
    "https://unihubbackend.onrender.com/api/posts?userid=" +
      `${userid}&&page=${page}`
  );
  const data = await res.json();
  return data;
};
const getUserNotes = async (id, page) => {
  const res = await axios.get(
    `https://unihubbackend.onrender.com/api/notes/user/${id}?page=${page}`
  );
  return res;
};
export {
  getFollowingModule,
  getUserNotes,
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
  fetchPosts,
  fetchUserPosts,
  getSavedPosts,
  findUserByUsername,
  findNotes,
  findPosts,
  findUsers,
};
