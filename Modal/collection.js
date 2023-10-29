const mongoose=require('mongoose')
const studentSchema=new mongoose.Schema({
    sid:Number,
    name:String,
    age:Number,
    cl:String,
    pno:Number,
    email:String,
    status:Boolean,
    result:[],
    psw:String,
    date:String
    



})

const teacherSchema=new mongoose.Schema({
    tid:Number,
    name:String,
    subject:String,
    tpsw:String,
    status:Boolean,
    date:String



})

const adminSchema=new mongoose.Schema({
    uname:String,
    psw:String,


})
const subjectSchema=new mongoose.Schema({
    name:String,
    code:Number,
    date:String
})
const classSchema=new mongoose.Schema({
    name:String,
    numerical:Number,
    division:String,
    date:String
})
const testSchema=new mongoose.Schema({
    name:String,
    des:String,
    date:String,
    status:Boolean,
    result:[]

})
const markSchema=new mongoose.Schema({
    tid:Number,
    sid:Number,
    name:String,
    subcode:Number,
    mark:Number,
    fullmark:Number,
    test:String,
    subject:String,
    date:String
})
const marks =new mongoose.model("marks",markSchema)

const tests =new mongoose.model("tests",testSchema)

const classes= new mongoose.model("classes",classSchema)
const subjects = new mongoose.model("subjects",subjectSchema)
const admin=new mongoose.model("admin",adminSchema)
const teachers=new mongoose.model("teachers",teacherSchema)

const students=new mongoose.model("students",studentSchema)

module.exports={
    students,
    teachers,
    admin,
    subjects,
    tests,
    classes,
    marks
}
