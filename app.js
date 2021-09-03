const express = require('express')
require('express-async-errors')
const app = express()

app.use(express.json())

const { getDb } = require('./db')

app.get('/todos', async (req, res, next) => {
    const { todos } = await getDb()
    res.status(200).json({
        code: 200,
        data: todos
    })
})

app.get('/todos/:id', async (req, res, next) => {
    const { id } = req.params
    const { todos } = await getDb()
    const todo = todos.find(todo => String(todo.id) === id) || null
    res.status(200).json({
        code: 200,
        data: todo
    })
})

app.post('/todos', (req, res) => {
    const data = req.body
    console.log(data)
    // const { todos } = await getDb()
})

app.patch('/todos/:id', (req, res) => {
    const { id } = req.params
    res.send('patch todos')
})

app.delete('/todos/:id', (req, res) => {
    const { id } = req.params
    res.send('delete todos')
})

app.use((err, req, res, next) => {
    if (err) {
        res.json({
            code: 500,
            msg: err.message
        })
    }
    next(err)
})

app.listen(3000, () => {
    console.log('服务已启动 http://localhost:3000/')
})