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
  console.log("Inside Assign")
  const user=this
  console.log(user)
  user.favMovie.push(id)
  await user.save()
}
module.exports = mongoose.model('User', UserSchema)

