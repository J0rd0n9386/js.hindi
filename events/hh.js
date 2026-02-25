// for each loop

// const coding = ["js", "ruby", "java", "python", "cpp"]

// coding.forEach(function (item) {
//     console.log(item); // isme 5 ek saaath pura print goga 5 baar but agr item likhe to ek ek krke 

// }

// )

const mycoding = [
    {
        LanguageName: "Javascript",
        LanguageFilename: "js"
    },
    {
        LanguageName: "Python",
        LanguageFilename: "py"
    },
    {
        LanguageName: "java",
        LanguageFilename: "java"
    }
]

mycoding.forEach(function (item) {
    console.log(item.LanguageFilename);

}

)