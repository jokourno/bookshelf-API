const { nanoid } = require('nanoid')
const bookshelf = require('./bookshelf')

const addBookHandler = (request, h) => {
    const {name, year, author, summary, publisher,
    pageCount, readPage, reading} 
    = request.payload

    const id = nanoid(16)
    const finished = (pageCount === readPage)
    const insertedAt = new Date().toISOString()
    const updatedAt = insertedAt
    
    const newBook = {id, name, year, author, 
        summary, publisher, pageCount, readPage, 
        finished, reading, insertedAt, updatedAt}
    
    bookshelf.push(newBook)
    
    const isName = bookshelf.filter((n) => n.name === undefined)
    if(isName){
        const response = h.response({
            status: "Fail",
            message: "Gagal menambahkan buku. Mohon isi nama buku"
        })
        response.code(400)
        return response
    }

    const isPage = bookshelf.filter((n) => n.readPage > n.pageCount)
    if(isPage){
        const response = h.response({
            status: "Fail",
            message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
        })
        response.code(400)
        return response
    }
    
    const isSuccess = bookshelf.filter((n) => n.id === id).length > 0
    if(isSuccess){
        const  response = h.response({
            status: "Success",
            message: "Catatan berhasil ditambahkan",
            data: {
                bookId: id,
            }
        })
    }

    const response = h.response({
        status: "error",
        message: "Buku gagal ditambahkan"
    })
    response.code(500)
    return response
}

module.exports = {
    addBookHandler
}