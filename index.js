const express = require("express");
const path = require("path");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const expressValidator = require("express-validator");
const flash = require("connect-flash");
const session = require("express-session");
const nodemailer = require("nodemailer");
require('dotenv').config()

// express ejs
app.use(expressLayouts);
app.set("view engine", "ejs");

// body-parser
app.use(
    express.urlencoded({
        extended: false
    })
);

// express session
app.use(
    session({
        secret: "secret",
        resave: true,
        saveUninitialized: true
    })
);
// connect flash
app.use(flash());

// custom flash middleware
app.use((req, res, next) => {
    res.locals.email_msg = req.flash("email_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.success_msg = req.flash("success_msg");
    res.locals.name = req.flash("name");
    res.locals.email = req.flash("email");
    res.locals.body = req.flash("body");
    next();
});

// express validator
app.use(expressValidator());

// set static folder
app.use(express.static(path.join(__dirname + "/dist")));

// home
app.get("/", (req, res) => {
    res.render("portfolio");
});

//sucess
app.get("/sucess", (req, res) => {
    res.render("sucess", { error: "undefined" });
});

// send action
app.post("/send", (req, res) => {
    const { name, email, body } = req.body;
    req.checkBody("email", "Please put a valid email address").isEmail();

    var emailErrors = req.validationErrors();

    if (!name || !email || !body || emailErrors) {
        if (emailErrors) {
            emailErrors.forEach(error => {
                req.flash("email_msg", `${error.msg}`);
            });
        }
        if (!name || !email || !body) {
            req.flash("error_msg", "Please fill in all fields");
        }
        req.flash("name", `${name}`);
        req.flash("email", `${email}`);
        req.flash("body", `${body}`);
        res.redirect("/#contact");

    } else {

        var output =  `<p><span style='font-weight: bolder;'>Name:</span> ${name}</p><p><span style='font-weight: bolder;'>Email:</span> ${email}</p><p style='margin-bottom: 10px; font-weight: bolder'>Message Content:</p><p>${body}</p>`

        // Create the transporter with the required configuration for Outlook
        // change the user and pass !
        var transporter = nodemailer.createTransport({
            host: "smtp-mail.outlook.com", // hostname
            secureConnection: false, // TLS requires secureConnection to be false
            port: 587, // port for secure SMTP
            tls: {
            ciphers:'SSLv3'
            },
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        // setup e-mail data, even with unicode symbols
        var mailOptions = {
            from: '"franceG Portfolio" <francesg@outlook.ph>', // sender address (who sends)
            to: 'francesgdev@gmail.com', // list of receivers (who receives)
            subject: 'New message from Portfolio ', // Subject line
            text: '', // plaintext body
            html: output // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }

            console.log('Message sent: ' + info.response);
            req.flash('success_msg', 'Message Succesfully sent!');
            res.redirect('/#contact')
        });

    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
