const Blog = require('./model/Blog')
//resolver
const resolvers = {
  Query:{
    hello: ()=>{
      return "Hello world"
    },
    getAll: async()=>{
      return await Blog.find({})
    }
  },
  Mutation:{
    createBlog: async(parent, args, context, info) =>{
      const {title, description} = args.blog;
      const blog = await new Blog({title, description}).save();
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
  }
}

module.exports = resolvers;