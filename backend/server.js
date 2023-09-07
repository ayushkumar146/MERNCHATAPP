const express=require("express");
const dotenv=require("dotenv");
const chats=require("./data/data");
const cors =require("cors");
const connectDB =require("./config/db");
const userRoutes=require('./routes/userRoutes');
const chatRoutes =require("./routes/chatRoutes")
const messageRoutes =require("./routes/messageRoutes");
const {notFound,errorHandler}= require("./middleware/errorMiddleware");
const path = require("path");



dotenv.config();
const app=express();
app.use(cors()); 
connectDB();

 app.use(express.json());

// app.get("/",(req,res)=>{
// res.send("ya");
// });

app.use('/api/user',userRoutes);
app.use('/api/chat',chatRoutes);
app.use('/api/message',messageRoutes);

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

app.use(notFound);
app.use(errorHandler);



const PORT=process.env.PORT || 5000;

const server=app.listen(PORT); 
const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:3000",
      // credentials: true,
    },
  });

  io.on("connection",(socket)=>{
    console.log("connected bhai");
 
    socket.on("setup",(userData)=>{
    socket.join(userData._id);
    console.log(userData._id);
    socket.emit("connected");
    })

    socket.on("join chat", (room) => {
      socket.join(room);
      console.log("User Joined Room: " + room);
    });

    socket.on("new message", (newMessageRecieved) => {
      var chat = newMessageRecieved.chat;
  
      if (!chat.users) return console.log("chat.users not defined");
  
      chat.users.forEach((user) => {
        if (user._id == newMessageRecieved.sender._id) return;
  
        socket.in(user._id).emit("message recieved", newMessageRecieved);
      });
    });

  })

  