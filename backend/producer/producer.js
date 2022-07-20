var Kafka = require('no-kafka');
var producer = new Kafka.Producer();

let heartbeat = '50F70A3F730150494E4773C4'
let location = '50F70A3F73025EFCF950156F017D784000008CA0F8003C013026A1029E72BD73C4'

setInterval(function (){
    return producer.init().then(function(){
        return producer.send({
            attempts: 2,
            topic: 'users',
            partition: 0,
            message: {
                value: location
            }
        });
    });
}, 120000);