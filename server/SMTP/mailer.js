const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey("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");

const sendMail = async (msg) => {
  try {
    await sgMail.send(msg);
    console.log("Mail Sent.");
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }
  }
};

module.exports = { sendMail };
