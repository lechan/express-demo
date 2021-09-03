const express = require('express')
// 引入express-async-error用来处理全局异常
require('express-async-errors')
const router = express.Router()

const { getDb, saveDb } = require('./db')

// 查询全部列表
router.get('/todos', async (req, res) => {
    const { todos } = await getDb()
    res.status(200).json({
        code: 200,
        data: todos
    })
})

// 查询某个id的数据
router.get('/todos/:id', async (req, res) => {
    const { id } = req.params
    const { todos } = await getDb()
    const todo = todos.find(todo => String(todo.id) === id) || null
    res.status(200).json({
        code: 200,
        data: todo
    })
})

// 创建数据
router.post('/todos', async (req, res) => {
    // 1.获取客户端提交的参数
    const todo = req.body
    // 2.数据验证
    if (!todo.title) {
        return res.status(422).json({
            code: 422,
            msg: 'The field title is required'
        })
    }
    // 3.数据验证通过，存储到db中
    const db = await getDb()
    const lastTodo = db.todos[db.todos.length - 1]
    const currentId = lastTodo ? lastTodo.id + 1 : 1
    todo.id = currentId
    db.todos.push(todo)
    await saveDb(db)
    // 4.发送响应
    res.status(201).json({
        code: 201,
        msg: 'create success',
        data: todo
    })
})

// 修改某个id的数据
router.patch('/todos/:id', async (req, res) => {
    // 1.获取表单数据
    const todo = req.body
    // 2.查找item
    const { id } = req.params
    const db = await getDb()
    const result = db.todos.find(todo => String(todo.id) === id)
    if (!result) {
        return res.status(404).json({
            code: 404,
            msg: 'Not find this id'
        })
    }
    // 合并item，并存储
    Object.assign(result, todo)
    await saveDb(db)
    // 4.发送响应
    res.status(200).json({
        code: 200,
        msg: 'edit success',
        data: result
    })
})

// 删除某个id的数据
router.delete('/todos/:id', async (req, res) => {
    const { id } = req.params
    const db = await getDb()
    const index = db.todos.findIndex(todo => String(todo.id) === id)
    if (index === -1) {
        return res.status(404).json({
            code: 404,
            msg: 'Not find this id'
        })
    }
    db.todos.splice(index, 1)
    await saveDb(db)
    res.status(200).json({
        code: 200,
        msg: 'delete success'
    })
})

// 在所有的中间件之后挂载错误处理中间件
// 全局处理async的异常
router.use((err, req, res, next) => {
    if (err) {
        res.status(500).json({
            code: 500,
            msg: err.message
        })
    }
    next(err)
})

module.exports = router