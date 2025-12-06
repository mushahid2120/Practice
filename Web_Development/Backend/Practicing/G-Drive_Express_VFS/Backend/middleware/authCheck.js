import userList from '../userDB.json' with {type: 'json'}

export default function checkAuth(req,res,next){
    const {userId:uid}=req.cookies;
    const user = userList.find((user)=>user.id===uid)
    if(!uid || !user)
        return res.status(401).json({error: "Not Logged In"})
    req.user=user
    next()
}