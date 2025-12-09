export default function(req,res,next,id){
    console.log(id)
    const uuidregex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    if(!uuidregex.test(id))
        return res.status(400).json({error:"Invalid ID"});
    next();
}