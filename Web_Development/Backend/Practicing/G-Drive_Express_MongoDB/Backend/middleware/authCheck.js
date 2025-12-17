import userList from '../userDB.json' with {type: 'json'};
import { ObjectId } from 'mongodb';

export default async function checkAuth(req,res,next){
    const {userId:uid}=req.cookies;
    const db=req.db;
    // const user = userList.find((user)=>user.id===uid)
    const user=await db.collection('user').findOne({_id: new ObjectId(uid)})
    if(!uid || !user)
        return res.status(401).json({error: "Not Logged In"})
    req.user=user
    req.userId=user._id.toString();
    next()
}