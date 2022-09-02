
const express = require("express")
const app = require("./app")
const morgan = require("morgan")
const cors = require('cors')
const cron = require("node-cron")

cron.schedule("30 11 * * *", () => {
  console.log("tarea a las 9:8")
  fotobyte()
}, {
  scheduled: true,
  timezone: "America/Bogota"
})
/*
//settings
app.set("port", process.env.PORT || 4000)
app.set("json spaces", 2)

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({extended:false}))
//routes

app.use(require("./routes/index.js"))

//iniciar server
app.listen(app.get("port"), ()=>{console.log("server port : "+ 4000)});

*/


//crear cron

const crearCron = (hora, minuto, dia, mes, semana, mensaje, telefono) => {
  return(
  cron.schedule(`${minuto} ${hora} ${dia} ${mes} ${semana}`, () => {
    client.sendMessage(telefono,mensaje)

  },{ scheduled: true,
    timezone: "America/Bogota"}))
}

//whatsapp
const qrcode = require('qrcode-terminal');

const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
  authStrategy: new LocalAuth()
});


client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Client is ready!');
});




const crearRutina = (msg) => {
  const mensaje = msg.body
  console.log(mensaje)
  if (mensaje.includes("!cm")) {
    console.log("verificado el !cm")
    let comandos = mensaje.split("-")
    
    console.log(comandos)
    if (comandos.length() == 5) {//verifica todos los datos
      let semana = "*"
      let dia = "*"
      let mes = "*"
      let hora = "*"
      let minuto = "*"
      let telefono =msg.from
      if (comandos[1].length > 4) { //verificamos si es fecha o semana, si es semana entra
        switch (comandos[2]) {
          case "lunes": semana = 1
          case "martes": semana = 2
          case "miercoles": semana = 3
          case "jueves": semana = 4
          case "viernes": semana = 5
          case "sabado": semana = 6
          case "domingo": semana = 7
          case "todos": semana = "*"
          default: semana = "*"

        }
      }else{ //se ajustan las fechas
        mes= parseInt(comandos[1].slice(0,2))
        dia= parseInt(comandos[1].slice(2))
      }
      hora = parseInt( comandos[2].splice(0,2));
      minuto = parseInt( comandos[2].splice(2));
      if(comandos[4]!==""){
        telefono=comandos[4]+"@c.us"
      }

      //se crean cron job
      
      msg.sendMessage(msg.from, "creando cron...")
      crearCron(hora,minuto,dia,mes,semana,comandos[3],telefono)
      msg.sendMessage(msg.from, "creado")
  
  
    }else { //manda error
    console.log("incorrecto, el formato es:")
    msg.sendMessage(msg.from, "!cm,fecha/")  
    msg.reply("incorrecto, el formato es:")
    msg.sendMessage(msg.from, "!cm,fecha/dia,hora,mensaje")
    msg.sendMessage(msg.from, "!cm,0223,0000,feliz cumple")
    msg.sendMessage(msg.from, "!cm,lunes,1325,odio lo lunes")
  }
}
}

client.on('message_create', msg => {
  crearRutina(msg)
  if (msg.body == '!hola' || msg.body == '!hey' || msg.body == '!hola') {
    fotobyte2()
    msg.reply('Bienvenido, para hacer tu pedido ir click en : http://192.168.1.3:3000');
  }
  if (msg.from == "5732092966004@c.us") {
    msg.reply(msg.body)

  }


  console.log(msg.from + ": " + msg.body)
});

//573209296004

const fotobyte = (Melisa = "573209296004@c.us") => {
  client.sendMessage(Melisa, "-Melisa manda un tetaByte   🤖")
  client.sendMessage(Melisa, "-xfa   🤖")
  client.sendMessage(Melisa, "-Dice mi creador que eres mu sexy  🤖")
  client.sendMessage(Melisa, "-Fin del comunicado Bye World  🤖")


}
const fotobyte2 = (Luigy = "573193896000@c.us") => {
  client.sendMessage(Luigy, "Mensaje automatico   🤖")



}

client.initialize();

