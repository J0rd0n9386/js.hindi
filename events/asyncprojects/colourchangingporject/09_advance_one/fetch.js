// Tum (Browser)        Waiter (fetch)         Kitchen (Server/API)
//       |                    |                       |
//       |  "Mujhe pasta      |                       |
//       |   chahiye"  ──────▶|                       |
//       |                    |  Order le gaya ──────▶|
//       |                    |                       | [khana ban raha hai...]
//       |                    |◀────── Khana ready ───|
//       |◀─── Khana laya ────|                       |
//       |                    |                       |
//    console.log(data)


// fetch Kya Hai?Browser ka built-in function jo server se data maangne ke liye use hota hai. Waiter ki tarah — 
// jo tumhara order (request) server tak le jaata hai aur response wapas laata hai.

/////////////////////////////////////////////////////////////////////////////////

// fetch('https://jsonplaceholder.typicode.com/users')
//     .then((response) => {
//         // STEP 1 — Envelope aaya
//         console.log(response.status)  // 200
//         console.log(response.ok)      // true
//         // response.body abhi bhi stream mein hai — data nahi mila abhi
        
//         return response.json()        // envelope kholo → yeh bhi Promise return karta hai
//     })
//     .then((data) => {
//         // STEP 2 — Actual data mila
//         console.log(data)             // ✅ users array
//     })
// ```

// ### Speed Post Analogy
// ```
// fetch()          →  Postman ne envelope deliver kiya  📬
// response         →  Envelope mila (band)              📭
// response.json()  →  Envelope khola, letter padha      📄
// data             →  Actual content mila               ✅
// ```

// ---

// ## Status Codes
// ```
// 200 → "Lo aapka data" ✅
// 201 → "Naya data create ho gaya" ✅
// 400 → "Request galat bheji" ❌
// 401 → "Pehle login karo" 🔒
// 403 → "Permission nahi hai" 🚫
// 404 → "Yeh cheez exist nahi karti" ❌
// 500 → "Server mein problem hai" 💥

//////////////////////////////////////////////////////////////////
// response.ok Kya Hai?
// javascriptresponse.ok = true   // status 200-299 → sab theek
// response.ok = false  // status 400, 404, 500 → kuch gadbad

// if(!response.ok){
// //  ↑ "agar OK NAHI hai" → !false = true → andar jaao
//     throw new Error("Kuch gadbad: " + response.status)
// }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ⚠️ fetch 404/500 pe KHUD reject nahi karta — manually check karo
// async function getUser() {
//     try {
//         const response = await fetch('https://jsonplaceholder.typicode.com/users/9999')

//         if(!response.ok){
//             throw new Error("Error: " + response.status)  // manually throw karo
//         }

//         const data = await response.json()
//         console.log(data)

//     } catch(error) {
//         console.log(error)  // network error + manually thrown error — dono yahan aayenge
//     }
// }
// ```

// ### Kab .catch() khud chalta hai?
// ```
// Internet band hai       →  .catch() apne aap ✅
// Wrong URL               →  .catch() apne aap ✅
// Server completely down  →  .catch() apne aap ✅

// 404 Not Found           →  .catch() NAHI chalta ❌ — if(!response.ok) karo
// 500 Server Error        →  .catch() NAHI chalta ❌ — if(!response.ok) karo
// ```

// ---

// ## Poora Flow Chart
// ```
// fetch(url) call kiya
//         ↓
//    Request server ko gayi  [PENDING ⏳]
//         ↓
//    ┌─────────────────────────────────┐
//    │ Network Error?                  │
//    │  Haan → .catch() ❌             │
//    │  Nahi → .then() mein jaao ✅    │
//    └─────────────────────────────────┘
//         ↓
//    response.ok check karo
//    ┌─────────────────────────────────┐
//    │ ok = false (404, 500)?          │
//    │  Haan → throw new Error         │
//    │       → .catch() ❌             │
//    │ ok = true (200)?                │
//    │  Haan → response.json() ✅      │
//    └─────────────────────────────────┘
//         ↓
//    response.json() [PENDING ⏳]
//         ↓
//    Actual data mila ✅
//         ↓
//    console.log(data)

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

# `fetch` in JavaScript — Complete Revision Notes

---

## fetch Kya Hai?

Browser ka built-in function jo **server se data maangne** ke liye use hota hai. Waiter ki tarah — tumhara order (request) server tak le jaata hai aur response wapas laata hai.

---

## Basic Syntax

```javascript
fetch('URL')
    .then(response => response.json())   // envelope kholo
    .then(data => console.log(data))     // actual data use karo
    .catch(error => console.log(error))  // error handle karo
```

---

## fetch 2 Steps mein Kaam Karta Hai

```javascript
fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => {
        // STEP 1 — Envelope aaya
        console.log(response.status)  // 200
        console.log(response.ok)      // true
        // response.body abhi bhi stream mein hai — data nahi mila abhi
        
        return response.json()        // envelope kholo → yeh bhi Promise return karta hai
    })
    .then((data) => {
        // STEP 2 — Actual data mila
        console.log(data)             // ✅ users array
    })
```

### Speed Post Analogy
```
fetch()          →  Postman ne envelope deliver kiya  📬
response         →  Envelope mila (band)              📭
response.json()  →  Envelope khola, letter padha      📄
data             →  Actual content mila               ✅
```

---

## Status Codes

```
200 → "Lo aapka data" ✅
201 → "Naya data create ho gaya" ✅
400 → "Request galat bheji" ❌
401 → "Pehle login karo" 🔒
403 → "Permission nahi hai" 🚫
404 → "Yeh cheez exist nahi karti" ❌
500 → "Server mein problem hai" 💥
```

---

## response.ok Kya Hai?

```javascript
response.ok = true   // status 200-299 → sab theek
response.ok = false  // status 400, 404, 500 → kuch gadbad

if(!response.ok){
//  ↑ "agar OK NAHI hai" → !false = true → andar jaao
    throw new Error("Kuch gadbad: " + response.status)
}
```

---

## 4 Types — CRUD Operations

### 1. GET — Data Maango
```javascript
fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
```

### 2. POST — Naya Data Bhejo
```javascript
fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'  // "main JSON bhej raha hoon"
    },
    body: JSON.stringify({                  // JS object → JSON string
        username: "Ankit",
        email: "ankit@gmail.com"
    })
})
    .then(response => response.json())
    .then(data => console.log("Bana:", data))
```

### 3. PUT — Data Update Karo
```javascript
fetch('https://jsonplaceholder.typicode.com/users/1', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        username: "Ankit Updated",
        email: "new@gmail.com"
    })
})
    .then(response => response.json())
    .then(data => console.log("Updated:", data))
```

### 4. DELETE — Data Hatao
```javascript
fetch('https://jsonplaceholder.typicode.com/users/1', {
    method: 'DELETE'
})
    .then(response => {
        if(response.ok) console.log("Delete ho gaya ✅")
    })
```

---

## .then() vs async/await

```javascript
// .then() style
fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))


// async/await style — same kaam, zyada readable
async function getUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const data     = await response.json()
        console.log(data)
    } catch(error) {
        console.log(error)
    }
}
getUsers()
```

---

## Error Handling — Important ⚠️

```javascript
// ⚠️ fetch 404/500 pe KHUD reject nahi karta — manually check karo
async function getUser() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/9999')

        if(!response.ok){
            throw new Error("Error: " + response.status)  // manually throw karo
        }

        const data = await response.json()
        console.log(data)

    } catch(error) {
        console.log(error)  // network error + manually thrown error — dono yahan aayenge
    }
}
```

// ### Kab .catch() khud chalta hai?

// Internet band hai       →  .catch() apne aap ✅
// Wrong URL               →  .catch() apne aap ✅
// Server completely down  →  .catch() apne aap ✅

// 404 Not Found           →  .catch() NAHI chalta ❌ — if(!response.ok) karo
// 500 Server Error        →  .catch() NAHI chalta ❌ — if(!response.ok) karo
// ```

// ---

// ## Poora Flow Chart

// ```
// fetch(url) call kiya
//         ↓
//    Request server ko gayi  [PENDING ⏳]
//         ↓
//    ┌─────────────────────────────────┐
//    │ Network Error?                  │
//    │  Haan → .catch() ❌             │
//    │  Nahi → .then() mein jaao ✅    │
//    └─────────────────────────────────┘
//         ↓
//    response.ok check karo
//    ┌─────────────────────────────────┐
//    │ ok = false (404, 500)?          │
//    │  Haan → throw new Error         │
//    │       → .catch() ❌             │
//    │ ok = true (200)?                │
//    │  Haan → response.json() ✅      │
//    └─────────────────────────────────┘
//         ↓
//    response.json() [PENDING ⏳]
//         ↓
//    Actual data mila ✅
//         ↓
//    console.log(data)
// ```

// ---

// // ## Quick Reference Table

// // | Cheez | Matlab |
// // |-------|--------|
// // | `fetch(url)` | GET request bhejo — default method |
// // | `response` | Envelope — data abhi band hai |
// // | `response.json()` | Envelope kholo — actual data nikalo |
// // | `response.status` | 200, 404, 500 etc. |
// // | `response.ok` | true = 200-299, false = baaki sab |
// // | `!response.ok` | "agar OK nahi hai" |
// // | `throw new Error()` | Manually .catch() mein bhejo |
// // | `method: 'POST'` | Default GET hai — baaki explicitly likho |
// // | `JSON.stringify()` | JS Object → JSON String (POST/PUT mein body ke liye) |
// // | `Content-Type` | Server ko batao ki main JSON bhej raha hoon |
// // | `await response.json()` | Yeh bhi async hai — await lagana mat bhoolo |