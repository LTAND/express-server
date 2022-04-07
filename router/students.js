const express = require("express");
const router = express.Router();

const students = [
  {id:1, name:"张三"},
  {id:2, name:"李四"},
  {id:3, name:"王五"},
]

// 获取所有学生
router.get("/", (req,res)=>{
  res.send({ msg:"success", data:students})
})

// 根据id获取某个学生
router.get("/:id", (req,res)=>{
  const student = students.find(s=> s.id=== parseInt(req.params.id));
  if(!student) return res.status(404).send({msg:'未找到该学生',data:null});
  
  res.send({
    msg:"success",
    data:student
  })
})

// 增加学生
router.post("/", (req, res)=>{
  if(!req.body.name || req.body.name < 2) return res.status(400).send({ msg:"必须有名字,名字要大于等于两个字符",data:null})

  const student = {
    id: students.length +1,
    name: req.body.name
  }
  students.push(student);

  res.send({
    msg:"success",
    data:student
  })
})

// 根据id修改学生名字
router.put("/:id", (req,res)=>{
  const student = students.find(s=> s.id === parseInt(req.params.id));
  if(!student) return res.status(404).send({msg:'未找到该学生',data:null,});

  if(!req.body.name || req.body.name < 2) return res.status(400).send({ msg:"必须有名字,名字要大于等于两个字符",data:null})

  student.name = req.body.name;

  res.send({
    msg:"success",
    data:student
  })
})

// 根据id删除某个学生
router.delete("/:id", (req,res)=>{
  const student = students.find(s=> s.id === parseInt(req.params.id));
  if(!student) return res.status(404).send({msg:'未找到该学生',data:null,});

  const index = students.indexOf(student)

  students.splice(index, index)

  res.send({msg:"success",data:student})
})

module.exports = router;
