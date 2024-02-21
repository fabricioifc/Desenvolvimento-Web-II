**Desafio de Projeto: Desenvolvimento de uma API para Gestão de Cadastro de Associados e Faturas de Energia Solar**

**Descrição do Projeto:**
Uma cooperativa de energia solar está buscando automatizar o processo de gerenciamento de seus associados, consumo de energia mensal e saldo de crédito em kWh. Atualmente, esses dados são obtidos manualmente a partir de faturas de energia em formato PDF. Para agilizar esse processo, a cooperativa deseja desenvolver uma API que seja capaz de ler as faturas em PDF, extrair as informações relevantes e armazená-las em um banco de dados. Além disso, é necessário implementar um sistema de autenticação de usuários para permitir o upload dos arquivos PDF e consulta dos dados dos associados.

**Requisitos do Projeto:**

1. **API de Gerenciamento:**
   - Desenvolver uma API RESTful que permita a gestão dos associados, consumo de energia mensal e saldo de crédito em kWh.
   - Implementar endpoints para criar, atualizar, visualizar e excluir ou inativar associados.
   - Implementar endpoints para realizar operações CRUD (Create, Read, Update, Delete) nas faturas de energia. Preferencialmente, faça o upload das faturas em lote para processamento em massa.

2. **Processamento de Faturas PDF:**
   - Integrar um mecanismo de leitura de arquivos PDF para extrair as informações relevantes das faturas, como consumo de energia e saldo de crédito.
   - Transformar os dados extraídos em um formato adequado para armazenamento no banco de dados. Por exemplo, criar um objeto JSON com as informações extraídas.

3. **Banco de Dados:**
   - Utilizar um banco de dados para armazenar as informações dos associados, consumo de energia e saldo de crédito.
   - Definir um esquema de banco de dados adequado para a estrutura dos dados. Por exemplo, criar tabelas para armazenar os associados e as faturas de energia.

4. **Autenticação de Usuário:**
   - Implementar um sistema de autenticação de usuários para controlar o acesso aos endpoints da API.
   - Permitir que apenas usuários autenticados possam fazer upload de faturas e acessar os dados dos associados.

5. **Frontend (Opcional):**
   - Desenvolver uma página web para consumir a API, permitindo que os usuários realizem o upload de faturas e consultem os dados dos associados de forma amigável.

**Documentação da API:**
   - A documentação da API deve incluir detalhes sobre todos os endpoints disponíveis, seus parâmetros de entrada e saída, bem como exemplos de uso.
   - Recomenda-se o uso de ferramentas como Swagger para facilitar a documentação e teste da API.

**Considerações Finais:**
 - Este projeto oferece uma oportunidade para os alunos aplicarem seus conhecimentos em desenvolvimento de APIs, processamento de documentos, bancos de dados e autenticação de usuários. Além disso, a criação de uma interface web para consumir a API pode agregar valor ao projeto, tornando-o mais acessível e fácil de usar para os usuários finais.

**Entre os critérios de avaliação estão:**
- Organização do código-fonte e estrutura do projeto. O código-fonte deve estar público em um repositório no GitHub.
- Qualidade e eficiência da API desenvolvida, incluindo a correta implementação dos endpoints e a integração com o banco de dados.
- Implementação de um sistema de autenticação de usuários seguro.
- Documentação da API, incluindo detalhes sobre os endpoints disponíveis e exemplos de uso.
- Interface web para consumir a API (opcional).
- Boas práticas de programação e padrões de projeto.

**Prazo de Entrega: 10/12/2021**\
**Nota: 50% da nota final**