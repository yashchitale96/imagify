import userModel from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import razorpay from 'razorpay'
import transactionModel from '../models/transactionModel.js'

const registerUser = async (req,res) => {
    try{
        const {name, email, password} = req.body;

        if(!name || !email || !password){
            return res.json({success:false, message:"Missing Details"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData);
        const user = await newUser.save();

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)

        res.json({success:true, token, user:{name:user.name}});
    }
    catch(err){
        console.log(err)
        res.json({success:false, message: err.message});
    }
}

const loginUser = async(req,res) =>{
    try{
        const {email, password} = req.body;

        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success:false, message:"User does not exists"})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.json({success:false, message:"Invalid Credentials"})
        }

        else{
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
            res.json({success:true, token, user:{name:user.name}})
        }


    }
    catch(err){
        console.log("Error Login: ", err)
        res.json({success:false, message: err.message});
    }
}

const userCredits = async(req,res) =>{
    try{
        const userId = req.user.id; // Changed from req.body.userId
        const user = await userModel.findById(userId);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true, 
            credits: user.creditBalance, 
            user: {name: user.name}
        });
    }
    catch(err){
        console.error("Error fetching credits:", err);
        res.status(500).json({
            success: false, 
            message: "Error fetching user credits"
        });
    }
}

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET
})

const paymentRazorpay = async(req,res) =>{
    try{
        const {planId} = req.body;
        const userId = req.user.id

        const userData = await userModel.findById(userId)

        if(!userId || !planId){
            return res.json({success:false, message:"Missing Details"})
        }

        if(!userData){
            return res.json({success:false, message:"User not found"});
        }

        let credits, plan, amount, date

        switch(planId){
            case 'Basic':
                plan = 'Basic'
                credits = 100
                amount = 10
                break;
            
            case 'Advanced':
                plan = 'Advanced'
                credits = 500
                amount = 50
                break;
            
            case 'Business':
                plan = 'Business'
                credits = 5000
                amount = 250
                break

            default:
                return res.json({success:false, message:'Plan not found'})
        }

        date = Date.now();

        const transactionData = {
            userId, plan, amount, credits, date
        }

        const newTransaction = await transactionModel.create(transactionData)

        const options = {
            amount: amount * 100,
            currency: 'INR',
            receipt: newTransaction._id,

        }

        await razorpayInstance.orders.create(options, (error, order)=>{
            if(error){
                console.log(error)
                return res.json({success: false, message:error})
            }
            res.json({success:true, order});
        })
    }
    catch(err){
        console.log(err)
        res.json({success:false, message:err.message})
    }
}

const verifyRazorpay = async (req,res) =>{
    try{
        const {razorpay_order_id} = req.body;
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

        if(orderInfo.status === 'paid'){
            const transactionData = await transactionModel.findById(orderInfo.receipt)
            if(transactionData.payment){ // payment already verified
                return res.jsson({success:false, message:"Payment Failed"})
            }
            const userData = await userModel.findById(transactionData.userId)
            const creditBalance = userData.creditBalance + transactionData.credits
            await userModel.findByIdAndUpdate(userData._id, {creditBalance})
            await transactionModel.findByIdAndUpdate(transactionData._id, {payment:true})
            res.json({success:true, message:'Credits Added'})
        }
        else{
            res.json({success:false, message:'Payment Failed'})
        }

        
    }
    catch(err){
        console.log(err)
        res.json({success:false, message:err.message})
    }
}

export {registerUser, loginUser, userCredits, paymentRazorpay, verifyRazorpay}

