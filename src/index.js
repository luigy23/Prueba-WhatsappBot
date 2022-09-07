
const express = require("express")
const app = require("./app")
const morgan = require("morgan")
const cors = require('cors')
const cron = require("node-cron")




// CONEXION A WHATSAPP:
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
  client.sendMessage("573193896000@c.us","servidor activo ✅")
});



/// ESCUCHAR MENSAJES

let contador = 0
let listaRutinas = []

client.on('message_create', msg => {
  crearRutina(msg)
  
  if (msg.body == "!stop"){
    crearCron.stop;

  }
  if (msg.body =="!run"){

    crearCron.run
  }


  if (msg.body == '!hola' || msg.body == '!hey' || msg.body == '!hola') {
    fotobyte2()
    msg.reply('Bienvenido, para hacer tu pedido ir click en : http://192.168.1.3:3000');
  }
  if (msg.from == "5732092966004@c.us") {
    msg.reply(msg.body)

  }


  console.log(msg.from + ": " + msg.body)
});



client.initialize();



/// PROGRAMAR RUTINAS
const crearRutina = (msg) => {
  const mensaje = msg.body
  console.log(mensaje,msg.from)
  if (mensaje.includes("!cm")) {
    console.log("verificado el !cm")
    let comandos = mensaje.split("-")
    
    console.log(comandos)
    if (comandos.length == 5) {//verifica todos los datos
      console.log("verificado el tamaño datos")
      msg.reply("tamaño verificado")
      let semana = "*"
      let dia = "*"
      let mes = "*"
      let hora = "*"
      let minuto = "*"
      let telefono =msg.from
      if (comandos[1].length > 4) { //verificamos si es fecha o semana, si es semana entra
        switch (comandos[1]) {
          case "lunes": semana = 1
          case "martes": semana = 2
          case "miercoles": semana = 3
          case "jueves": semana = 4
          case "viernes": semana = 5
          case "sabado": semana = 6
          case "domingo": semana = 7
          case "todos": semana = "*"
          default: console.log("semana = "+semana)
  
        }
      }else if(comandos[1]!==""){ //se ajustan las fechas
        mes= parseInt(comandos[1].slice(0,2))
        dia= parseInt(comandos[1].slice(2))
        
      }console.log("fechas = "+mes +dia)
      if (comandos[2]!==""){
      hora = parseInt( comandos[2].slice(0,2));
      minuto = parseInt( comandos[2].slice(2));
      console.log("tiempo = "+hora +minuto)}
      if(comandos[4]!==""){
        telefono=comandos[4]+"@c.us"
        
      }console.log("tel = "+telefono)
      


      //se crean cron job
      msg.reply("aqui ya se creo todo segun")
      console.log(hora,minuto,dia,mes,semana,comandos[3],telefono)


      client.sendMessage(msg.from, "creando cron...")
      listaRutinas[contador+1] = crearCron(hora,minuto,dia,mes,semana,comandos[3],telefono)
      client.sendMessage(msg.from, "creado")
  
  
    }else { //manda error
    console.log("incorrecto, el formato es:")
    
    client.reply("incorrecto, el formato es:")
    client.sendMessage(msg.from, "!cm,fecha/dia,hora,mensaje")
    client.sendMessage(msg.from, "!cm,0223,0000,feliz cumple")
    client.sendMessage(msg.from, "!cm,lunes,1325,odio lo lunes")
  }
  }
  }



const crearCron = (hora, minuto, dia, mes, semana, mensaje, telefono) => {
  
  console.log("cron menssaje:")
  console.log(`${minuto} ${hora} ${dia} ${mes} ${semana} ${telefono}`)

cron.schedule(`${minuto} ${hora} ${dia} ${mes} ${semana}`, () => {
  client.sendMessage(telefono,mensaje)

},{ scheduled: true,
  timezone: "America/Bogota"})
}



/// RUTINAS PRE DEFINIDAS
cron.schedule("30 22 * * *", () => {
  console.log("tarea a las 9:8")
  fotobyte()
}, {
  scheduled: true,
  timezone: "America/Bogota"
})

cron.schedule("55 12 * * *", () => {
  console.log("tarea a las 9:8")
  client.sendMessage("573193896000@c.us","Mensaje 1255")
}, {
  scheduled: true,
  timezone: "America/Bogota"
})

//573209296004

const fotobyte = (Melisa = "573209296004@c.us") => {
  client.sendMessage(Melisa, "-Hola Melisa, Envia un TetaByte para tu n0vi0, xfa   🤖")
  client.sendMessage(Melisa, "-Dice mi creador: 'Eres muy sexy y me encantas bby'🤖 ")
  client.sendMessage(Melisa, "01110100 01110001 01101101  ")
  client.sendMessage(Melisa, "-Fin del Mensaje Bye World  🤖")


}
const fotobyte2 = (Luigy = "573193896000@c.us") => {
  client.sendMessage(Luigy, "Mensaje automatico   🤖")
  console.log("enviado")


}


