# Fitness Foods LC - API

## Introdução

Está API faz parte do desafio proposto pela [Teddy Open Finance](https://teddydigital.io/). Irá importar produtos da API pública [Open Food Facts](https://world.openfoodfacts.org/) através de rotinas administradas com o Cron e armazená-las no banco de dados da Fitness Foods LC.

[Link da apresentação](https://www.loom.com/embed/1f7822ad4aa8480eb245acb1338dd36e)

### Etapas do desenvolvimento

**1º dia:**
- Nesta primeira etapa, irei ler o README do desafio e preparar o ambiente para o desenvolvimento. Irei utilizar o [Nestjs](https://nestjs.com/) para a criação da api, para a base de dados, irei utilizar o [PostgreSQL](https://www.postgresql.org/), embora a ênfase do desafio seja o [MongoDB](https://www.mongodb.com/), eu irei utilizar o que estou mais ambientado, assim, posso produzir em maior tempo (mesmo sabendo que para este cenário um noSql poderia ser mais performático em alguns casos) e não perderei um tempo maior para a entrega do projeto.
- Gerei a estrutura base do projeto conforme mencionado.
- Dei inicio ao job com a leitura e parse dos dados necessários e preparei os repositórios para o typeorm. Para amanhã, irei implementar a lógica de controle do processamento na nossa base de dados para assim adentrar em maioires detalhes.

**2º dia:**
- Fiz a implementação 100% funcional do parse e formatação dos dados para importá-los no banco de dados
- Realizei umas adaptações no funcionamento do Cron Job, isto porquê há arquivos muito grandes para busca e inserção. A princípio, o endpoint que utilizamos para buscar os arquivos possui uma limitação para stream dos dados. Essa limitação gera um 403 e demora um pouco a funcionar novamente. Assim, implementei uma espécie de estado para o job, armazenando um contador para o controle de quantos arquivos serão solicitados por dia afim de manter os 100 produtos propostos no desafio. Também realizei um controle pela data após exceder o limite de arquivos lidos no dia, assim, mesmo que o cron rode em segundo plano, ele não irá realizar nenhuma tarefa e manterá os 100 produtos por arquivo ao dia. Obs: o Cron irá disparar a cada uma hora por dia, porém, irá realizar apenas as importações necessárias no período.
- Adicionei uma tabela para controlar em qual linha(estado) se encontra o arquivo para o processamento. Vale ressaltar que a busca do arquivo é armazenada em disco, porquê é imprevisível saber uma determinada linha de um buffer e assim ficaria difícil de manipular os chunks sem gerar alguma má formatação. E o nosso arquivo é muito grande para manipulá-lo em memória, o que acaba derrubando a aplicação.
- Implementei uma tabela que irá armazenar a performance da execução dos meus jobs.
- Estou implementando a rota de health check para exibir o estado do banco de dados e o último registro de performance do job. Amanhã irei finalizar esta etapa e fazer os ajustes finais para a entrega do desafio.

**3º dia:**
- Implementei as rotas de GET, PUT e DELETE
- Adicionei alguns logs para a execução do job
- Implementei o health check com o ping para o banco de dados e a busca das últimas informações de performance do job
- Fiz um teste na api de modo prático e está tudo ok
- Realizei algumas refatorações
- Adicionei um rate limiter para os endpoints de produtos e health check
- Adicionei um middleware que redireciona as conexoes para do host para a documentação do swagger
- Adicionei o middleware para validar uma x-api-key nas requisições
- Corrigi o problema que causava 403 e não tinha a ver com o servidor barrando minhas conexões, era apenas implementação incorreta de minha parte
- Corrigi o cálculo para o processamento médio do uso da CPU
- Adicionei testes de integração para as rotas GET, PUT e DELETE dos products. Optei por integração ao invés de unitário porquê acredito que não havia muito o que testar nos meus services, sendo assim, os testes de integração já cobrem o necessário para o momento. Não implementei testes para o job pois levaria maior complexidade de tempo, mas realizei vários testes práticos para garantir o funcionamento adequado
- Realizei alguns ajustes finais para apresentação, o projeto está finalizado

## Tecnologias utilizadas

- [Nestjs](https://nestjs.com/)
- [Docker](https://www.docker.com/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Jest](https://jestjs.io/)
- [Swagger](https://swagger.io/)
- [Beekeeper Studio](https://www.beekeeperstudio.io/)
- [Postman](https://www.postman.com/)

## Instruções

Primeiramente faça a clonagem deste repositório, você pode cloná-lo via ssh ou https que será o exemplo abordado aqui. Abaixo o comando para o clone:

```shell
git clone https://github.com/RodrigoCarmo/teddy-open-finance-challenge.git
```


**Observação**: Antes de mais nada, é preciso se atentar ao .env, ele é crucial para o funcionamento do projeto e principalmente do job schedule. As variáveis `JOB_STATE` e `DATE_TO_PAUSE_JOB` devem ser mantidas em branco, elas serão preenchidas em tempo de execução e manipuladas da forma necessária para a execução do job.


Para este projeto, nós utilizaremos o [Docker](https://www.docker.com/) para provisionarmos nossos containers e não nos preocuparmos com toda aquela configuração massante que pode ocasionar falhas entre os executantes do projeto. O nosso projeto será orquestrado pelo `Docker Compose`. O nosso projeto já executa a instalação do `node_modules` ao executar o `Docker Compose.`

```shell
docker-compose up
```

Caso queira eliminar os containers executados:

```shell
docker-compose down
```

Outro detalhe importante a ressaltar é que nossas migrations estão rodando sempre que iniciamos a aplicação e isso é recomendado apenas em ambiente de desenvolvimento.


Se você configurou corretamente as variáveis para o .env como no exemplo abaixo, o projeto está pronto para ser usado:

```
## NESTJS SERVER
HOST=localhost
PORT=3001
API_KEY=3VsOzHXdZENU5Tbjl9W6DpHg8BCgZVb0

## CRON STATE NODEJS, DEIXAR AS VARIAVEIS VAZIAS
JOB_STATE=
DATE_TO_PAUSE_JOB=

## DATABASE POSTGRES
PORT_PG=5432
HOST_PG=teddy_open_db
USERNAME_PG=teddy
PASSWORD_PG=12345678
DATABASE_PG=teddy_open_db

## OPEN FOOD FACTS
AVAILABLE_FILENAMES_URL=https://challenges.coode.sh/food/data/json/index.txt
FILENAME_URL=https://challenges.coode.sh/food/data/json/
```

Para acessar a nossa documentação de endpoints, você pode abrir através do navegador na seguinte rota `https://localhost:<PORTA>` e você será redirecionado para ela. Lá você obterá as rotas que poderá requisitar.

## Funcionamento do Job

Realizei algumas mudanças para o uso do cron nativo do [Nestjs](https://nestjs.com/), em resumo, nosso job será executado a cada 1 hora, mas calma, ele não vai fazer nenhuma requisição ou nada complexo que demande processamento demasiado. O job apenas usará aquelas variáveis que deixamos em branco no início para checar se um arquivo X já foi processado e também se todos os arquivos disponíveis já foram processados no dia. Temos o limite proposto pelo desafio de 100 importações por dia, assim, importamos 100 registros de cada arquivo disponível e paramos nosso processamento até o dia seguinte.


Como os arquivos buscados são enormes, tive alguns problemas no processamento do Buffer, isto porquê é imprevisível saber quantas linhas o Buffer possui e poder determinar os trechos que precisamos do [JSONL](https://jsonlines.org/) para processar por parte. E também há o fato de quê ao processar com uma stream os nossos chunks podem quebrar em partes erradas do nossos [JSONL](https://jsonlines.org/) e isso gerar uma formatação inválida no final, logo, optei por salvar o nosso arquivo primeiramente em disco, processá-lo, fazer o salvamento na nossa base de dados e excluí-lo.


Para controlar o processamento eu incluí duas tabelas, uma para gerenciar os arquivos e outra para podermos obter dados referentes ao processo dos mesmos. Na tabela de `files_manager` nós armazenamos o estado do nosso arquivo e algumas outras informações, ou seja, em qual linha nós paramos para a próxima rotina do job. Na `jobs_performance` nós armazenamos registros de performance da execução e o status da execução, se foi sucedida ou obteve erro. Caso ocorra um erro, o arquivo será processado na próxima rotina.

## Testes de integração

Basta executar: 

```shell
npm run test
```

ou

```shell
yarn test
```

Se você não tiver o [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/) e não quiser instalar localmente, basta entrar no nosso container da seguinte maneira:

```shell
docker container exec -it teddy_open_api bash
```

Pronto, agora você poderá rodar lá dentro.

## Conclusão

É isso, o meu caminho neste desafio chegou ao fim, agora vamos esperar o retorno da Teddy 🙂



This is a challenge by [Coodesh](https://coodesh.com/)




