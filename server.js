var mqtt = require('mqtt');
var server  = mqtt.connect('mqtt://test.mosquitto.org');
const Cliente = require('./util/Cliente');
const Imovel  = require('./util/Imovel');

const CADASTRA_IMOVEL = 'cadastra-imovel';
const REALIZA_RESERVA = 'realizar-reserva';
const CONSULTA_DATA_DISPONIVEL_IMOVEL = 'consulta-data-disponivel-imovel';
const LISTA_IMOVEIS = 'lista-imoveis';

var imoveis = [];

const imovel1 = new Imovel("12311",  "casa do joao", "AP", "rua A, n 12 centro");
const imovel2 = new Imovel("1233",  "QUITANDINHA DO OPA", "QUARTO", "rua B, n 12 centro");
const imovel3 = new Imovel("13",  "CASA DA MÃE JOANA", "AP", "rua C, n 12 centro");
const imovel4 = new Imovel("1",  "BBhouse", "QUARTO", "rua D, n 12 centro");
const cadastrarImovelTeste = function (imoveis, imovel){
    imoveis.push(imovel);
}
cadastrarImovelTeste(imoveis, imovel1);
cadastrarImovelTeste(imoveis, imovel2);
cadastrarImovelTeste(imoveis, imovel3);
cadastrarImovelTeste(imoveis, imovel4);

server.on('connect', function() {

    server.subscribe('teste', function (err) {
        if (!err) {
            console.log("Subscrito no tópico 'teste' com sucesso!");
        }else{
            console.log("Deus errado \n " + err);
        }
    });


    server.subscribe(REALIZA_RESERVA, function (err) {
        if (!err) {
            console.log("Subscrito no tópico '" + REALIZA_RESERVA + "' com sucesso!");
        }
    });


    server.subscribe(CONSULTA_DATA_DISPONIVEL_IMOVEL, function (err) {
        if (!err) {
            console.log("Subscrito no tópico '" + CONSULTA_DATA_DISPONIVEL_IMOVEL + "' com sucesso!");
        }
    });

    server.subscribe(LISTA_IMOVEIS, function (err) {
        if (!err) {
            console.log("Subscrito no tópico '" + LISTA_IMOVEIS + "' com sucesso!");
        }
    });
});

server.on('message', function(topic, message) {
    console.log(">>>>>>>Tópico: " + topic + "/n////////////////menssagem: " + message);
    switch(topic) {
        case CADASTRA_IMOVEL:
            console.log("CADASTRO DE IMOVEL");
            const imovel = JSON.parse(message);
            cadastrarImovelTeste(imoveis, imovel);
            break;

        case REALIZA_RESERVA:
            console.log("CADASTRO DE RESERVA");
            const reserva = JSON.parse(message);
            const imovel = imoveis.find(i => i.codigo == reserva.codigoImovel);
            var resposta = imovel.reservar(reserva.dataInicial, reserva.dataFinal);
            console.log(resposta);
            server.publish('realizar-reserva', JSON.stringify(resposta));
            break;
            
        case CONSULTA_DATA_DISPONIVEL_IMOVEL:
            console.log("CONSULTA DATA DISPONIVEL IMOVEL");
            const codigoImovel = JSON.parse(message);
            const clienteTeste = new Cliente("José", "123000123-20");
            var resposta = clienteTeste.datasDisponiveis(imoveis,codigoImovel);
            console.log(resposta);
            server.publish('realizar-reserva', JSON.stringify(resposta));
            break;  
        case LISTA_IMOVEIS:
            console.log("LISTA IMOVEIS");
            var listaResposta = [];
            const clienteTeste = new Cliente("José", "123000123-20");
            listaResposta = clienteTeste.ImoveisDisponiveis(imoveis);
            console.log(listaResposta);
            server.publish('realizar-reserva', JSON.stringify(listaResposta));
            break;      
    }

    console.log(message.toString());
});
