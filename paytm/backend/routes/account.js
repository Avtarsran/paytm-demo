const {Router} = require("express")
const {Users} = require("../db/index")
const {Account} = require("../db/index")
const { userMiddlware } = require("../middlewares/userMiddleware")
const { default: mongoose } = require("mongoose")
const router = Router()


router.get("/balance",userMiddlware,async(req,res)=>{
    const userId = req.userId
    try {
        const user = await Account.findOne({userId:userId})
        const balance = user.balance
        return res.json(balance)
    } catch (error) {
        return res.json({message:"no such account exists"})
    }
})

router.post("/transfer",userMiddlware,async(req,res)=>{
    const session = await mongoose.startSession()

    session.startTransaction()
    const {amount, to} = req.body
    const userId = req.userId

    const sender = await Account.findOne({userId: userId})
    if(sender.balance < amount || !sender){
        await session.abortTransaction()
        return res.json({message:'insufficient balance or user not found',success:false})
    }
    if(amount.toString().startsWith("-")){
        return res.json({message:'invalid amount',success:false})
    }
    const receiver = await Account.findOne({userId: to})
    if(!receiver){
        await session.abortTransaction()
        return res.json({message:'user not found',success:false})
    }
    
    await Account.updateOne({userId: userId},{$inc:{'balance': -amount}}).session(session);
    await Account.updateOne({userId: to},{$inc:{'balance': amount}}).session(session);

    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
})

module.exports = router