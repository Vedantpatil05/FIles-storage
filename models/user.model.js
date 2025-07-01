
const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
        username:{
                type:String,
                require:true,
                trim:true,
                lowercase:true,
                unique:true,
                minlength:[4,'Username must be at least 4 characters long']
        },
        email:{
                type:String,
                require:true,
                trim:true,
                lowercase:true,
                unique:true,
                minlength:[10,'Email must be at least 10 characters long']
        },      
        password:{
                type:String,
                require:true,
                trim:true,
                minlength:[5 ,'Password must be at least 5 characters long']
        }});
const user = mongoose.model('user', userSchema);


module.exports=user;