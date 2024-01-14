const ejs = require('ejs');
const fs = require('fs');
const path = require("path");


const websiteURL = "https://www.healer-ji.com";
const websiteName = "Healer-Ji";
const supportEmail = "healerji.company@gmail.com";
const adminMail = "adi22maurya@gmail.com";
const phoneno = "+91 7644887997";

const currentDirectory = path.resolve(__dirname);
console.log("Current Directory:", currentDirectory);
const template = fs.readFileSync(`${currentDirectory}/userWelcome.ejs`, "utf-8");

const data = {
   userName: "John Doe",
   websiteURL: websiteURL,
   phoneno: "123-456-7890",
   docName: 'Baibhav Kumar',
   supportEmail: adminMail,
   logoPath: "https://i.postimg.cc/Rh4mN0YV/logo-circle.png",
   signaturePath: "https://i.postimg.cc/Rh4mN0YV/logo-circle.png",
   Sender_Name: 'Healer Ji',
   Sender_Address: 'Jai ram bazar (near devi sthan) Khagaul',
   Sender_City:'Patna',
   Sender_State:'Bihar',
   Sender_Zip: '801105',
};

// Render the EJS template with the data
const htmlEmailBody = ejs.render(template, data);
console.log('htm---------', htmlEmailBody);

module.exports = {htmlEmailBody} ;
