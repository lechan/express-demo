const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

const dbPath = path.join(__dirname, './db.json')
const encoded = 'utf8'

exports.getDb = async () => {
    const data = await readFile(dbPath, encoded)
    return JSON.parse(data)
}

exports.saveDb = async db => {
    const data = JSON.stringify(db, null, '    ') // 缩进4个空格
    await writeFile(dbPath, data)
}