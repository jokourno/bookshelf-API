const { nanoid } = require('nanoid')
const books = require('./books')

const addBookHandler = (request, h) => {
    const {name, year, author, summary, publisher,
    pageCount, readPage, reading} 
    = request.payload
// request.payload adalah properti yang digunakan untuk mendapatkan body request di framework Hapi
// makna dari mendapatkan body request adalah sesuatu yang dikirim oleh client
    const id = nanoid(16)
// nanoid merupakan sebuah package atau library yang memberikan kemudahan untuk membuat id
    const finished = (pageCount === readPage)
// saat pageCount === readPage maka nilai finished menjadi true (boolean)
    const insertedAt = (new Date().toISOString()).slice(0,10)
// untuk mendapatkan tanggal
    const updatedAt = insertedAt
    
    const newBook = {id, name, year, author, 
        summary, publisher, pageCount, readPage, 
        finished, reading, insertedAt, updatedAt}
// newBook merupakan variabel yang digunakan untuk menyimpan hasil inputan dari client dan olahan lainnya
    if(!name){
        const response = h.response({
            status: "fail",
            message: "Gagal menambahkan buku. Mohon isi nama buku"
        })
        response.code(400)
        return response
    }
// maksud kode di atas:
// jika properti name tidak terdifinisi maka jalankan status, message, dan response code 
    if(readPage > pageCount){
        const response = h.response({
            status: "fail",
            message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
        })
        response.code(400)
        return response
    }
// maksud kode di atas:
// jika properti readPage lebih besar dari pageCount maka jalankan status, message, dan response code
    books.push(newBook)
// jika nama terdefinisi dan readPage lebih kecil atau sama dengan pageCount maka kirim data newBook ke books
// jadi ada 2 validasi terlebih dahulu sebelum data dikirim ke books
    const isSuccess = books.filter((n) => n.id === id).length > 0
// isSuccess akan bernilai boolean yaitu true atau false
// books difilter, untuk n, jika n pada id sama dengan id yang dimasukkan dengan jumlah karakter lebih dari 0
//      maka isSuccess bernilai true, dan jika tidak maka isSuccess bernilai false
    if(isSuccess){
        const response = h.response({
            status: "success",
            message: "Buku berhasil ditambahkan",
            data: {
                bookId: id,
            }
        })
        response.code(201)
        return response
    }
// saat isSuccess bernilai true maka jalankan kode di atas
    const response = h.response({
        status: "error",
        message: "Buku gagal ditambahkan"
    })
    response.code(500)
    return response
// jika isSuccess tidak berjalan atau isSuccess tidak bernilai true maka jalankan kode di atas
}

const getAllBookHandler = (request, h) => {
    const response = h.response({
        status: "success",
        data: {
            books: books.map((n) => ({
                id: n.id,
                name: n.name,
                publisher: n.publisher
// kode di atas melakukan map terhadap 12 properti dan hanya menampilkan
//  properti id, name, dan publisher
            }))
        }
    })
    response.code(200)
    return response
}


const getBookByIdHandler = (request, h) => {
    const { bookId } = request.params
// syntax request.params digunakan untuk mendapatkan id yang dikirim oleh client
    const book = books.map((n) => n.id === bookId)[0]
// book akan bernilai boolean
// dari books dilakukan map untuk n, dimana nilai id dalam n sama dengan id yang dikirim oleh client
//      jika itu benar maka akan bernilai true dan jika salah maka akan bernilai false
// karena book akan berbentuk array maka mengeluarkan nilai di dalamnya dengan indeks [0]
    if(book === true) {
        const n = books[0]
        const response = h.response({
            status: "success",
            data: {
                book:{
                    id: n.id,
                    name: n.name,
                    year: n.year,
                    author: n.author,
                    summary: n.summary,
                    publisher: n.publisher,
                    pageCount: n.pageCount,
                    readPage: n.readPage,
                    finished: n.finished,
                    reading: n.reading,
                    insertedAt: n.insertedAt,
                    updatedAt: n.updatedAt
                }
                }
            })
            response.code(200)
            return response
    }

// jika nilai book sama dengan true maka jalankan response di atas
    const response = h.response({
        status: "fail",
        message: "Buku tidak ditemukan"
    })
    response.code(404)
    return response    
// jika nilai book tidak sama dengan true otomatis jalankan response di atas
}

const editBookByIdHandler = (request, h) => {
    const { bookId } = request.params
// untuk mendapatkan id yang dikirim oleh client (dalam hal ini id data yang akan diubah)
    const { name, year, author, summary, publisher, 
    pageCount, readPage, reading} = request.payload
// request.payload merupakan muatan yang dilakukan client untuk mengubah data
//      berdasarkan id tadi
    const updatedAt = new Date().toISOString()
// ketika terjadi perubahan maka perlu dibuat tanggal perubahannya
// validasi nama
    if(!name){
        const response = h.response({
            status: "fail",
            message: "Gagal memperbarui buku. Mohon isi nama buku"
        })
        response.code(400)
        return response
    }
// validasi readPage > pageCount
    if(readPage>pageCount){
        const response = h.response({
            status: "fail",
            message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
        })
        response.code(400)
        return response
    }
// validasi id
    const index = books.findIndex((n) => n.id === bookId)
// maksud syntax di atas adalah:
// pada books lakukan pencarian indeks untuk n, saat id dalam n sama dengan id
// index akan berupa number, jika tidak ada maka bernilai -1, jika ada bernilai index id tersebut
    if((index !== -1) === true) {
        books[index] = {
            ...books[index],
// menuju data books dengan index yang didapatkan sebelumnya
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            updatedAt,
        }
        const response = h.response({
            status: "success",
            message: "Buku berhasil diperbarui"
        })
        response.code(200)
        return response
    }
// jika index tidak bernilai -1 atau dengan kata lain index ada maka jalankan kode di atas
    const response = h.response({
        status: "fail",
        message: "Gagal memperbarui buku. Id tidak ditemukan"
    })
    response.code(404)
    return response
// jika index bernilai -1 maka jalankan response di atas
}

const deleteBookByIdHandler = (request, h) => {
    const { bookId } = request.params
// request.params digunakan untuk mendapatkan id yang dikirim client (dalam hal ini akan dihapus)
    const index = books.findIndex((n) => n.id === bookId)
// pada books lakukan pencarian untuk n, id di dalam n harus identik dengan id yang dikirim client
// index akan bernilai -1 atau index dari id tersebut
    if((index !== -1) === true) {
        books.splice(index, 1)
        const response = h.response({
            status: "success",
            message: "Buku berhasil dihapus"
        })
        response.code(200)
        return response
    }

    const response = h.response({
        status: "fail",
        message: "Buku gagal dihapus. Id tidak ditemukan"
    })
    response.code(404)
    return response
}

module.exports = {
    addBookHandler,
    getAllBookHandler,
    getBookByIdHandler,
    editBookByIdHandler,
    deleteBookByIdHandler
}