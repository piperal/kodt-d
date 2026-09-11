
//Esimesed 3 ei teinud, kuna ei ole näidis ülesandeid

//4. Strings and Template Literals

console.log("4. Strings and Template Literals")

let uusnimi = "       Roland  "

console.log("Algne nimi:", uusnimi)
console.log("Puhastatud nimi:", uusnimi.trim())

let tervitus = `Tervitused, ${uusnimi}!`
console.log(tervitus)
console.log("")

//5. Comparisons, Logical Operators, and Decisions

console.log("5. Comparisons, Logical Operators, and Decisions")

let vanusLogin = 21
let sisseLogitud = true

console.log("Kas vanus on 18 või rohkem:", vanusLogin >= 18)

if (vanusLogin >= 18 && sisseLogitud) {
    console.log("Tere tulemast!")
} else if (vanusLogin >= 18) {
    console.log("Palun logi sisse.")
} else {
    console.log("Sa oled liiga noor.")
}

let vanuseklass = vanusLogin >= 18 ? "Täiskasvanu" : "Alaealine"
console.log(vanuseklass)

console.log("")

//6. Numbers and the Math Object

console.log("6. Numbers and the Math Object")

// Juhuslik number 1-6
let täring = Math.floor(Math.random() * 6) + 1
console.log("Täringu tulemus:", täring)

console.log("")

//7. Arrays and Loops

console.log("7. Arrays and Loops")

let nimed = ["Roland", "Ragnard", "Joosep"]

console.log("Originaal nimed: ", nimed)
nimed.push("Evil Roland")
console.log("Uuendatud nimed: ", nimed)

for (const nimi of nimed) {
    console.log(nimi)
}

console.log("")

//8. Objects and Handling Missing Data

console.log("8. Objects and Handling Missing Data")

const kasutaja = {
    nimi: "Roland",
    vanus: 21,
    aadress: {
        linn: "Tallinn"
    }
}

console.log("Nimi:", kasutaja.nimi)
console.log("Vanus:", kasutaja["vanus"])
console.log("Linn:", kasutaja.aadress.linn)

console.log("Telefon:", kasutaja.telefon)

console.log("Tänav:", kasutaja.aadress?.linn)

let telefonNum = kasutaja.telefon ?? "Telefon puudub"
console.log("Telefon:", telefonNum)

console.log("")

//9. Functions: Reusable Behavior
//Ei olnud näidis ülesannet

console.log("9. Functions: Reusable Behavior")

console.log("")

console.log("Ei olnud näidis ülesannet")

console.log("")

//10. Arrow Functions and Callbacks

console.log("10. Arrow Functions and Callbacks")
const numbrid = [1, 2, 3]

numbrid.forEach(number => {
    console.log("Number:", number)
})

console.log("")

//11. Array Methods: map, filter, and find

console.log("11. Array Methods: map, filter, and find")

const tooted = [
    {nimi: "Laptop", hind: 1000},
    {nimi: "Telefon", hind: 500},
    {nimi: "Hiir", hind: 50}
]

// map muudab iga elementi
const toodeteNimed = tooted.map(toode => toode.nimi)
console.log("Toodete nimed:", toodeteNimed)

// filter valib mitu sobivat
const kallidTooted = tooted.filter(toode => toode.hind > 100)
console.log("Kallid tooted:", kallidTooted)

// find leiab esimese sobiva
const telefon = tooted.find(toode => toode.nimi === "Telefon")
console.log("Leitud telefon:", telefon)

console.log("")

//12. Destructuring and Spread Syntax

console.log("12. Destructuring and Spread Syntax")

console.log("")

console.log("Ei olnud näidis ülesannet")

console.log("")

//13. Modules: import and export

console.log("13. Modules: import and export")

export function helper(){
    console.log("Here to help")
}

//Ja teiises failis import {helper} from './naidisÜlesandes.js'

console.log("")

//14. Asynchronous JavaScript: Promises and async/await

console.log("14. Asynchronous JavaScript: Promises and async/await")

const lubadus = Promise.resolve("Andmed on saabunud!")

lubadus.then(andmed => {
    console.log(andmed)
})

async function saaAndmed() {
    const tulemus = await Promise.resolve("Andmed async/await abil!")
    console.log(tulemus)
}

saaAndmed()

console.log("")

//15. Fetching Data, JSON, and Error Handling

console.log("15. Fetching Data, JSON, and Error Handling")

console.log("")

console.log("Ei olnud näidis ülesannet")
