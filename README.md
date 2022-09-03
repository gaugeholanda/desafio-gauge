# Desafio-gauge


# Feature iniciando  o sistema administrativo

## [Tarefa 1] - Desenvolvimento da infraestrutura utilizando Docker [INFRA]
Você terá a missão de criar um ecossistema Docker com pelo menos três serviços:
- api – A porta externa de acesso ao serviço deve ser escolhida por meio de uma variável de ambiente.
- db – serviço para acomodar o mongodb, os dados do banco deverão ficar persistidos em um volume.
- app – front end escrito em Typescript utilizando angular 13 ou superior.

## [Tarefa 2] - Modelagem do banco de dados [DB]
Você terá que criar um modelo de dados para armazenar o link do banner bem como o slug da loja da empresa cliente, contendo pelo menos as seguintes regras:
- o slug da loja deve ser obrigatório.
- deverá conter um campo para armazenar a url de um banner adicionado

## [Tarefa 3] - Desenvolvimento da funcionalidade de adicionar banners [API]
Você terá que criar um endpoint que receba um arquivo e o armazene localmente para o respectivo slug da empresa cliente que deverá ser informado como parâmetro na uri do endpoint.
- Criar endpoint POST /store/:slug/banners
- Se a loja com o determinado slug não existir na coleção do banco de dados a mesma deverá ser criada e se existir deverá ser feito uma atualização na mesma com o novo banner.
- O banner será armazenado localmente.
- O banner deve ter as dimensões de 343 de largura e 430 de altura.
- Somente serão aceitos banners no formato jpg.
- O slug da empresa cliente não pode ser maior que 30 caracteres e nem conter caracteres especiais.
- Deverá ser retornado o status code 201 bem como o link do banner salvo localmente na api.

## [Tarefa 4] - Desenvolvimento da tela de upload de banners [APP]
 Você terá que elaborar uma tela em que seja possível realizar o upload de um banner de acordo com o layout criado pela equipe de design.
 - Você estará livre para utilizar a biblioteca de css ou de componentes que desejar.
 - Utilize a metodologia de Atomic Design.

# Layout da tela de upload de banners
