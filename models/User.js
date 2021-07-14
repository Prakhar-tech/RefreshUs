const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  email:{
    type:String,
    required: true
  },
  favMovie:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Movie'
    }
  
  ],
  favGame:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Games'
    }
  ],
  favWebseries:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Webseries'
    }
  ]
})

UserSchema.methods.assign=async function(id){
  const user=this;
  let count=0
  console.log(id)
  console.log("Inside Assign")
  console.log(user.favMovie.length);
  for(let i=0;i<user.favMovie.length;i++){
    if((user.favMovie[i]).toString()===id){
        count++
    }
    
  }
  if(count==0){
    console.log("if part Running")
    user.favMovie.push(id)
    await user.save()
  }else{
    console.log("Movie Already Exist In Fav List")
  }
}
module.exports = mongoose.model('User', UserSchema)

