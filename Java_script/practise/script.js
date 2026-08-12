// let h1 = document.querySelector("h1")
// h1.innerHTML = "<i>noor<i/>"
// console.dir(h1)

// let h2 = document.getElementById("01")
// console.dir(h2)

// let a = document.querySelector("a")
// // setattribute
// // getAttribute
// // removeAttribute
// console.dir(h3)

// dynamic Manupulation - creating tags of html

let h1 = document.createElement("h1")
h1.textContent = "hello"
document.querySelector("body").append(h1)
console.dir(h1)