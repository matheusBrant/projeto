var Kafka = require('no-kafka');
var producer = new Kafka.Producer();

let oneHex = hexToDec('1');
let initialSpeed = '3C';
let locationGps = '';
let heartbeat = '';

//intervalo criado para simular os valores recebidos dos rastreadores
setInterval(function (){
    //esquema simulando a alteração de velocidade na string do protocolo
    improveHex(initialSpeed);
    initialSpeed == '50' ? initialSpeed = '3C' : initialSpeed;
    heartbeat = '50F70A3F730150494E4773C4';
    locationGps = `50F70A3F73025EFCF950156F017D784000008CA0F800${initialSpeed}013026A1029E72BD73C4`;
   
    //produtor que faz a comunicação com o consumidor
    return producer.init().then(function(){
        return producer.send({
            topic: 'users',
            partition: 0,
            message: {
                value: locationGps
            }
        });
    });
}, 5000); //intervalo de envios do produtor para o consumidor

function hexToDec(hex) {
    let bin = (parseInt(hex, 16).toString(2)).padStart(8, '0');
    return parseInt((bin + '').replace(/[^01]/gi, ''), 2);
}
function improveHex(feature) {
    let n = hexToDec(feature) + oneHex;
    hexString = n.toString(16);
    initialSpeed = hexString;
}