const express = require('express')
const { register, tregister, login, tlogin, alogin,
      studentData, statusChange, teacherData, editTeacher, tData,
      addmark, deleteteacher, supdate, getsubject, getonesubject,
      updatesubject, addclass, classdata, addtest, deleteclass, getTest,
      getMark, deleteTest, testStatus, deleteStudent, getadmin, updateAdmin, getOneMark, getOneTest, studentOneData, editStudent, editStudentpsw, editTeacherpsw, deletemark, deletesubject, sidData } = require('../Controllers/logic')
      const {jwtMiddleware}=require('../Middleware/jwtmiddleware')


const router = new express.Router()
router.post('/school/student/account_create', register)
router.post('/school/teacher/account_create', tregister)
router.post('/school/student/login', login)
router.post('/school/teacher/login', tlogin)
router.post('/school/admin/login', alogin)
router.get('/school/admin/students', studentData)
router.post('/school/admin/teacher/activate', statusChange)
router.get('/school/admin/teachers', teacherData)
router.put('/school/admin/teachers-edit', editTeacher)
router.get('/school/admin/teacher-data/:id', tData)
router.post('/school/admin/add-test',jwtMiddleware, addtest)
router.post('/school/admin/edit-test',jwtMiddleware,edittest)
router.post('/school/admin/mark-add', addmark)
router.delete('/school/admin/delete-teacher/:tid',jwtMiddleware, deleteteacher)
router.post('/school/admin/student/activate', supdate)
router.post('/school/admin/add-subject',jwtMiddleware, addsubject)
router.get('/school/admin/get-subject', getsubject)
router.get('/school/admin/getone-subject/:id', getonesubject)
router.post('/school/admin/update-subject',jwtMiddleware, updatesubject)
router.post('/school/admin/add-class',jwtMiddleware, addclass)
router.get('/school/admin/classdata', classdata)
router.delete('/school/admin/class/delete/:id',jwtMiddleware, deleteclass)
router.get('/school/teacher/get-test', getTest)
router.get('/school/result/get/:test', getMark)
router.delete('/school/admin/test/delete/:name',jwtMiddleware, deleteTest)
router.post('/school/admin/test/status',jwtMiddleware, testStatus)
router.delete('/school/admin/student/delete/:sid',jwtMiddleware, deleteStudent)
router.get('/school/admin/data/:id', getadmin)
router.put('/school/admin/update', updateAdmin)
router.get('/school/teacher/get-mark/:tid', getOneMark)
router.post('/school/teacher/update-mark', updatemark)
router.get('/school/admin/test/get/:id', getOneTest)
router.get('/school/student/data/:id',studentOneData)
router.post('/school/student/update',editStudent)
router.post('/school/student/psw/update',editStudentpsw)
router.post('/school/teacher/psw/update',editTeacherpsw)
router.delete('/school/teacher/mark/delete/:id',deletemark)
router.delete('/school/admin/subject/delete/:id',jwtMiddleware,deletesubject)
router.get('/school/mark/:sid',sidData)






module.exports = router