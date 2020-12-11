var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://test.mosquitto.org')

const imovelNovo = {
  codigo: "555", 
  nome: "Bacon", tipo: "AP", 
  endereco: "rua Deus nos ajuda vai da certo"
}

const imovelNovo2 = {
  codigo: "1310", 
  nome: "LuziCoracao", tipo: "QUARTO", 
  endereco: "vai que da certo"
}

client.on('connect', function () {
  client.publish('teste', 'deu certyo dfgdsfgsdfg');
  //client.publish('cadastra-imovel', JSON.stringify(imovelNovo));
  //client.publish('cadastra-imovel', JSON.stringify(imovelNovo2));
  client.subscribe('teste'),function(err){
    if(!err){
      client.publish('teste', 'heheh');
    }
  }
  
})

client.on('message', function (topic, message) {
  console.log(message.toString());
  client.end();
 
})