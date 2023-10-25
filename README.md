# chat-telegram-flashvolve
Boas vindas ao Chat Telegram Flashvolve, o site onde pode se registrar e conversar com usuários e grupos do telegram em tempo real!

## Objetivos:

Construir uma solução que permita aos usuários interagir com chats ou grupos do Telegram através de uma interface web e um backend robusto.

## Acessar o deploy da aplicação:

[Clique aqui](https://chat-telegram-flashvolve-danieldaher.vercel.app/) para ver o deploy desta aplicação.

Atente-se que o servidor pode estar em hibernação, fazendo com que o login demore até mesmo 2 minutos.

Se preferir, pode instalar e rodar a aplicação localmente em sua máquina seguindo o passo-a-passo adiante.

## Como rodar a aplicação no computador:

#### Seu computador precisa de Git (para versionamento do código), Node.js & npm (para executar a aplicação) e MongoDB (que será nosso banco de dados). Clique nos links, caso ainda não tenha instalado algum desses:

 - [ ] [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
 - [ ] [Node.js e npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
 - [ ] [MongoDB](https://docs.mongodb.com/manual/installation/)

- O **MongoDB** precisa estar ativo para que a aplicação funcione. Digite o seguinte comando no terminal, para verificar isso:
`sudo service mongod status`.

  Caso a propriedade **Active** não esteja como *Active(running)* digite no terminal `sudo service mongod start`. Talvez o sistema te peça sua senha de usuário. Basta digitar, sabendo que os caracteres de senha não aparecem no terminal.

Agora sim estamos prontos para instalar o projeto.

## Instalando a aplicação:

1. Primeiro, abra um novo terminal e clone o repositório utilizando o comando 
`git clone git@github.com:DanielDaher/chat-telegram-flashvolve.git`

2. Em seguida, digite `cd chat-telegram-flashvolve` para entrar no diretório (pasta) do projeto, que acabou de ser criada.

3. Vá para a pasta do Backend, rodando `cd backend` no terminal, e execute `npm install` para instalar as dependências necessárias.

4. Crie, dentro da pasta `backend`, um arquivo com o nome `.env` e coloque as seguintes variáveis (uma por linha):
  `MONGO_URL=mongodb://127.0.0.1:27017`
  `PORT=3001`
  `TOKEN_SECRET=segredodotoken`
  `FRONTEND_URL=http://localhost:8080`
 Salve as modificações!

5. Com o comando `npm run dev`, o backend da aplicação já estará funcionando. Aguarde alguns segundos, que o terminal mostrará a mensagem "Ouvindo a porta 3001", o que significa que está tudo certo. Lembrando que, para executar este passo é necessário que seu **MongoDB** esteja ativo.

6. Abra outro terminal (para não interromper o backend, que deve continuar rodando) e acesse a pasta do projeto novamente.

7. Agora, ao invés de entrar na pasta do backend, vamos para o frontend com o comando `cd chat-flashvolve` no terminal.

8. Instale mais dependências com `npm install`

9. Crie, dentro da pasta `chat-flashvolve`, um arquivo com o nome `.env` e coloque as seguintes variáveis (uma por linha):
  `VUE_APP_API_URL= http://localhost:3001`
 Salve as modificações!

10. Ao término da etapa anterior, rode no terminal `npm run serve`. Isto pode demorar alguns segundos, aguarde até que o terminal te informe `Compiled sucessfully`. Então você pode abrir seu navegador e digitar a url http://localhost:8080. Ou então, basta clicar na url que o terminal apresenta na opção `Local: `.

11. E agora é só desfrutar do site!-la

## Como usar o site?

O site exibe, incialmente, uma tela de login. Caso ainda não tenha uma conta, marque a opção correspondente.

Em seguida, é só digitar usuário e senha e entrar (caso esteja usando a versão deste app que está online, isto pode demorar alguns minutos, pois o servidor costuma demorar para se iniciar).

Atente-se que o nome de usuário precisa ter mais que 2 caracterres, enquanto a senha precisa ter mais que 4.

Uma vez logado, é possível selecionar conversas e interagir em tempo real com usuários e grupos do telegram.

Caso não tenha nenhuma conversa na tela, você pode clicar no botão `Telegram Bot`. Uma nova janela abrirá, onde você pode entrar no telegram e chamar o bot você mesmo, para testar que a aplicação funciona. A mensagem enviada chegará em tempo real.