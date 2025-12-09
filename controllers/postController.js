// const posts = require('../database/blog.sql')
const connection = require('../database/db')

function index(req, res) {



    // const tags = req.query.tags;

    // let filteredTags = posts

    // if (tags) {
    //     filteredTags = posts.filter(post => post.tags.includes(tags))
    //     console.log(filteredTags);
    // }

    // res.json(filteredTags)
}

function show(req, res) {

    const id = req.params.id

    const postSql = 'SELECT * FROM posts WHERE id = ?'
    const tagsSql = 'SELECT tags.label FROM tags JOIN post_tag ON post_tag.tag_id = tags.id WHERE post_tag.post_id = ?'
    connection.query(postSql, [id], (err, results) => {
        if (err) return res.status(500).json({ err: true, message: err.message })
        if (results.length === 0) return res.status(404).json({ err: true, message: err.message })
        // res.json(results[0])
        const post = results[0]
        connection.query(tagsSql, [id], (err, results) => {
            if (err) return res.status(500).json({ err: true, message: err.message })
            post.tags = results
            res.json(post)
        })
    })

    // const id = Number(req.params.id)
    // const post = posts.find((post) => (id === post.id))

    // // se non trovi il post...
    // if (!post) {
    //     return res.status(404).json({
    //         error: true,
    //         message: 'Post not found'
    //     })
    // }

    // res.json(post)
}

function store(req, res) {

    // const postData = req.body
    // const newId = posts[posts.length - 1].id + 1

    // const newPost = {
    //     id: newId,
    //     title: postData.title,
    //     content: postData.content,
    //     image: postData.image,
    //     tags: postData.tags,
    // }

    // posts.push(newPost)
    // res.json(newPost)

}

function update(req, res) {

    // const postData = req.body
    // const id = Number(req.params.id)
    // const post = posts.find((post) => (id === post.id))

    // if (!post) {
    //     return res.status(404).json({
    //         error: true,
    //         message: 'Not found!'
    //     })
    // }
    // post.title = postData.title
    // post.content = postData.content
    // post.image = postData.image
    // post.tags = postData.tags

    // res.json(post)
}

function modify(req, res) {
    // const id = Number(req.params.id)
    // const post = posts.find((post) => (id === post.id))

    // res.send(`aggiornare  qualche elemento del post con id: ${req.params.id}`)
}

function destroy(req, res) {

    const { id } = req.params;
    console.log(req.params);


    connection.query('DELETE FROM posts WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ err: true, message: err.message })
        res.sendStatus(204)
    })

    // const id = Number(req.params.id)
    // const post = posts.find((post) => (id === post.id))

    // if (!post) {
    //     return res.status(404).json({
    //         error: true,
    //         message: 'Not found!'
    //     })
    // }

    // posts.splice(posts.indexOf(post), 1)

    // res.sendStatus(204)
    // res.json(post)

}

module.exports = { index, show, store, update, modify, destroy }