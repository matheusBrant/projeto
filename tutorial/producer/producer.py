from kafka import KafkaProducer
import json
import random
from time import sleep
from datetime import datetime

producer = KafkaProducer(bootstrap_servers='localhost:9092', 
                         value_serializer=lambda v: str(v).encode('utf-8'))

while True:
    heartbeat = '50F70A3F730150494E4773C4'
    location = '50F70A3F73025EFCF950156F017D784000008CA0F8003C013026A1029E72BD73C4'
    producer.send('users', location)
    sleep(120) #tempo padrao de comunicação
