const Kafka = require('no-kafka');

const consumer = new Kafka.SimpleConsumer({"connectionString":"127.0.0.1:9092"})
let data = function (messageSet) {
    messageSet.forEach(function (m) {
        let value = m.message.value.toString('utf8');
        parseMessage(value);
    });
};

return consumer.init().then(function () {
    return consumer.subscribe('users', data);
});

function parseMessage(message) {
    let splitMessage = message.split("");
    let match = ''; let header = '50F7'; let footer = '73C4';

    splitMessage.forEach(element => {
        match = match + element;
        if(match.includes(header)){
            match = match.split(header);
            match = match[1];
        }else if(match.includes(footer)){
            match = match.split(footer);
            match = match[0];
        }
    });
    let device = match.substring(0,6);
    let pingAck = match.substring(6,8);
    let dateStart = match.substring(8,16);
    let direction = match.substring(16,20);
    let distance = match.substring(20,28);
    let reportTime = match.substring(28,36);
    let combo = match.substring(36,40);
    let speed = match.substring(40,42);
    let lat = match.substring(42,50);
    let long = match.substring(50,58);

    let fullData = {
        table: []
    };

    let data = match.substring(8);

    fullData.table.push({device: hexToDec(device)});
    fullData.table.push({pingAck: hexToDec(pingAck)});
    fullData.table.push({dateStart: convertEpoch(hexToDec(dateStart))});

    let direcitonNumber = parseFloat(hexToDec(direction)/100);

    if(direcitonNumber > 359.99 || direcitonNumber < 0){
        console.log('Incorrect value' + ' → direction');
    }else{
        console.log(direcitonNumber + ' → direction');
    }
    console.log(hexToDec(distance)/1000 + ' km' + ' → distance');
    console.log(hexToDec(reportTime)/60 + ' hrs' + ' → reportTime');
    console.log(hexToDec(speed)+ ' km/h' +' → speed');
    console.log(hexToBin(combo).substring(0,5) + ' → combo');
    let control = hexToBin(combo).substring(0,5).split('');
    console.log(control[0] + ' → GPS Fixado');
    console.log(control[1] + ' → GPS Histórico');
    console.log(control[2] + ' → Ignição Ligada');
    console.log(control[3] + ' → Latitude negativa');
    console.log(control[4] + ' → Longitude negativa');

    let latitude = hexToDec(lat)/1000000;
    let longitude = hexToDec(long)/1000000;
    control[3] == '1' ? latitude = '-'+latitude: latitude;
    control[4] == '1' ? longitude = '-'+longitude: longitude;

    latitude = parseFloat(latitude);
    longitude = parseFloat(longitude);

    if(latitude > 90.000000 || latitude < -90.000000){
        console.log('Incorrect value' + ' → lat');
    }else{
        console.log(latitude + ' → lat');
    }

    if(longitude > 180.000000 || longitude < -180.000000){
        console.log('Incorrect value' + ' → long');
    }else{
        console.log(longitude + ' → long');
    }
    console.log(data + ' → Full data');

    var fs = require('fs');
    var filePath = 'data.json'; 
    fs.unlinkSync(filePath);

    var json = JSON.stringify(fullData);
    var fs = require('fs');
    fs.writeFile('data.json', json, 'utf8', function(err) {
        if (err) throw err;
        console.log('complete');
        }
    );
}

function convertEpoch(seg) {
    var myDate = new Date( seg *1000);
    return myDate.toLocaleString();
}

function hexToBin(hex){
    return (parseInt(hex, 16).toString(2)).padStart(8, '0');
}

function binToDec(bstr) { 
    return parseInt((bstr + '').replace(/[^01]/gi, ''), 2);
}

function hexToDec(hex) {
    let bin = (parseInt(hex, 16).toString(2)).padStart(8, '0');
    return parseInt((bin + '').replace(/[^01]/gi, ''), 2);
}