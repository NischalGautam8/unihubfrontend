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
export  {getFollowingModule,createConversation};