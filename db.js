const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

const readFile = promisify(fs.readFile)
const dbPath = path.join(__dirname, './db.json')
const encoded = 'utf8'

exports.getDb = async (next) => {
    const data = await readFile(dbPath, encoded)
    return JSON.parse(data)
}