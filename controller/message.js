import { getmessages,getmessage , addmessage} from "../models/database.js";
// import {auth} from "../middleware/authentication.js";
import bcrpt from 'bcrypt';

export default {
    getmessages: async (req,res) => {
    res.send(await getmessages())
},
addmessage : async (req,res)=> {
    const {sender_id, receiver_id, message_text} = req.body;
        await addmessage(sender_id, receiver_id, message_text);
       
  
    

        

},
getmessage : async (req,res)=> {
    res.send(await getuser(+req.params.id))

}


}  