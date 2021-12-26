import express from 'express'
import bcrypt from 'bcryptjs'


import jwt from 'jsonwebtoken'
import config from '../../config/index'
const {JWT_SECRET} = config;

//Model

import User from '../../models/user'

const router = express.Router()

// @routers GET api/user
// @desc Get all user
// @access public

router.get('/', async(req, res)=> {
    try{
const users = await User.find()
if(!users) throw Error("No Users")
res.status(200).json(users);

    }catch(e) {
        console.log(e);
        res.status(400).json({msg: e.message})
    }
});

//Register user, Public
router.post('/', (req, res)=> {
    console.log(req)
    const {name, email, psasword} = req.body

    //Validation

    if(!name||!email||!password) {
return res.status(400).json({msg: "모든 필드를 채워야 합니다."})
    }
    

    //Existing User
    User.findOne({email}).then((user)=> {
      if(user) return res.status(400).json({msg:"이미 존재하는 회원입니다. 로그인 해주세요."});
      
    const newUser = new User({
        name, email, password
    })
    /*
    bcrypt.getSalt(10, (err, salt)=> {
        bcrypt.hash(newUser.password, salt, (err, hash)=>{
            if(err) throw err;
            newUser.password = hash;
            newUser.save().then((user)=>{
                jwt.sign(
                    {id: user.id},
                    JWT_SECRET,
                    {expiresIn: 3600},
                    {err, token} =>{
                        if(err) throw err;
                        res.json({
                            token,
                            user: {
                                id: user.id,
                                name:user.name,
                                email:user.email,
                            }
                        })
                    }

                )
            })
        })
    })
    });
})
*/
bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save().then((user) => {
        jwt.sign(
          { id: user.id },
          JWT_SECRET,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            res.json({
              token,
              user: {
                id: user.id,
                name: user.name,
                email: user.email,
              },
            });
          }
        );
      });
    });
  });
});
});



export default router