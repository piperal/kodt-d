const users = [
    { id: 1, name: "Mari", age: 22, active: true },
    { id: 2, name: "Jüri", age: 17, active: false },
    { id: 3, name: "Kati", age: 31, active: true },
    { id: 4, name: "Martin", age: 19, active: false },
    { id: 5, name: "Laura", age: 26, active: true }
]

//3.1 kõik nimed
console.log("3.1")
for (let user in users) {
    console.log(users[user].name)
}
console.log("")

//3.2 Aktiivsed kasutajad
console.log("3.2")
console.log(users.filter(user => user.active))
console.log("")

//3.3 Adult kasutajad
console.log("3.3")
console.log(users.filter(user => user.age >= 18))
console.log("")

//3.4 Ainult nimed
console.log("3.4")
console.log(users.map(user => user.name))
console.log("")

//3.5 Find
console.log("3.5")
console.log(users.find(user => user.id == 3))
console.log("")

//3.6
console.log("3.6")
function getUserStatus(user) {
    if (user != undefined) {
        if (user.active) {
            return "Aktiivne"
        }
        else {
            return "Mitteaktiivne"
        }
    }
    else {
        return "Ei ole kasutajat"
    }

}
console.log(getUserStatus(users[0]))
console.log("")

//3.7
console.log("3.7")
const getGreeting = (user) => {
    if (user != undefined) {
        return `Tere, ${user.name}! Sa oled ${user.age} aastat vana`
    }
    else {
        return "Ei ole kasutajat"
    }
}
console.log(getGreeting(users[0]))
console.log("")

//3.8
console.log("3.8")
let { name, age } = users[0]
console.log(name)
console.log("")

//3.9
console.log("3.9")
const uusKasutaja = { ...users[0], id: 6, name: "Karl", age: 24, active: true }
const uusArray = [...users, uusKasutaja]
console.log(uusArray)
console.log("")

//3.10
console.log("3.10")
users[0].address = { city: "Tallinn" }
for (let user in users) {
    console.log("Kasutaja linn on: ", users[user].address?.city ?? "Linn Puudub")
}
console.log("")
//3.11
console.log("3.11")
users.forEach(user => console.log(user.name, "-", user.active))
console.log("")

//3.12
console.log("3.12")
console.log(users.sort((a,b)=> a.age - b.age))
console.log("")