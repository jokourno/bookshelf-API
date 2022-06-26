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

console.log(typeof(idIs))
console.log(typeof(idIsNot))
console.log(idIs)
console.log(idIsNot)
console.log(hasil)
console.log(index)

if(index !== -1){
    console.log(index)
}

console.log(typeof(index !== -1))