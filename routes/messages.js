import express from 'express';
import controller from '../controller/message.js'

const router = express.Router()

router.route('/')
     .post(controller.addmessage)
     .get(controller.getmessages)   
     


    router.route('/:id')
          .get(controller.getmessage) 
        

    export default router   