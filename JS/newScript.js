let fs=require('fs');

//Refrence Obfuscator module
let jsObfuscator=require('javascript-obfuscator');

//Read your JS file
fs.readFile('./script.js', 'utf-8', (error, code)=>{
if (error) throw error; //If there is any error while reading a file
let obfuscatedJs=jsObfuscator.obfuscate(code);

//Write obfuscatedjs file into new file

fs.writeFile('./mynewObfuscated.js', obfuscatedJs.getObfuscatedCode(), (isError)=>{
if (isError) return console.log(isError)

console.log("Obfuscated Successfully")

} )


})