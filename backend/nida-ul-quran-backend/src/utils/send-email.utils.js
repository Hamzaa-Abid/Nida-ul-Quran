const nodemailer = require("nodemailer");

const sendEmail = async (emailObj) => {
  try {
    let mailerConfig = {
      service: process.env.EMAIL_SERVICE ? process.env.EMAIL_SERVICE : "gmail",
      host: process.env.EMAIL_HOST ? process.env.EMAIL_HOST : 'smtp.gmail.com',
      port: 465,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    };

    let transporter = nodemailer.createTransport(mailerConfig);

    if (emailObj.link) {
      const { link, email, username } = emailObj;
      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Nida Ul Quran",
        text: "Please click on below link to complete signup",
        html: `<p><b>Hello</b> ${username}</p>
                        <p>Please verify your email by clicking below<br/>
                        Click <a href="${link}"> here </a></p>
                        <p><b> copy paste link in browser </br>
                        <a href="${link}"> ${link} </a>
                        </p>
                        `,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          throw Error(error);
        } else {
          console.log("email sent successfully ... ");
        }
      });
    } else if (emailObj.firedFrom == "notification") {
      const { email, username } = emailObj;
      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Nida Ul Quran",
        text: `You have a class scheduled at ${emailObj.others.date}`,
        html: `<p><b>Hello</b> ${username}</p>
                        <p>You have a class scheduled at ${emailObj.others.date}<br/>
                        `,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          throw Error(error);
        } else {
          console.log("email sent successfully ... ");
        }
      });
    } else if (emailObj.firedFrom == "forgotPassword") {
      const { email, username } = emailObj;
      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Nida Ul Quran",
        text: `Password Change Request`,
        html: `<p><b>Hello</b> ${username}</p>
                        <p>Click on the link to reset your password 

                        ${emailObj.others.url}<br/>
                        `,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          throw Error(error);
        } else {
          console.log("email sent successfully ... ");
        }
      });
    } else if (emailObj.firedFrom == "reqClass") {
        const { email,text,html } = emailObj;
        const mailOptions = {
          from: process.env.EMAIL,
          to: email,
          subject: "Nida Ul Quran",
          text: text,
          html: html,
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            throw Error(error);
          } else {
            console.log("email sent successfully ... ");
          }
        });
      }else if (!emailObj.email) {
      const { name, phone, message, subject, clientEmail } = emailObj;
      const mailOptions = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: "Nida Ul Quran",
        text: "Contact Us",
        html: `<p><b>Hello Admin</b> ${name} wants to contact you, please find details below</p>
                        <p>
                        <b>Subject: </b> ${subject} </br>
                        <b>Phone Number: </b> ${phone} </br>
                        <b>Message: </b> ${message} </br>
                        <b>Email: </> ${clientEmail} </br>
                        </p>
                        `,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          throw Error(error);
        } else {
          console.log("admin contactus email sent successfully ... ");
        }
      });
    } else {
      const { email, name } = emailObj;
      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Nida Ul Quran",
        text: "Welcome",
        html: `<p><b>Hello</b> ${name}</p>
                        <p>We will contact you shortly</p>`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          throw Error(error);
        } else {
          console.log("contactus email sent successfully ... ");
        }
      });
    }
  } catch (error) {
    throw Error(error);
  }
};

module.exports = {
  sendEmail,
};
