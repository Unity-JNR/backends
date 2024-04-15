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

    export{addusers,getuser,updateuser,deleteuser,checkuser,getusers}