import { pool } from "../config/config.js";

const getusers = async() => {
    const [users] = await pool.query("SELECT * FROM users");
    return users  
}
const addusers = async(username,email,password,role) => {
    const [result] = await pool.query(`
    insert into users (username,email,password,role) values (?,?,?,?);
    `,[username,email,password,role] 
    ) 
    return result 
}

const getuser = async(id) => {
    const [user] = await pool.query("SELECT * FROM users WHERE user_id = ?", [id]);
    return user
}

const updateuser = async(username,email,password,role,user_id) => {
    const [user]  = await pool.query(`
        UPDATE users SET username =?, email =?, password =?, role =?  WHERE user_id =?
    `, [username,email,password,role,user_id])
    return user 
}

const deleteuser = async(id)=> {
    const [user]  = await pool.query(`
        DELETE FROM users WHERE  user_id=?
    `, [id])
    return user
}

const checkuser = async(email)=> {
    const [[{password}]]= await pool.query(`
    SELECT password From users WHERE email = ?`,[email])
    console.log(password);
        return password
    }
    //end of user table

    //start of message table
    const getmessages = async() => {
        const [messages] = await pool.query("SELECT * FROM messages");
        return messages  
    }

    const addmessage = async(sender,receiver,message) => {
        const [result] = await pool.query(`
        INSERT INTO messages (sender_id, receiver_id, message_text) 
        VALUES (?, ?, ?);
        `,[sender,receiver,message] 
        ) 
        return result
    }

    const getmessage = async(id) => {
        const [message] = await pool.query("SELECT * FROM messages WHERE message_id = ?", [id]);
        return message
    }






    export{addusers,getuser,updateuser,deleteuser,checkuser,getusers, getmessages,addmessage,getmessage}