// const promiseOne = new Promise(function (resolve, reject){
//     // Do an Async task
//     // DB calls, API calls, File read or write cryptography
//   setTimeout(function(){
//     console.log('Async task is complete');
//     resolve()  //ye connection karta hai neeche wale then ko
//   },1000)
// })

// // promiseOne.then(function(){
// //     console.log('promise consumed');
    
// // })

// // new Promise(function(resolve, reject){
// //   setTimeout(function(){
// //     console.log('Async task 2');
// //     resolve()
// //   }, 1000)
// // }).then(function(){
// //     console.log("Async 2 is resolved");
// // })

// // const promiseTHree = new Promise(function(resolve,reject){
// //      setTimeout(function () {
// //         resolve({username: "Ankit", Email: 'royaarayan@gmail.com'})
// //      },1000)
// // })
// // promiseTHree.then(function(){
// // console.log("here");
// // console.log(promiseTHree);

// // })


// const promiseFour = new Promise(function(reslove, reject){
//     setTimeout(function(){
//     let error = true
//     if (!error) {
//         resolve({username: "Ankit",Email:"royaarayan@gmail.com"})
        
//     }else{
//         reject("Something is wrong")
//     }  },1000)
// })

// const promiseFour = new Promise(function(resolve, reject){
//     setTimeout(function(){
//         let error = false;  // change here

//         if (!error) {
//             resolve({username: "Ankit", Email:"royaarayan@gmail.com"});
//         } else {
//             reject("Something is wrong");
//         }

//     },1000);
// });

// promiseFour
// .then(function(user){
//     console.log(user);  // actual object print hoga
// })
// .catch(function(error){
//     console.log(error);
// });

//  const promiseFour = new Promise(function (resolve, reject) {
//         setTimeout(function () {
//             let error = false;  // change here

//             if (!error) {
//                 resolve({ username: "Ankit", Email: "royaarayan@gmail.com" });
//             } else {
//                 reject("Something is wrong");
//             }

//         }, 1000);
//     });

//     promiseFour
//         .then(function (user) {
//             console.log(user);  // actual object print hoga
//         })
//         .catch(function (error) {
//             console.log(error);
//         });

//          promiseFour
//          .then((user) => {
//         console.log(user.username);
//         return user.username
         
        
//     }).then((username)=>{
//         console.log((username));
        
//     }).catch((error)=>{
//         console.log("error");
        
//     })
//         .finally(()=>{
//         console.log("the promise is either reesolved or rejected");
        
//     })


//     const promiseFive = new Promise(function(resolve,reject){
//     setTimeout(function(){
//         let error = false
//         if (!error) {
//             resolve({username:"javascript", hot: "Don"})
//         }
//         else{
//             reject('ERROR: JS WENT WRONG')
//         }
//     },1000)
// })
//   // promise ko async await ke through call kraa rather than .then or .catch ke through
// async function consumepromiseFive() {
//   const response = await promiseFive
//   console.log(response);
// }

// consumepromiseFive();

// async function consumepromiseFive()
// try {
//   const response = await promiseFive
//   console.log(response);
  
// } catch (error) {
//   console.log(error);
  
// }
// consumepromiseFive()

// async function getallUsers() {
//     try {
//         const response = await fetch('https://jsonplaceholder.typicode.com/users')
//         console.log(response);
        
//         const data = response.json()
//         console.log(data)

//     } catch (error) {
//         console.log("E:", error) 


//     }
// }
// getallUsers()

// another way of writing 

fetch('https://jsonplaceholder.typicode.com/users')
.then((response) =>{
return response.json()
})
.then((data)=>{
    console.log(data);
    
})


