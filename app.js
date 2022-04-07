const morgan = require("morgan") // 请求日志
const helmet = require("helmet") // 安全防护中间件,使用helmet全部功能

const studentsRouter =  require("./router/students");
const express = require("express")
const app = express();
const port = 3000;

app.use(express.json())    // JSON格式化req.body
app.use(express.urlencoded({ extended:true })) // 格式化key=value&key=value
app.use(express.static("public")) // 静态资源
app.use(helmet())
app.use(morgan("tiny"))
app.use("/api/students", studentsRouter); // 路由

app.get("/", (req,res)=>{
  res.send("Hello World")
})

app.listen(port,()=>{
  console.log("正在启动服务端口:"+port)
})