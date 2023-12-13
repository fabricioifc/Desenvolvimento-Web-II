## Unidade 1: Introdução à Arquitetura de Sistemas Web (4 horas)

### 1.1. Conceitos básicos de arquitetura de sistemas web

Nesta seção, vamos estudar os conceitos básicos sobre arquitetura de sistemas web. Vamos aprender o que é arquitetura de software, quais são os modelos arquiteturais mais utilizados na indústria de software, quais são os principais desafios e tendências da arquitetura de sistemas web.

### 1.2 Definição

A __`arquitetura de aplicações web`__ descreve a estrutura interna e interações entre seus componentes. A estrutura é composta de elementos de software, das propriedades externamente visíveis desses elementos, e dos relacionamentos entre eles.

  - **Componentes**: partes que compõem a aplicação web. Exemplos: cliente, servidor, banco de dados, etc.
  - **Conectores**: mecanismos que permitem a comunicação entre os componentes. Exemplos: protocolos de comunicação, APIs, etc.
 - **Restrições**: regras que definem como os componentes e conectores podem interagir. Exemplos: autenticação, autorização, etc.
	

### 1.3. Modelos arquiteturais

Para o desenvolvimento de sistemas web, é fundamental que os desenvolvedores conheçam os modelos arquiteturais mais utilizados na indústria de software. Os modelos arquiteturais são padrões de arquitetura de software que definem a estrutura e o comportamento de um sistema de software. Os modelos arquiteturais são utilizados para facilitar o desenvolvimento de sistemas de software, pois eles definem a estrutura e o comportamento de um sistema de software.

#### 1.3.1. Arquitetura monolítica

A arquitetura monolítica é um padrão de arquitetura de software no qual a aplicação é implantada como uma única unidade totalmente integrada. A aplicação é implantada como __`uma única e grande base de código`__ que contém todas as funcionalidades.

A figura abaixo ilustra a arquitetura monolítica:

![Arquitetura monolítica](img/monolito.jpg)

As principais características de uma arquitetura monolítica são:

- __`Acoplamento forte`__: a aplicação é uma única unidade totalmente integrada, o que significa que qualquer alteração em um componente pode afetar outros componentes da aplicação.
- __`Escalabilidade limitada`__: a aplicação é implantada como uma única unidade, o que significa que todos os componentes da aplicação devem ser escalados juntos.
- __`Implantação única`__: a aplicação é implantada como uma única unidade, o que significa que todos os componentes da aplicação devem ser implantados juntos.
- __`Tecnologias limitadas`__: a aplicação é uma única unidade totalmente integrada, o que significa que todos os componentes da aplicação devem ser desenvolvidos usando a mesma linguagem de programação e tecnologias.
- __`Ciclo de vida limitado`__: a aplicação é uma única unidade totalmente integrada, o que significa que todos os componentes da aplicação devem ser desenvolvidos usando a mesma linguagem de programação e tecnologias.

Essas características acima podem ser consideradas como **desvantagens** de uma arquitetura monolítica. Contudo, a aplicação é uma única unidade totalmente integrada, o que significa que todos os componentes da aplicação são desenvolvidos usando a mesma linguagem de programação e tecnologias. Isso pode ser considerado como uma **vantagem** de uma arquitetura monolítica porque __`facilita o desenvolvimento, implantação, manutenção, testes e depuração da aplicação.`__

#### 1.3.2. Arquitetura de microsserviços

Os microsserviços são __`serviços pequenos, independentes e com baixo acoplamento`__. Assim, os microsserviços podem trabalhar em conjunto e podem ser implantados de forma independente e autónoma. Cada serviço é uma base de código separada, que pode ser gerida por uma pequena equipa de desenvolvimento. Uma única pequena equipa de programadores pode escrever e manter um determinado microsserviço.

A figura abaixo ilustra a arquitetura de microsserviços:

![Arquitetura de microsserviços](img/microservices.jpg)

### 1.3. Principais desafios e tendências