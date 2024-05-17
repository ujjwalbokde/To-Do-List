const express=require("express")
const app=express();
const mongoose=require("mongoose")
const path = require("path");
const methodOverride=require("method-override")
const Task=require("./models/task")
const ejsMate=require("ejs-mate")

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);

main()
  .then(() => {
    console.log("Connection is successfull");
  })
  .catch((err) => console.log(err));

  async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/taskList");
}

app.get("/",(req,res)=>{
    res.send("Root is here!")
})

app.get("/tasks",async(req,res)=>{
    let allTask=await Task.find()
    res.render("tasks/index.ejs",{allTask})
})

app.get("/tasks/new",(req,res)=>{
    res.render("tasks/new.ejs")
})

app.post("/tasks/new",async (req,res)=>{
    let {title,description}=await req.body;
    console.log(title,description);
    let newTask=new Task({
        title:title,
        description:description,    
    })   
    await newTask.save();
    res.redirect("/tasks")
})

app.get("/tasks/:id/edit",async(req,res)=>{
    const {id}=req.params
    let task=await Task.findById(id);
    console.log(task);
    res.render("tasks/edit.ejs",{task})
})

app.put("/tasks/:id",async(req,res)=>{
    const {id}=req.params
    let {title,description}=req.body;
    const updatedTask = await Task.findByIdAndUpdate(id, { title, description }, { runValidators: true, new: true });
    console.log(updatedTask);
    res.redirect("/tasks")
})

app.delete("/tasks/:id",async(req,res)=>{
    let {id}=req.params;
    let deletedTask=await Task.findByIdAndDelete(id);
    console.log(deletedTask);
    res.redirect("/tasks")
})

app.listen(8080,()=>{
    console.log("Server started at port 8080");
})
