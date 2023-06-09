const mongoose = require('mongoose');

const database = module.exports = () => {
    const connectionParams = {
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }
    try{
        mongoose.connect(
            'mongodb+srv://yurabiserov93:SQboDGvDWCwfeTfK@cluster0.tsyl4ze.mongodb.net/college-collection?retryWrites=true&w=majority',
            connectionParams
            )
        console.log("Database connected successfully")
    }catch(err){
        console.log(err)
    }
}
database()

// async function connect() {
//     await mongoose.connect('mongodb://localhost:27017/College-App');
// }
// connect();




