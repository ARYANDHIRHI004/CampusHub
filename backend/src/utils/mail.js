import Mailgen from "mailgen";
import nodemailer from "nodemailer";
import { environment } from "./constenst";

const sendMail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Campus Hub",
      link: "http://google.com",
    },
  });

  let emailBody = mailGenerator.generate(options.mailGenContent);
  let emailText = mailGenerator.generatePlaintext(options.mailGenContent);

  const transporter = nodemailer.createTransport({
    host: environment.MAILTRAP_HOST,
    port: environment.MAILTRAP_PORT,
    secure: false,
    auth: {
      user: environment.MAILTRAP_USER,
      pass: environment.MAILTRAP_PASS,
    },
  });

  const mail = {
    from: "aryan@noreply.com", // sender address
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    text: emailText, // plain text body
    html: emailBody, // html body
  };

  try {
    await transporter.sendMail(mail);
    return true;
  } catch (error) {
    console.log("Email failed");
    return false;
  }
};

const emailVerificationMailGenContent = (username, verificationURL) => {
  return {
    body: {
      name: username,
      intro: "Welcome to our App",
      action: {
        instruction: "To get started with our app",
        button: {
          color: "#12BC55",
          text: "Verify your email",
          link: verificationURL,
        },
      },
      outro: "End",
    },
  };
};

export {sendMail, emailVerificationMailGenContent}
