import Users from "../Model/userModel.js";


export default async function checkAuth(req,res,next){
    const {userId:uid}=req.cookies;
    // const user = userList.find((user)=>user.id===uid)
    const user=await Users.findById(uid).lean();
    if(!uid || !user)
        return res.status(401).json({error: "Not Logged In"})
    req.user=user
    next()
}