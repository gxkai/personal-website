import type { AuthHandler } from "./util";
import joi from "joi";
import prisma from "../../lib/prisma";
import { storeCode, GetUser } from "./util";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import * as nodeMailjet from 'node-mailjet'
import nodemailer from 'nodemailer'
let transporter = nodemailer.createTransport({
  host: 'smtp.qq.com', // 发送方邮箱 qq 通过lib/wel-konw
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.QQ_EMAIL_USER,
    pass: process.env.QQ_EMAIL_PASS
  }
})

// const mailjet = new nodeMailjet.Client({
//   apiKey: process.env.MAILJET_API_KEY,
//   apiSecret: process.env.MAILJET_SECRET_KEY
// })
export interface Metadata {
  email?: string;
  provider: "email";
}

export const getUser: GetUser<Metadata> = async (metadata, countryCode) => {
  if (metadata.provider !== "email") return { error: "Invalid code", status: 400 };
  if (typeof metadata.email !== "string") return { error: "Invalid code", status: 400 };

  let user = await prisma.user.findUnique({ where: { email: metadata.email } });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: metadata.email,
        avatar:
          "https://gravatar.com/avatar/" +
          crypto.createHash("md5").update(metadata.email).digest("hex") +
          ".png?d=identicon&s=64",
        countryCode
      }
    });
  }

  return { user };
};

export const handler: AuthHandler = async req => {
  const { error } = joi
    .object({
      email: joi.string().email().required()
    })
    .validate({ email: req.query.email });

  if (error) return { error: error.message, status: 400 };

  const { email } = req.query;

  const code = await storeCode(undefined, { email, provider: "email" });
  // const res = await mailjet
  //     .post("send", {'version': 'v3.1'})
  //     .request({
  //       Messages: [
  //         {
  //           From: {
  //             Email: "ksgxk@icloud.com",
  //             Name: "gxkai"
  //           },
  //           To: [
  //             {
  //               Email: email
  //             }
  //           ],
  //           Subject: "Your email code",
  //           TextPart: fs.readFileSync(
  //               path.join(process.cwd(), "content/email-templates/email-code.txt"),
  //               "utf8"
  //           ),
  //           HTMLPart: fs.readFileSync(
  //               path.join(process.cwd(), "content/email-templates/email-code.html"),
  //               "utf8"
  //           ),
  //           TemplateLanguage: true,
  //           Variables: {
  //             code,
  //             link: `https://guxukai.tech/api/auth/session?token=${code}`
  //           }
  //         }
  //       ]
  //     })
  // if (!res.ok) {
  //   console.log({ emailError: await res.json() });
  //   return { error: "Couldn't send email", status: 500 };
  // }
  await new Promise((resolve, reject) => {
    // 发送邮件
    transporter.sendMail({
      from: process.env.QQ_EMAIL_USER,
      to: email,
      subject: code,
      text: `${process.env.BASE_URL}/api/auth/session?token=${code}`
    }, (err, data) => {
      if (err) {
        console.log(err)
        return { error: "Couldn't send email", status: 500 };
      } else {
        resolve(true)
      }
    })
  })
  return { code };
};

const email = { getUser, handler };

export default email;
