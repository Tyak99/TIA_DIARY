import models from '../models';

const { User } = models;

class UserController {

    static login(req, res){
        const { email, password } = req.body;
        
        User.findOne({ where: {email}})
        .then(user => {
            if(!user){
                return res.status(401).json({
                    status: 401,
                    error: 'invalid credentials'
                })   
            }

            if(user.password !== password){
                return res.status(401).json({
                    status: 401,
                    error: 'invalid credentials'
                })
            }

            return res.status(200).json({
                status: 200,
                data: user
            })
        })

    }
}

export default UserController;
