// const promiseOne = new Promise(function(resolve, reject) {
    
//     let dbConnected = true; // maan lo DB se response aaya
    
//     setTimeout(function() {
//         if(dbConnected) {
//             resolve("Data mil gaya! ✅");   // .then() chalega
//         } else {
//             reject("DB down hai ❌");       // .catch() chalega
//         }
//     }, 1000);
// });

// promiseOne
//     .then(function(data) {
//         console.log(data);  // "Data mil gaya! ✅"
//     })
//     .catch(function(error) {
//         console.log(error); // "DB down hai ❌"
//     });
// ```

// ---

// ## Poora Flow ek nazar mein
// ```
// new Promise() → PENDING STATE
//       |
//       | (1 second baad)
//       |
//    resolve()  →  FULFILLED  →  .then() chalta hai
//       ya
//    reject()   →  REJECTED   →  .catch() chalta hai

/////////////////////////////#######################//////////////
// new Promise(function(resolve, reject){
//   setTimeout(function(){
//     console.log('Async task 2');
//     resolve()
//   }, 1000)
// }).then(function(){
//     console.log("Async 2 is resolved");
// })
// ```

// ### Real Life: **OTP Login**
// ```
// Phone number daala
//       ↓
// [1 second baad] OTP aaya  → console: "Async task 2"
//       ↓
// OTP verify hua (resolve)
//       ↓
// .then() chala             → console: "Async 2 is resolved"

/////////////////////////////////////////////////////////////////////
// Nayi cheez yahan: Promise ko variable mein save nahi kiya, seedha .then() chain kar diya
// Yeh dono same hain ✅

// // Tarika 1 - Variable mein save karke
// const p = new Promise(...);
// p.then(...)

// // Tarika 2 - Seedha chain (Promise 2 wala style)
// new Promise(...).then(...)
///////////////////////////////////////////////////////////////////////////////
// const promiseThree = new Promise(function(resolve, reject){
//     setTimeout(function(){
//         resolve({ username: "Ankit", email: "royaarayan@gmail.com" })
//         //        ↑ is baar data pass kiya resolve mein
//     }, 1000)
// })

// promiseThree.then(function(data){
//     //                  ↑ jo resolve() mein diya, wahi yahan milta hai
//     console.log(data);  // { username: "Ankit", email: "..." }
// })
// ```

// ### Real Life: **Amazon Order Track Karna**
// ```
// Order kiya (Promise banaya)
//       ↓
// [Processing...]
//       ↓
// resolve({
//     orderId: "AMZ123",
//     status: "Delivered",
//     item: "Headphones"
// })
//       ↓
// .then(function(orderDetails){
//     console.log(orderDetails.status) // "Delivered"
//     console.log(orderDetails.item)   // "Headphones"
// })
//////////////////////////////////////////////////////////////////////////////////////
// Doctor ne blood test likha  →  Promise bana
//         ↓
// Lab mein sample gaya        →  Async task (setTimeout)
//         ↓
// Result aaya...
//    ├── Sab theek hai  →  resolve() → .then()
//    └── Kuch gadbad   →  reject()  → .catch()
//         ↓
// Report de di (chahe kuch bhi ho) → .finally()
//////////////////////////////////////////////////////////////////////////
// promiseFour
//     .then((user) => {
//         console.log(user.username);  // "Ankit"
//         // ⚠️ return nahi kiya!
//     })
//     .then((username) => {
//         console.log(username);       // undefined ← yahan problem hai
//     })
//     .catch((error) => {
//         console.log("error");
//     })
//     .finally(() => {
//         console.log("Promise is either resolved or rejected");
//     })
// ```

// ### Chaining ka Rule — PIPE System 🔧
// ```
// .then() jo return kare → wahi agli .then() ko milta hai

// .then((user) => {
//     console.log(user.username);  // "Ankit" print hua
//     // return nahi kiya → undefined jaayega aage
// })
// .then((username) => {
//     console.log(username);  // undefined ← kyunki pehle wale ne return nahi kiya
// })

// RIGHT WAY////////////////////////////////////
// promiseFour
//     .then((user) => {
//         console.log(user.username);  // "Ankit"
//         return user.username;        // ← return kiya tab aage jayega
//     })
//     .then((username) => {
//         console.log(username);       // "Ankit" ✅ ab milega
//     })
//     .catch((error) => {
//         console.log("error");
//     })
//     .finally(() => {
//         console.log("Promise is either resolved or rejected");
//     })

///////////////////////////////////////////////////////////////////////////////
// .finally(() => {
//     console.log("Promise is either resolved or rejected");
// })
// ```

// ### Real Life: **Hospital Reception**
// ```
// Chahe test normal aaye  (resolve) ✅
// ya
// Chahe test abnormal aaye (reject) ❌

// Reception wala hamesha bolta hai:
// → "Aapki report ready hai, please collect karein"  ← finally()
// ```
// ```
// Resolve hua:
// .then() ✅ → .catch() SKIP → .finally() ✅

// Reject hua:
// .then() SKIP → .catch() ✅ → .finally() ✅

// Finally HAMESHA chalta hai, no matter what.
// ```

// ---

// ## Poora Flow Chart
// ```
//                     new Promise()
//                          |
//                     [1 sec baad]
//                     error = ?
//                     /          \
//                false            true
//                 /                  \
//           resolve()             reject()
//               |                     |
//            .then()               .then()
//           CHALTA HAI             SKIP hoga
//               |                     |
//            .then()               .catch()
//           (return karo!)        CHALTA HAI
//               |                     |
//            .catch()              .finally()
//            SKIP hoga             CHALTA HAI
//               |
//            .finally()
//            CHALTA HAI

//////////////////////////////////////////////////////////////////////////////////////////////
// Async/Await — Poori Detail mein

// Pehle Samjho: Async/Await Kya Hai?
// Async/Await .then() ka hi dusra tarika hai — andar se same kaam karta hai, bas likhne ka style alag hai.

// .then() style:        Swiggy app khola
//                            ↓ .then()
//                       Order place kiya
//                            ↓ .then()
//                       Delivery aai
//                            ↓ .then()
//                       Khana mila

// async/await style:    Swiggy app khola
//                       ORDER KA WAIT KARO...  ← await
//                       Delivery aai
//                       DELIVERY KA WAIT KARO... ← await  
//                       Khana mila


// const promiseFive = new Promise(function(resolve, reject){
//     setTimeout(function(){
//         let error = false;

//         if(!error){
//             resolve({username: "javascript", hot: "Don"})
//         } else {
//             reject('ERROR: JS WENT WRONG')
//         }
//     }, 1000)
// })

// async function consumePromiseFive() {
//     const response = await promiseFive
//     //     ↑                  ↑
//     // result yahan aaya   "ruko jab tak resolve na ho"
    
//     console.log(response); // { username: "javascript", hot: "Don" }
// }

// consumePromiseFive();
// ```
// ```
// Flow:
// consumePromiseFive() call hui
//         ↓
// await promiseFive → "ruko..." ⏳
//         ↓
// [1 second baad resolve hua]
//         ↓
// response = { username: "javascript", hot: "Don" }
//         ↓
// console.log(response) ✅

///////////////////////////////////////////////////////////////////////////
// Part 2 — try/catch ke saath (Sahi Tarika) ✅

// async function consumePromiseFive() {
//     try {
//         // yeh sab try karo
//         const response = await promiseFive
//         console.log(response);

//     } catch(error) {
//         // kuch bhi galat hua toh yahan aao
//         console.log(error);
//     }
// }

// consumePromiseFive();
////////////////////////////////////////////////////////////////////////
// async function atmTransaction() {
//     try {
//         const balance = await checkBalance()    // "ruko, check kar rahe hain"
//         const cash    = await withdrawMoney()   // "ruko, paise nikal rahe hain"
//         console.log("Paise mil gaye:", cash)    // ✅ sab theek

//     } catch(error) {
//         console.log("Transaction failed:", error)
//         // ❌ error aaya — insufficient balance, card block, etc.
//     }
// }
// ```
// ```
// error = false:                    error = true:
//      ↓                                 ↓
//    try block                        try block
//      ↓                                 ↓
// await → resolve ✅               await → reject ❌
//      ↓                                 ↓
// console.log(response)           try se BAHAR nikla
//      ↓                                 ↓
// catch → SKIP ⏭️                  catch(error) ✅
//                                        ↓
//                                  console.log(error)

////////////////////////////////////////////////////////////////////////////////////////////
// async function getAllUsers() {
//     try {
//         const response = await fetch('https://jsonplaceholder.typicode.com/users')
//         //                      ↑
//         //              Raw HTTP response aata hai — data nahi seedha
        
//         console.log(response)
//         // Response { status: 200, ok: true, ... } ← yeh data nahi hai
        
//         const data = await response.json()
//         //                  ↑
//         //          JSON convert hone mein bhi time lagta hai — isliye await
        
//         console.log(data)
//         // ✅ ab actual users array milega

//     } catch(error) {
//         console.log("E:", error)
//         // internet nahi, wrong URL, server down — sab yahan pakda jaayega
//     }
// }

// getAllUsers()
// ```

// ### 2 Step Kyun? — Sabse Common Confusion 🤔
// ```
// fetch() kya laata hai?
//         ↓
//    Raw Response (envelope)
//    { status: 200, headers: {...}, body: Stream... }
//         ↓
//    .json() se kholo envelope ko
//         ↓
//    Actual Data (letter) ← yahi chahiye tha humein
//    [ {id:1, name:"Ankit"}, {id:2, ...} ]
// ```

// ### Real Life: **Speed Post**
// ```
// fetch()        →  Postman ne envelope deliver kiya  📬
// response.json() →  Envelope khola, letter padha      📄
// data           →  Actual message mila               ✅

////////////////////////////////////////////////////////////////////////////////////////////
// Part 4 — Same Kaam .then() se
// Async/Await style
// async function getAllUsers() {
//     const response = await fetch('https://jsonplaceholder.typicode.com/users')
//     const data = await response.json()
//     console.log(data)
// }

// // .then() style — SAME KAAM
// fetch('https://jsonplaceholder.typicode.com/users')
//     .then((response) => {
//         return response.json()   // envelope khola, aage bheja
//     })
//     .then((data) => {
//         console.log(data)        // actual data mila
//     })
// ```
// ```
// Dono ka output bilkul same hoga ✅
// Bas likhne ka style alag hai
// ```

// ---

// ## Poora Comparison
// ```
// .then()                          async/await
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// fetch(url)                       const res  = await fetch(url)
//   .then(res => res.json())       const data = await res.json()
//   .then(data => console.log())   console.log(data)
//   .catch(err => console.log())   } catch(err) { console.log() }