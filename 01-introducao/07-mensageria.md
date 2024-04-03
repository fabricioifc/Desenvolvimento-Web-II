# Mensageria

A mensageria é um padrão de comunicação entre sistemas distribuídos que permite a troca de mensagens assíncronas entre os componentes de um sistema. A comunicação entre os sistemas é feita através de mensagens, que são enviadas e recebidas por meio de um intermediário chamado de *message broker*. Para praticar, vamos utilizar o RabbitMQ, um *message broker* open-source amplamente utilizado em aplicações distribuídas. Resolva o problema a seguir para praticar a implementação de um sistema de mensageria usando RabbitMQ.

### Descrição do problema:

Imagine uma loja online que recebe pedidos de clientes. Quando um cliente faz um pedido, ele precisa ser processado e registrado no sistema da loja. Além disso, o pedido deve ser enviado para o sistema de envio/logística para que a entrega possa ser agendada.

### Requisitos do sistema:

1. **Processamento de pedidos**: Quando um pedido é feito na loja online, ele deve ser enviado para um sistema que o processe e o registre no banco de dados da loja.

2. **Agendamento de entrega**: Após o processamento do pedido, ele deve ser enviado para o sistema de envio/logística para que a entrega seja agendada.

### Implementação usando RabbitMQ:

1. **Definição das filas**:
   - Crie duas filas no RabbitMQ: uma para receber os pedidos da loja online e outra para enviar os pedidos processados para o sistema de envio.

2. **Produtores de mensagens**:
   - Escreva um programa em Python (ou em outra linguagem de sua preferência) que atue como produtor de mensagens. Esse programa simulará a loja online e enviará os pedidos para a fila correspondente no RabbitMQ.

3. **Consumidores de mensagens**:
   - Escreva dois programas que atuem como consumidores de mensagens:
     - O primeiro consumidor receberá os pedidos da fila da loja online, processará os pedidos e os registrará no banco de dados da loja.
     - O segundo consumidor receberá os pedidos processados da fila e os enviará para o sistema de envio/logística.

4. **Integração com banco de dados e sistema de envio**:
   - Implemente a integração dos consumidores com o banco de dados da loja e o sistema de envio/logística. Isso pode ser feito usando bibliotecas específicas para acesso ao banco de dados e para comunicação com o sistema de envio.

### Testes e avaliação:

- Simule o envio de pedidos através do produtor de mensagens.
- Verifique se os pedidos são corretamente processados e registrados no banco de dados da loja.
- Verifique se os pedidos processados são corretamente enviados para o sistema de envio/logística.

### Considerações finais:

Essa atividade prática proporcionará aos estudantes a oportunidade de compreender e aplicar os conceitos de mensageria usando RabbitMQ, além de praticar habilidades de integração de sistemas e manipulação de dados em um ambiente realista.