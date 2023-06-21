# Backend Challenge 20230105

## Introdução

Esta api será responsável por realizar buscas diariamente na Open Food Facts e armazená-las no banco de dados.

### Etapas do desenvolvimento

1º dia:
- Nesta primeira etapa, irei ler o README do desafio e preparar o ambiente para o desenvolvimento. Irei utilizar o Nest.js para a criação da api, para a base de dados, irei utilizar o postgres sql, embora a ênfase do desafio seja o MongoDB, eu irei utilizar o que estou mais ambientado, assim, posso produzir em maior tempo (mesmo sabendo que para este cenário um noSql seria mais performático) e não perderei um tempo maior da entrega do projeto.
- Gerei a estrutura base do projeto conforme mencionado.
- Dei inicio ao job com a leitura e parse dos dados necessários e preparei os repositórios para o typeorm. Para amanhã, irei implementar a lógica de controle do processamento na nossa base de dados para assim adentrar em maioires detalhes.

2º dia:
- Fiz a implementação 100% funcional do parse e formatação dos dados para importá-los no banco de dados
- Realizei umas adaptações no funcionamento do Cron Job, isto porquê há arquivos muito grandes para busca e inserção. A princípio, o endpoint que utilizamos para buscar os arquivos possui uma limitação para stream dos dados. Essa limitação gera um 403 e demora um pouco a funcionar novamente. Assim, implementei uma espécie de estado para o job, armazenando um contador para o controle de quantos arquivos serão solicitados por dia afim de manter os 100 produtos propostos no desafio. Também realizei um controle pela data após exceder o limite de arquivos lidos no dia, assim, mesmo que o cron rode em segundo plano, ele não irá realizar nenhuma tarefa e manterá os 100 produtos por arquivo ao dia. Obs: o Cron irá disparar a cada uma hora por dia, porém, irá realizar apenas as importações necessárias no período.
- Adicionei uma tabela para controlar em qual linha(estado) se encontra o arquivo para o processamento. Vale ressaltar que a busca do arquivo é armazenada em disco, porquê é imprevisível saber uma determinada linha de um buffer e assim ficaria difícil de manipular os chunks sem gerar alguma má formatação. E o nosso arquivo é muito grande para manipulá-lo em memória, o que acaba derrubando a aplicação.
- Implementei uma tabela que irá armazenar a performance da execução dos meus jobs.
- Estou implementando a rota de health check para exibir o estado do banco de dados e o último registro de performance do job. Amanhã irei finalizar esta etapa e fazer os ajustes finais para a entrega do desafio.

3º dia:
- Implementei as rotas de GET, PUT e DELETE
- Adicionei alguns logs para a execução do job
- Implementei o health check com o ping para o banco de dados e a busca das últimas informações de performance do job
- Fiz um teste na api de modo prático e está tudo ok
- Realizei algumas refatorações
- Adicionei um rate limiter para os endpoints de produtos e health check
- Adicionei um middleware que redireciona as conexoes para do host para a documentação do swagger




This is a challenge by [Coodesh](coodesh.com)




