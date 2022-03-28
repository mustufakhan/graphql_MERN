const Blog = require('./model/Blog')
const User = require('./model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//resolver
const resolvers = {
  Query:{
    hello: ()=>{
      return "Hello world"
    },
    getAll: async()=>{
      return await Blog.find({})
    },
    getAllUser: async()=>{
      return await User.find({})
    }
    
  },
  Mutation:{
    createBlog: async(parent, args, context, info) =>{
      const {title, description} = args.blog;
      const blog = await new Blog({title, description}).save();
      console.log(blog)
      return blog;  
    },
    updateBlog: async(parent, args, context, info) =>{
      const { id } = args;
      const {title, description} = args.blog;
      const blog = await Blog.findByIdAndUpdate(id,{
        title,description
      },{
        new: true
      })
      return blog;  
    },
    deleteBlog: async(parent, args, context, info) =>{
      const { id } = args;
      console.log('id',id)
      const blog = await Blog.findByIdAndDelete(id)
      return "Deleted";  
    },
    createUser: async(parent, args, context, info) => {
      try{
        const {username, email, password} = args.user;
        const user = await User.find({email})
        if(user.length > 0){
          return { error: "user already exits" }
        }
        const hash = await bcrypt.hash(password, 12)
        const newUser = new User({username, email, password:hash})
        const result = await newUser.save();
        return {...result._doc, success: true};
      } catch(err){
        console.log(err)
      }
     
    },
    loginUser: async(parent, args, context, info)=>{
      const {email, password} = args.user;
      const user = await User.findOne({email});
      const isEqual = await bcrypt.compare(password, user.password);
      const token = jwt.sign({_id: user._id},'key')
      console.log({...user})
      if(isEqual && user){
        return { success: true, ...user._doc, id: user._id, token}
      }else{
        return { error: "Invlaid credentionals" }
      }
    }
  }
}

module.exports = resolvers;