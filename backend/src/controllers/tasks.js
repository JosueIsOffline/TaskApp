import { connect } from '../database'

export const getTasks = async (req, res) => {
    const connection = await connect()
    const [rows] = await connection.query('SELECT * FROM tasks')
    res.json(rows)
}

export const getTask = async (req, res) => {
    const connection = await connect()
    const [rows] = await connection.query('SELECT * FROM tasks WHERE id = ?', [
        req.params.id
    ])
    console.log(rows)
    res.json(rows[0])
}

export const getTaskCount = async (req, res) => {
    const connection = await connect()
    const [rows] = await connection.query('SELECT COUNT(*) FROM tasks')

    console.log(rows[0]["COUNT(*)"])
    res.json(rows[0]["COUNT(*)"])
}

export const saveTask = async (req, res) => {
    const connection = await connect()
    const [results] = await connection.query('INSERT INTO tasks (title, description) VALUES (?, ?)', [
        req.body.title,
        req.body.description
    ])
   
    res.json({
        id:results.insertId,
        ...req.body,
    })
}

export const deleteTask = async (req, res) => {
    const connection = await connect()
    await connection.query('DELETE FROM tasks WHERE id = ?', [
        req.params.id
    ])
    
    res.sendStatus(204)
}

export const updateTask = async (req, res) => {
    const connection = await connect()
    await connection.query('UPDATE tasks SET ? WHERE id = ?', [
        req.body,
        req.params.id
    ])
    res.sendStatus(204)
}