import Mailgun from "mailgun-js";

const mailGunClient = new Mailgun({
  apiKey: process.env.MAILGUN_API_KEY || "",
  domain: "sandboxd94867dc9aea4e7c9f55b57074667b68.mailgun.org"
});

const sendEmail = (subject: string, html: string) => {
  const emailData = {
    from: "darkkjm2002@gmail.com",
    to: "darkkjm2002@gmail.com",
    subject,
    html
  };
  return mailGunClient.messages().send(emailData);
};

export const sendVerificationEmail = (fullName: string, key: string) => {
  const emailSubject = `Hello ${fullName}, please verify your email`;
  const emailBody = `Verify your email by clicking <a href="${key}">Here</a>`;
  return sendEmail(emailSubject, emailBody);
};
