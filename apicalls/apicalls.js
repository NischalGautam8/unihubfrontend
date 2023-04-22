import axios from "axios";
const getFollowingModule = async (userid) => {
  const follwing = await axios.get(
    "http://localhost:5000/api/following/" + userid
  );
  return follwing;
};
const createConversation =async(users)=>{
  var name="";
  console.log(users.length);
  if(users.length==2){
    name=users[0].firstName;
  }else{
    for(var i=0;i<2;i++){
      name=name+","+users[i].firstName;
    }
    name=name+` ${users.length-2} others`
  }
  console.log(name);
  const conversation=await axios.post("http://localhost:5000/api/conversation",{
    name:name,
    users:users,
    
  })
  return conversation;
}
const getSingleNote=async(id)=>{
  try{
    const res=await axios.get(process.env.BASE_URL+"notes/view/"+id);
    console.log(res);   
    return res.data;
  }catch(err){
    console.log(err);
  }
}
const getComment=async (compontenttype,refid)=>{
  try{
    console.log(compontenttype);
     const res= await axios.get(
      "http://localhost:5000/api/"+`${compontenttype}/${refid}`);
      console.log(res);
      
      return res;
    }catch(err){
      console.log(err);
    }
}
const makeComment=async (compontenttype,refid,userinfo,comment)=>{
  try{
console.log("userinfo",userinfo);
    const comm = await axios.post(
      "http://localhost:5000/api/"+`${compontenttype}/${refid}`,
      {
        content: comment,
        userid: userinfo.userid,
      }
      );
      return comm;
  }catch(err){
    console.log(err);
  }
}
export  {getFollowingModule,createConversation,getSingleNote,getComment,makeComment};