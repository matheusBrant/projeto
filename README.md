# Instruções do projeto
## Stack: Kafka, Docker, Node
###### → O Apache Kafka é um sistema de mensagens usado para criar aplicações com fluxo de dados contínuo. Por garantir robustez, escalabilidade, segurança, disponibilidade, extensibilidade por si próprio e por eu já ter tido contato prévio com a tecnologia, acreditei que faria sentido a utilização.
###### → Para facilitar a utilização do Kafka usei uma imagem Docker que facilitou a criação do tópico Kafka
###### → O fluxo Kafka pode ser trabalhado em diversas linguagens, mas utilizei NodeJs no produtor e no consumidor
## Estrutura de pastas
![image](https://user-images.githubusercontent.com/25610151/180105389-3285db19-4a83-4268-8293-c1f13306b7da.png)
###### → backend: pasta com os arquivos principais, rodando o kafka e criando o endpoint
###### →→ consumer/producer: para criar o fluxo de stream
###### →→ src:  criando o endpoint (rodei local na porta 3000)
###### → cp-docker-images: pasta com um exemplo direto para rodar o tópico kafka direto do conteiner
## Ferramentas necessárias
###### → [Docker](https://docs.docker.com/engine/install/)
###### → [Docker Compose](https://docs.docker.com/compose/install/#install-compose)
###### → [Node](https://nodejs.org/en/download/)
## Rodando o projeto
###### → 1º: Docker Desktop precisa estar rodando se for no windows, e então: ***cd cp-docker-images/example/kafka-single-node*** → ***docker-compose up -d***
###### → 2º: Criando o tópico Kafka chamado 'users': ***docker-compose exec broker kafka-topics --create --bootstrap-server \localhost:9092 --replication-factor 1 --partitions 1 --topic users*** 
##### Pra rodar o projeto fui fazendo tudo por terminais bash, e utilizei 3 distintos na pasta 'projeto'
###### → Terminal 1: ***node ./consumer/consumer.js***
###### → Terminal 2: ***node ./producer/producer.js***
###### → Terminal 3: ***npm start***
###### → Endpoint: http://localhost:3000/api/v1/location/:device_id. Obs: O parametro :device_id, eu considerei o valor em decimal.
