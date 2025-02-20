### **📌 Estruturas Arquiteturais Principais**  
Os principais **tipos de arquitetura** em desenvolvimento de software incluem:

1. **Monolito** 🏛️  
   - Toda a aplicação roda como uma única unidade.  
   - Backend, frontend e banco de dados estão juntos no mesmo sistema.  
   - Não é distribuído, pois roda tudo em um único sistema.  
   - Exemplos: Aplicações tradicionais Java EE (`.war` ou `.ear` únicos).  

2. **Arquitetura Distribuída** 🌎  
   - É um conceito amplo, e dentro dela temos abordagens específicas.
   - A aplicação é separada em diferentes módulos/sistemas que se comunicam via rede.  
   - Backend e frontend podem estar em servidores separados.  
   - Exemplo: Um backend Java EE rodando separadamente da camada de apresentação, se comunicando via **RMI, REST ou gRPC**.  
   - **Microserviços, SOA e Serverless são subtipos da Arquitetura Distribuída.**  

3. **Microserviços** 🏗️  
   - Cada serviço representa uma **única funcionalidade** da aplicação.  
   - Comunicação via **APIs REST, gRPC, mensageria (Kafka, RabbitMQ)**.
   - Escalável e independente, mas aumenta a complexidade.  
   - Exemplo: Um serviço de pagamento separado de um serviço de autenticação.  

4. **SOA (Service-Oriented Architecture)** 🔄  
   - Serviços **reutilizáveis e integrados** que podem ser consumidos por diferentes aplicações.  
   - Comunicação via **SOAP, REST ou mensageria**.  
   - Exemplo: Um sistema bancário onde diferentes módulos (transferências, extrato, crédito) usam serviços centralizados.  

5. **Serverless**
   - Execução sob demanda sem servidores gerenciáveis.
   - Código executado sob demanda em provedores como AWS Lambda, Google Cloud Functions.  
   - Exemplo: Um webhook que dispara uma função para processar pagamentos quando um usuário faz checkout.  

---  