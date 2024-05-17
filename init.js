const mongoose = require("mongoose");
const Task=require("./models/task");
main()
  .then(() => {
    console.log("Connection is successfull");
  })
  .catch((err) => console.log(err));

  async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/taskList");
}

let data=[
    {
    title:"Homework",
    description:"Maths problem solving",
    },
    {
    title:"Gaming",
    description:"Game on PC atleast 2 hours",  
    },
]
Task.insertMany(data);