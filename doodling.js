const data = [
    {
        "id": "BpWIWs50O-AwyWJu",
        "name": "Buku A",
        "publisher": "Dicoding Indonesia"
    }
]

const idIs = data.map((n) => n.id === "BpWIWs50O-AwyWJu")[0]
const idIsNot = data.map((n) => n.id !== 113130013)[0]
const hasil = (idIs !== true)
const isSuccess = data.filter((n) => n.id === "BpWIWs50O-AwyWJu" ).length > 0
const index = data.findIndex((n) => n.id === "BpWIWs50O-AwyWJu")

// console.log(typeof(idIs))
// console.log(typeof(idIsNot))
// console.log(idIs)
// console.log(idIsNot)
// console.log(hasil)
// console.log(index)



const tes = [
    {
        nama: "fulan abc",
        umur: 14,
        reading: false
    },
    {
        nama: "abid",
        umur: 13,
        reading: true
    },
    {
        nama: "Fulan",
        umur: 15,
        reading: true
    }
]

const list = tes.filter((n) => n.nama.toLowerCase() === "Fulan".toLowerCase())
const tampil = list.map((n) => ({
    umur: n.umur,
    nama: n.nama
}))
const bookRead = tes.filter((n) => n.reading === true )


const array = tes.filter((n) => n.nama.toLowerCase().includes("fulan".toLowerCase()))



console.log(array)