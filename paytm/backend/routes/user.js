const {Router} = require("express")
const {Users} = require("../db/index")
const {Account} = require("../db/index")
const {userValidationSignUp, userValidationUpdate} = require("../validation/index")
const {userValidationSignIn} = require("../validation/index")
const {JWT_SECRET} = require("../config")
const jwt = require("jsonwebtoken")
const {userMiddlware} = require("../middlewares/userMiddleware")

const router = Router()


router.post("/signup",async(req,res)=>{
    const {success} = userValidationSignUp.safeParse(req.body)
    if(!success){
        return res.status(400).json({message:"Invalid inputs / username already taken",error:success.errors})
    }
    const {firstName, lastName, userName, password} = req.body
    const user = await Users.findOne({userName:userName})
    if(user){
        return res.status(400).json({message: "User already exists"})
    }
    
    const newUser = new Users({
        firstName,
        lastName,
        userName,
        password
    })
    await newUser.save()
    const accountUser = new Account({
        userId: newUser._id,
        balance: Math.floor(Math.random()*10000)
    })
    await accountUser.save()
    const user_id = newUser._id
    const token = jwt.sign({
        user_id
    },JWT_SECRET)
    res.json({
        message: "User created successfully",
        token: token
    })
})

router.post("/signin",async(req,res)=>{
    const {success} = userValidationSignIn.safeParse(req.body)
    if(!success){
        return res.status(400).json({message:"Invalid inputs",error:success.errors})
    }
    const {userName, password} = req.body
    const user = await Users.findOne({
        userName,
        password
    })
    if(user){
        const user_id = user._id
        const token = jwt.sign({
            user_id
        },JWT_SECRET)
        res.json({
            token: token
        })
        return;
    }
    return res.json({
        message:"Error while logging in"
    })
    
});

router.get("/me",userMiddlware,async(req,res)=>{
    const userId = req.userId
    const user = await Users.findById(userId)
    if(!user){
        return res.status(404).json({message:"User not found",userSigned: false})
    }
    res.json({user:user,userSigned: true})
})

router.put("/",userMiddlware,async(req,res)=>{
    const {success} = userValidationUpdate.safeParse(req.body)
    if(!success){
        return res.status(400).json({message:"Invalid inputs"})
    }
    const {firstName, lastName, password} = req.body
    const userId = req.userId
    try {
        const updateUser = await Users.findByIdAndUpdate(userId,{firstName,lastName,password},{new:true});
        res.json({message: "User updated successfully",user:updateUser})
    } catch (error) {
        res.json({message: "Error while updating user",error: error.message})
    }
})

router.get("/bulk",userMiddlware,async(req,res)=>{
    const userId = req.userId;
    const filter = req.query.filter || ""
    let users;
    if(filter.includes(" ")){
        const name = filter.split(" ")
        let firstName = name[0]
        let secondName = name[1]
        users = await Users.find({
            $or: [
                {firstName:{$regex:firstName,$options:"i"}},
                {lastName:{$regex:secondName,$options:"i"}}
           ]
        })
    }else{
        users = await Users.find({
            $or: [
                {lastName:{$regex:filter,$options:"i"}},
                {firstName:{$regex:filter,$options:"i"}}
            ]
        })
    }
    
    const usersData = users.filter(user=>user._id!=userId)
    res.json({
        users: usersData.map(user=>({
            id:user._id,
            firstName:user.firstName,
            lastName:user.lastName,
            userName: user.userName
        }))
    })
})

module.exports = router