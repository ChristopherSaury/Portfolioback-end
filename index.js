const express = require('express');
const cors = require('cors');
const { SERVER_PORT } = require('./env');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const { MAIL }= require('./env');
const { MAILPSW } = require('./env');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors());

const server = app.listen(SERVER_PORT, () => {
    console.log(`Server is listening on : ${SERVER_PORT}`);
  });

app.post('/contact', (req, res) => {
    let data = req.body
    let smtpTransport = nodemailer.createTransport({
        service : 'Gmail',
        port: 465,
        auth:{
            user: MAIL,
            pass: MAILPSW
        } 
    });
    console.log(data);
    let mailOptions={
        from: data.name,
        to: MAIL,
        subject: `Message de ${data.name}`,
        html:`
        
        <h3>Informations</3>
            <ul>
            <li> Nom: ${data.name}</li>
            <li> Email: ${data.email}</li>
            <li> Sujet: ${data.subject}</li>
            </ul>
        <h3>Message</h3>
        <p> ${data.message}</p>
        `
    };
    
    smtpTransport.sendMail(mailOptions, (error, response) => {
        if(error){
            res.send(error)
        } else {
            res.send('Succes')
        }
    })
    smtpTransport.close();
  });

  module.exports = server;