"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailService = void 0;
const nodemailer_1 = require("nodemailer");
const appError_1 = __importDefault(require("../errors/appError"));
const mailgen_1 = __importDefault(require("mailgen"));
class EmailService {
    sendEmail({ to, subject, text }) {
        return __awaiter(this, void 0, void 0, function* () {
            const transporter = (0, nodemailer_1.createTransport)({
                host: "smtp.gmail.com",
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS,
                },
            });
            yield transporter
                .sendMail({
                from: process.env.SMTP_USER,
                to,
                subject,
                html: text,
            })
                .then(() => {
                console.log("Email send with sucess");
            })
                .catch((err) => {
                console.log(err);
                throw new appError_1.default("Error sending email, try again later", 500);
            });
        });
    }
    resetPasswordTemplate(userEmail, userName, protocol, host, resetToken) {
        const mailGenerator = new mailgen_1.default({
            theme: "default",
            product: {
                name: "Motors Shop",
                link: `${protocol}://${host}`,
            },
        });
        const email = {
            body: {
                name: userName,
                intro: "You have received this email because a password reset request for your account was received.",
                action: {
                    instructions: "Click the button below to reset your password:",
                    button: {
                        color: "#DC4D2F",
                        text: "Reset your password",
                        link: `http://127.0.0.1:5173/login/reset/${resetToken}`, //FRONTEND
                    },
                },
                outro: "If you did not request a password reset, no further action is required on your part.",
            },
        };
        const emailBody = mailGenerator.generate(email);
        const emailTemplate = {
            to: userEmail,
            subject: "Reset password",
            text: emailBody,
        };
        return emailTemplate;
    }
}
const emailService = new EmailService();
exports.emailService = emailService;
