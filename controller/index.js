import {addusers,getuser,updateuser,deleteuser,getusers} from "../models/database.js";
// import {auth} from "../middleware/authentication.js";
import bcrpt from 'bcrypt';

export default {
    getallusers: async (req,res) => {
    res.send(await getusers())
},
adduser : async (req,res)=> {
    const {username,email,password,role} = req.body;
    bcrpt.hash(password,10, async(err,hash)=> {
        if(err) throw err;
        await addusers(username,email,hash,role);
        res.send({
            msg:"you have successfully created a new account"
        })
       
    })
    

        

},
getoneuser : async (req,res)=> {
    res.send(await getuser(+req.params.id))

},
edit : async (req,res)=> {  
    let {username,email,password,role} = req.body


    const [user] = await getuser(+req.params.id);

    userName ? userName : {userName} = user
    userMail? userMail : {userMail} = user
    // userPass? userPass : {userPass} = user
    userRole? userRole : {userRole} = user

    if (userPass) {
        bcrpt.hash(userPass, 10, async (err, hash) => {
            if (err) throw err;
            await updateuser(username,email,hash,role, +req.params.id);
            res.send({ msg: "You have edited your account" });
        });
    } else {
        // If password is not provided, update other fields without hashing the password
        await updateuser(username,email,user.password,role, +req.params.id);
        res.send({ msg: "You have edited your account" });
    }
    
    
   

        // await updateuser(userName,userMail,userPass,userRole,+req.params.id)
        
       
  

    // await updateuser(userName,userMail,userPass,userRole,+req.params.id)

    // res.send(await getusers());

},
delete : async (req,res)=> {
    await deleteuser(+req.params.id);

    res.send(await getusers());
},
login : async (req,res)=> {
    // res.send('LOGIN YAY')
}

}  