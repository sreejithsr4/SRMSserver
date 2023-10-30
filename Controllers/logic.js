const { students, teachers, admin,tests,classes,subjects ,marks} = require('../Modal/collection')
const jwt = require('jsonwebtoken')

// register
register = (req, res) => {
    const { sid, name, age, cl,email, psw, pno,date } = req.body
    students.findOne({ sid }).then(user => {
        if (user) {

            res.status(400).json({
                message: "user already exists",
                status: false,
                statusCode: 400
            })
        }
        else {

            let newStudent = new students({
                sid,
                name,
                age,
                cl,
                pno,
                email,
                psw,
                status: false,
                date

            })

            newStudent.save()

            res.status(201).json({
                message: "account created successfully",
                status: true,
                statusCode: 201
            })
        }
    })

}
tregister = (req, res) => {
    const { tid, name, subject, tpsw,date } = req.body
    teachers.findOne({ tid }).then(tuser => {
        if (tuser) {

            res.status(400).json({
                message: "user already exists",
                status: false,
                statusCode: 400
            })
        }
        else {

            let newTeacher = new teachers({
                tid,
                name,
                subject,
                tpsw,
                status: false,
                date

            })

            newTeacher.save()

            res.status(201).json({
                message: "account created successfully",
                status: true,
                statusCode: 201
        
            })
        }
    })

}




login = (req, res) => {
    const { sid, psw } = req.body
    students.findOne({ sid, psw }).then(user => {
        if (user) {
            if (user.status == true) {

                res.status(200).json({
                    message: "login successfull",
                    status: true,
                    statusCode: 200,
                    id:user._id
                })
            }
            else {
                res.status(404).json({
                    message: "Account not validated",
                    status: false,
                    statusCode: 404
                })

            }



        }
        else {
            res.status(404).json({
                message: "incorrect id or password",
                status: false,
                statusCode: 404
            })
        }
    })
}

tlogin = (req, res) => {
    const { tid, tpsw } = req.body
    teachers.findOne({ tid, tpsw }).then(user => {
        if (user) {
            if (user.status == true) {
                res.status(200).json({
                    message: "login successfull",
                    status: true,
                    statusCode: 200,
                    id:user._id

                })

            }
            else {
                res.status(404).json({
                    message: "Account not validated",
                    status: false,
                    statusCode: 404
                })
            }


        }
        else {
            res.status(404).json({
                message: "incorrect id or password",
                status: false,
                statusCode: 404
            })
        }
    })
}
alogin = (req, res) => {
    const { uname, psw } = req.body
    admin.findOne({ uname, psw }).then(user => {
        if (user) {
            const token = jwt.sign({uname},"secretkey123")

            res.status(200).json({
                message: "login successfull",
                status: true,
                statusCode: 200,
                id:user._id,
                token
            })
        }
        else {
            res.status(404).json({
                message: "incorrect id or password",
                status: false,
                statusCode: 404
            })
        }
    })
}
supdate = (req, res) => {
    const { sid } = req.body
    students.findOne({ sid }).then(user => {
        if (user) {
            if (user.status == false) {
                user.status = true
                user.save()
                res.status(200).json({
                    message: "status activated",
                    status: true,
                    statuscde: 200
                })

            }
            else {
                res.status(404).json({
                    message: "status already active",
                    status: false,
                    statusCode: 404
                })
            }
        }
        else {
            res.status(404).json({
                message: "user not found",
                status: false,
                statusCode: 404
            })
        }


    })
}
studentData = (req, res) => {

    students.find().then(user => {
        if (user) {
            res.status(200).json({
                message: "student details accessed",
                status: true,
                statusCode: 200,
                user: user
            })
        }
        else {
            res.status(404).json({
                message: "error",
                status: false,
                statusCode: 404
            })
        }
    })
}
statusChange = (req, res) => {
    const { tid } = req.body
    teachers.findOne({ tid }).then(user => {
        if (user) {
            if (user.status == false) {
                user.status = true
                user.save()
                res.status(200).json({
                    message: "status activated",
                    status: true,
                    statuscde: 200
                })

            }
            else {
                res.status(404).json({
                    message: "status already active",
                    status: false,
                    statusCode: 404
                })
            }
        }
        else {
            res.status(404).json({
                message: "user not found",
                status: false,
                statusCode: 404
            })
        }


    })

}
teacherData = (req, res) => {

    teachers.find().then(user => {
        if (user) {
            res.status(200).json({
                message: "student details accessed",
                status: true,
                statusCode: 200,
                user: user
            })
        }
        else {
            res.status(404).json({
                message: "error",
                status: false,
                statusCode: 404
            })
        }
    })
}
editTeacher = (req, res) => {
 
    const { name, subject,id } = req.body
    teachers.findOne({ _id: id }).then(user => {
        if (user) {
            user.name = name
            user.subject = subject
            user.status=false
            user.save()
            res.status(200).json({
                message: "Teacher details updated",
                status: true,
                statusCode: 200,
            })

        }
        else {
            res.status(404).json({
                message: "user not found",
                status: false,
                statusCode: 404
            })
        }

    })
}
// single teacher data
tData = (req, res) => {
    const { id } = req.params

    teachers.findOne({ _id: id }).then(user => {
        if (user) {
            res.status(200).json({
                message: "teacher details accessed",
                status: true,
                statusCode: 200,
                user: user
            })
        }
        else {
            res.status(404).json({
                message: "error",
                status: false,
                statusCode: 404
            })
        }
    })
}

addmark = (req, res) => {
    const { tid, sid, mark, test,date,fullmark,subcode,subject } = req.body
    students.findOne({sid}).then(data=>{
        if(data){
            marks.findOne({tid,sid,test,subcode}).then(data=>{
                if(data){
                    res.status(401).json({
                                        message: "result already added",
                                        status: true,
                                        statuscode: 401
                                    })
                }
                else{
                    newMark= new marks({
                        tid,
                        sid,
                        test,
                        mark,
                        subcode,
                        date,
                        fullmark,
                        subject
                      
                    })
                    newMark.save()
                    res.status(200).json({
                                        message: "result added",
                                        status: true,
                                        statuscode: 200
                                    })
                }
            })
        }
        else{
            res.status(404).json({
                message: "student not found",
                status: false,
                statuscode: 404
            })
}
        }
   ) }

deleteteacher=(req,res)=>{
    const {tid}=req.params
    teachers.deleteOne({tid}).then(data=>{
        if(data){
            res.status(200).json({
                message:"Teacher Removed",
                status:true,
                statuscode:200
            })
        }
        else{
            res.status(404).json({message:"Teacher not found",
        status:false,
    statuscode:404})
        }
    })
}
addsubject=(req,res)=>{
    const {name,code,date}=req.body
    subjects.findOne({code}).then(data=>{
        if(data){
            res.status(401).json({
                message:"subject already added",
                status:false,
                statuscde:401
            })
        }
        else{
            let newSubject=new subjects({
                name,
                code,
                date

            })
            newSubject.save()
            res.status(200).json({
                message:"subject  added",
                status:true,
                statuscde:200
            })
        }
    })
}
getsubject=(req,res)=>{
    subjects.find().then(data=>{
        if(data){
            res.status(200).json({
                message:data,
                status:true,
                statuscde:200
            })
        }
    })
}
getonesubject=(req,res)=>{
    const {id}=req.params
    subjects.findOne({_id:id}).then(data=>{
        if(data){
            res.status(200).json({
                message:data,
                status:true,
                statuscde:200
            })
        }
        else{
            res.status(404).json({
                message:"not found",
                status:false,
                statuscde:404
            })
        }
    })
}
updatesubject=(req,res)=>{
    const {name,code,id}=req.body
    subjects.findOne({code}).then(sub=>{
        if(sub){
            res.status(404).json({
                message:"Subject Code Exists",
                status:false,
                statuscde:404
            })
        }
        else{
            subjects.findOne({_id:id}).then(data=>{
                if(data){
        
                    data.name=name
                    data.code=code
                    data.save()
                    res.status(200).json({
                        message:"updated",
                        status:true,
                        statuscde:404
                    })
                }
                else{
                    res.status(404).json({
                        message:"not found",
                        status:false,
                        statuscde:404
                    })
                }
            })
        }
        })
    }
addclass=(req,res)=>{
    const {name,numerical,division,date}=req.body
    classes.findOne({name,division}).then(data=>{
        if(data){
            res.status(401).json({
                message:"already exist",
                status:false,
                statuscde:404
            })
        }
        else{
            let newClass=new classes({
                name,
                numerical,
                division,
                date

            })
            newClass.save()
            res.status(200).json({
                message:"class added",
                status:true,
                statuscde:404
            })
        }
    })

}
classdata=(req,res)=>{
    classes.find().then(data=>{
        if(data){
            res.status(200).json({
                message:data,
                status:true,
                statuscde:200
            })
        }
        else{
            res.status(404).json({
                message:"not found",
                status:false,
                statuscde:404
            })
        }
    })

}


deleteclass=(req,res)=>{
    const {id}=req.params
    classes.deleteOne({_id:id}).then(data=>{
        res.status(200).json({
            message:"item deleted",
            status:true,
            statuscde:200
        })
    })
}
addtest = (req, res) => {
    const { name,des,date } = req.body
    tests.findOne({ name }).then(data => {
        if (data) {

            res.status(401).json({
                message: "already exists",
                status: false,
                statusCode: 401
            })

        }
        else {
            let newTest=new tests({
                name,
                des,
                date,
                status:false
            })
            newTest.save()
 
            res.status(200).json({
                message: "test added",
                status: false,
                statusCode: 200
            })

        }
    })


}
edittest = (req, res) => {
    const { id,name,des } = req.body
    tests.findOne({ _id:id }).then(data => {
        if (data) {
            marks.findOne({test:name}).then(item=>{
                if(item){
                    item.test=name
                    item.save()
                    res.status(200).json({
                        message: "Test Updated",
                        status: false,
                        statusCode: 200
                    })
                }
            })
            data.name=name
            data.des=des

            data.save()
            res.status(200).json({
                message: "Test Updated",
                status: false,
                statusCode: 200
            })
        }
        else {
            res.status(404).json({
                message: "not found",
                status: false,
                statusCode: 404
            })
        }
    })
}
testStatus = (req, res) => {
    const { id} = req.body
    tests.findOne({ _id:id }).then(data => {
        if (data) {
            if(data.status==false){
                data.status=true

                data.save()
                res.status(200).json({
                    message: "Test published",
                    status: false,
                    statusCode: 200
                })
            }
            else{
                res.status(404).json({
                    message: "Already published",
                    status: false,
                    statusCode: 404
                })
            }
  
        }
        else {
            res.status(404).json({
                message: "not found",
                status: false,
                statusCode: 404
            })
        }
    })
}

getTest=(req,res)=>{
    tests.find().then(data=>{
        res.status(200).json({
            message: data,
            status: true,
            statusCode: 200
        })
    })
}
getOneTest=(req,res)=>{
    const {id}=req.params
    tests.findOne({_id:id}).then(data=>{
        res.status(200).json({
            message: data,
            status: true,
            statusCode: 200
        })
    })
}
getMark=(req,res)=>{
    const {test}=req.params
    marks.find({test}).then(data=>{
        if(data){
            res.status(200).json({
                message: data,
                status: true,
                statusCode: 200
            })
        }
        else{
            res.status(404).json({
                message: "student not found",
                status: false,
                statusCode: 404
            })
        }
    })
}
deleteTest=(req,res)=>{
    const {name}=req.params
    tests.deleteOne({name}).then(data=>{
        marks.deleteMany({test:name}).then(mark=>{
            res.status(200).json({
                message: "Test deleted",
                status: true,
                statusCode: 200
            })
        })

            
              
            
            })
        }
   deleteStudent=(req,res)=>{
            const {sid}=req.params
            students.deleteOne({sid}).then(data=>{
                marks.deleteMany({sid}).then(data=>{
                    res.status(200).json({
                        message: "student deleted",
                        status: true,
                        statusCode: 200
                    })
                })
               
                })
    
                }
 getadmin=(req,res)=>{
            const {id}=req.params
            admin.findOne({_id:id}).then(data=>{
                if(data){
                    res.status(200).json({
                        message:data
                    })
                }
            })
          }
 updateAdmin=(req,res)=>{
            const {psw,uname}=req.body
            admin.findOne({uname}).then(data=>{
                if(data){
                    data.uname=uname
                    data.psw=psw
                    data.save()
                    res.status(200).json({
                        message: "Details Updated",
                        status: true,
                        statusCode: 200
                    })
                }

            })
          }
getOneMark=(req,res)=>{
    const {tid}=req.params
    marks.find({tid}).then(data=>{
        if(data){
            res.status(200).json({
                message:data,
                status:true,
                statuscode:200
            })
        }
        else{
            res.status(200).json({
                message:data,
                status:true,
                statuscode:200
        })
}})
}
updatemark=(req,res)=>{
    const {id,mark,fullmark}=req.body
    marks.findOne({_id:id}).then(data=>{
        if(data){
            data.mark=mark
            data.fullmark=fullmark
            data.save()
            res.status(200).json({
                message:"Score Updated",
                status:true,
                statuscode:200
        })
        }
    })
}
studentOneData=(req,res)=>{
    const {id}=req.params
    students.findOne({_id:id}).then(data=>{
        if(data){
            res.status(200).json({
                message:data,
                status:true,
                statuscode:200
        })
        }
    })
}
editStudent=(req,res)=>{
    const {age,cl,pno,id,email,psw}=req.body
    students.findOne({_id:id}).then(data=>{
        if(data){
            data.age=age
            data.cl=cl
            data.pno=pno
            data.email=email
            data.status=false
            data.save()
            res.status(200).json({
                message:"Student  Details updated",
                status:true,
                statuscode:200
        })
        }
    })
}
editStudentpsw=(req,res)=>{
    const {id,psw}=req.body
    students.findOne({_id:id}).then(data=>{
        if(data){
            data.psw=psw
 
            data.save()
            res.status(200).json({
                message:"Student Password updated",
                status:true,
                statuscode:200
        })
        }
    })
}
editTeacherpsw=(req,res)=>{
    const {id,tpsw}=req.body
    teachers.findOne({_id:id}).then(data=>{
        if(data){
            data.tpsw=tpsw
 
            data.save()
            res.status(200).json({
                message:"Teacher Password updated",
                status:true,
                statuscode:200
        })
        }
    })
}
deletemark=(req,res)=>{
    const {id}=req.params
    marks.deleteOne({_id:id}).then(data=>{
        res.status(200).json({
            message:"Score Deleted",
            status:true,
            statuscode:200
    })
    })

}
deletesubject=(req,res)=>{
    const {id}=req.params
    subjects.deleteOne({_id:id}).then(data=>{
        res.status(200).json({
            message:"Subject Deleted",
            status:true,
            statuscode:200
    })
    })
}
sidData=(req,res)=>{
    const {sid}=req.params
    students.findOne({sid}).then(data=>{
        if(data){
            res.status(200).json({
                message:data,
                status:true,
                statuscode:200
        })
        }
    })
}

        










module.exports = {
    register, tregister, login, tlogin, alogin,getadmin,updateAdmin,getOneMark,updatemark,getOneTest,deletemark,
    studentData, statusChange, teacherData, editTeacher, tData, edittest,studentOneData,editStudentpsw,sidData,
     addmark,deleteteacher,addtest,getTest,getMark,deleteTest,deleteStudent,editStudent,editTeacherpsw,
     supdate,addsubject,getsubject,getonesubject,updatesubject,addclass,classdata,deleteclass,testStatus,deletesubject
}