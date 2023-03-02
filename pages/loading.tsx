import React from "react";

function loading() {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div>
      {arr.map((element) => (
        <li key={element}>
          <span
            className="inilinne-block h-5 animate-pulse"
            style={{
              animationDelay: `${element * 0.05}s`,
              animationDuration: "1s",
            }}
          />
        </li>
      ))}
    </div>
  );
}
// function singleelement() {
//   return (
//     <div>
//       <div className="" style={{ width: "700px" }}>
//         <div
//           style={{ backgroundColor: "#000000" }}
//           className="post__wrapper   flex rounded-lg gap-3 pl-2 pr-2 pb-2 pt-2 "
//         >
//           {/* <div className="likes__section flex flex-col gap-3 ">
//           <Image
//             style={{ width: "32px" }}
//             width={32}
//             alt="upvote"
//             src={uplike}
//           ></Image>
//           <Image
//             //   style={{ width: "32px" }}
//             width={32}
//             alt="downvote"
//             src={downlike}
//           ></Image>
//         </div> */}
//           <div
//             style={{ objectFit: "cover" }}
//             className="profile__pic__content flex gap-2"
//           >
//             <div className="">
//               <div
//                 style={{
//                   borderRadius: "999px",
//                   objectFit: "cover",
//                   width: "50px",
//                   height: "50px",
//                 }}
//                 className="rounded-full max-w-fit"
//               >
//                 hi
//               </div>
//             </div>
//             <div className="content__section flex flex-col gap-3 ">
//               <div className="profilename flex flex-col gap-1  ">
//                 <h1 className="font-semibold text-xl ">load</h1>
//                 <p
//                   className="font-ubuntu "
//                   style={{ fontSize: "18px", fontWeight: "200" }}
//                 >
//                   loading
//                 </p>

//                 <div className="py-2 max-w-fit  ">
//                   <div className="rounded"></div>
//                 </div>
//               </div>
//               <div className="comment__details flex gap-4">
//                 <div className="comment flex items-center gap-2">
//                   <div>lol</div>
//                   <h1
//                     className=" text-sm font-ubuntu "
//                     style={{ color: "#8B8B8B" }}
//                   >
//                     Comments 24k
//                   </h1>
//                 </div>
//                 <div className="comment flex items-center gap-2">
//                   <h1
//                     className=" text-sm font-ubuntu"
//                     style={{ color: "#8B8B8B" }}
//                   >
//                     Save
//                   </h1>
//                 </div>
//                 <div className="comment flex items-center gap-2">
//                   <h1
//                     className=" text-sm font-ubuntu"
//                     style={{ color: "#8B8B8B" }}
//                   >
//                     Share
//                   </h1>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
export default loading;
