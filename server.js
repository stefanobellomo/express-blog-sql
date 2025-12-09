const express = require('express')
const app = express()
const PORT = 3001
const connection = require('./database/db')
const postsRouter = require('./routers/posts')

app.use(express.static('public'))

app.use(express.json())

app.listen(PORT, () => {
    console.log(`app listening on port http://localhost:${PORT}`);
})

app.get('/', (req, res) => {
    res.send('welcome to my blog')
})

app.get('/api/posts', (req, res) => {
    const sql = 'SELECT * FROM posts'
    connection.query(sql, (err, response) => {
        if (err) return res.status(500).json({ err: true, message: err.message })
        res.json(response)
    })
})

app.use('/api/posts', postsRouter)