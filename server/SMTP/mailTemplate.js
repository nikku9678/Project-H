// import fileType from 'file-type';
const  {htmlEmailBody}  = require("./dynamicMail");
const {sendMail} = require('./mailer')
const websiteURL = "https://www.healer-ji.com";
const websiteName = "Healer-Ji";
const supportEmail = "healerji.company@gmail.com";
const adminMail = "adi22maurya@gmail.com";
const phoneno = '+91 7644887997';

const message = (userMail, subject, body)=>{
   let msg = {
      to: [userMail],
      from: {
         name: websiteName,
         email: adminMail
      },
      subject: subject,
      html: body,
   }
   return msg;
};

const newWelcomeMail = async (userName, userMail='adi22maurya@gmail.com') => {

   const subject = `Welcome to ${websiteName} - Your Trusted Mental Health Companion`;

   const msg = message(userMail, subject, htmlEmailBody);
      const res = await sendMail(msg);
      return res;
};
// newWelcomeMail();

const welcomeMail = async(userName, userMail) => {
   const body = `Dear ${userName},

   We are delighted to see you back on ${websiteName}! Thank you for choosing our platform as your trusted resource for mental health support. Your continued commitment to your well-being is truly commendable.
   At ${websiteName}, we strive to provide a safe and supportive environment where you can connect with qualified doctors and access resources to improve your mental health. Whether you're seeking professional guidance, informative articles, or a community to share your experiences, we're here to assist you every step of the way.
   As you navigate our website, you'll find a plethora of valuable features and services to enhance your mental well-being:

   1. Personalized Doctor Recommendations: We understand that finding the right mental health professional is crucial. Our advanced matching algorithm considers your unique needs and preferences to suggest qualified doctors who can provide the support you require.
   2. Secure Messaging: Connect with your chosen doctors through our secure messaging system. You can discuss your concerns, ask questions, and receive professional guidance right from the comfort of your own home.
   3. Extensive Resource Library: Our comprehensive resource library is filled with articles, guides, and self-help tools designed to empower you on your mental health journey. Explore a wealth of information to gain insights, learn coping strategies, and foster self-improvement.
   4. Supportive Community: Engage with our vibrant community of individuals who are also seeking mental health support. Share your experiences, gain perspectives, and find solace in a compassionate environment.
   We are grateful to have you as a part of our growing community of individuals who prioritize their mental well-being. Together, we can break the stigma surrounding mental health and work towards a healthier, happier future.

   If you have any questions, concerns, or suggestions, please don't hesitate to reach out to our dedicated support team at ${supportEmail}. We are here to assist you and ensure your experience on ${websiteName} remains exceptional.

   Thank you once again for choosing ${websiteName} as your mental health companion. We are honored to be a part of your journey towards improved well-being.

   Warm regards,
   ${websiteName}
   ${websiteURL}`;

   const subject = `Welcome to ${websiteName} - Your Trusted Mental Health Companion`;

   const msg = message(userMail, subject, body);
   const res = await sendMail(msg);
   return res;
};

const requestDocFund = async(userName, userMail, funds) => {
   
   const body = `Dear ${userName},
   Your Request for funds of Rs. ${funds} is in processing and will be processed shortly.
   Warm regards,
   ${websiteName}
   ${websiteURL}`;

   const subject = `Fund request for Doctor ${userName}`;

   const msg = message(userMail, subject, body);
   const res = await sendMail(msg);
   return res;
};

const requestDocFundToAdmin = async(userName, userMail, funds) => {
   const body = `Dear Admin,
   Doctor:- ${userName} has requested for an amount of Rs. ${funds}.
   Please look into the issue asap.
   Warm regards,
   ${websiteName}
   ${websiteURL}`;

   const subject = `Fund request from Doctor ${userName} to ${websiteName}`;

   const msg = message(userMail, subject, body);
   const res = await sendMail(msg);
   return res;
};

const sessionforUser = async(docName, userName, email) => {
   const body = `Dear ${userName},
   We are delighted to confirm your forthcoming online therapy session with Dr. ${docName} is scheduled. Your well-being is paramount to us, and we appreciate your trust in our virtual therapy services.\n
      We appreciate your choice in our online therapy services and eagerly anticipate assisting you on your path to better mental health. If you require further assistance or information, please feel free to contact us anytime at ${phoneno} or ${supportEmail}. Our representative will soon reach out to you.\n\n
   Thank you for entrusting us with your well-being.\n
   Warm regards,
   Team Healer-Ji
   ${websiteURL}`;

   const subject = `Confirmation of Therapy Session Appointment at ${websiteName} for ${userName}`;

   const msg = message(email, subject, body);
   const res = await sendMail(msg);
   return res;
};

const sessionForDoc = async(docName, userName, email) => {
   const body = `Dear ${docName},

   ${userName} booked a session with you. Feel free to connect with us at ${supportEmail} in case of any discrepancy.

   Warm regards,
   ${websiteName}
   ${websiteURL}`;

   const subject = `Session booked at ${websiteName} for ${docName}`;

   const msg = message(email, subject, body);
   const res = await sendMail(msg);
   return res;
};

const mailTemplate = (id, userName, userMail)=>{
   if(id=='welcome'){
      const welcome = welcomeMail(userName,userMail);
      console.log(welcome);
      return welcome;
   }
};

const reqFundMailTemplate = (id, userName, userMail, funds) => {
   if(id == 'requestDocFund') {
      const docFund = requestDocFund(userName, userMail, funds);
      return docFund;
   } else if(id == 'requestDocFundToAdmin') {
      const docFundToAdmin = requestDocFundToAdmin(userName, userMail, funds);
      return docFundToAdmin;
   }
};

const sessionMailTemplate = (id, docName, userName, email) => {
   if(id=='sessionBookedForUser'){
      const userSession = sessionforUser(docName, userName, email);
      return userSession;
   } else if(id=='sessionBookedForDoc'){
      const docSession = sessionForDoc(docName, userName, email);
      return docSession;
   }
};

const mailToAdmin = async(sessionData) => {
   
   const { id, doctorId, userId, age, consent, file, gender, medicalHistory, presentingIssue, treatmentGoal, username, docname } = sessionData;
   
//    console.log('from line 141=======>',file.fileType, '+', file)
//    const fileType = fileType(file);
//    const handleFileDownload = (fileData, fileName) => {
//       const link = document.createElement('a');
//       link.href = fileData;
//       link.download = fileName;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//   };

   const body = `
   Hello admin,

   User: '${username}' with userId: '${userId}', has booked a session with doctor: '${docname}' with doctorId: '${doctorId}'.</br>
   The Session Data is as follows:-

   <li>
   <h2>Session ID: ${id}</h2>
   <p>Doctor ID: ${doctorId}</p>
   <p>User ID: ${userId}</p>
   <p>Age: ${age}</p>
   <p>Consent: ${consent ? 'Yes' : 'No'}</p>
   <p>Gender: ${gender}</p>
   <p>Medical History: ${medicalHistory}</p>
   <p>Presenting Issue: ${presentingIssue}</p>
   <p>Treatment Goal: ${treatmentGoal}</p>
   <p>Username: ${username}</p>
   <p>Doctor Name: ${docname}</p>
      <img src="data:image/jpeg;base64,${file.toString('base64')}" alt="File" style={{ maxWidth: '200px' }} />
   </li>

   Warm regards,
   ${websiteName}
   ${websiteURL}`;

   //   ${file ? (
   //     `<div>
   //       ${fileType.startsWith('image') ? (
         //   `<img src="data:image/jpeg;base64,${file.toString('base64')}" alt="File" style={{ maxWidth: '200px' }} />`
   //       ) : (
   //         `<button onclick="handleFileDownload('${file.toString('base64')}', 'session_file_${id}.pdf')">
   //           Download File
   //         </button>`
   //       )}
   //     </div>`
   //   ) : ''}



   const subject = `New Session Booked`;

   const msg = message(adminMail, subject, body);
   const result = await sendMail(msg);
   return result;
}

const updateUserWalletByAdmin = async(email, amount, money) => {
   const body = `Dear ${email},
      Your wallet on ${websiteName} has been updated.
      Amount added:- ${amount}
      Current wallet amount:- ${money}.

      You can now consult with our psychologists.
   `

   const subject = `Recharge Processed on Healerji`;

   const msg = message(email, subject, body);
   const res = await sendMail(msg);
   return res;
};

const addMoneyUser = async(mail, userId) => {
   const body = `Dear ${websiteName},

      User Id :- ${userId},
      User Email:- ${mail}

   `

   const subject = `Request to add money to wallet for Healerji`;

   const msg = message(adminMail, subject, body);
   const res = await sendMail(msg);
   return res;
}

module.exports = {mailTemplate, reqFundMailTemplate, sessionMailTemplate, mailToAdmin, updateUserWalletByAdmin, addMoneyUser};