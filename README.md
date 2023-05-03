# kenzie-cars-back
<!-- 1. Título
2. Descrição
3. Sumário (opcional)
4. Instalação e execução do projeto
5. Uso do projeto
6. Inclusão de créditos
7. Inclusão de uma licença
Adicionais
8. Badges
9. Contribuição com o projeto
10. Inclusão de testes -->

Kenzie Cars é uma API desenvolvida para guardar e fornecer informações relacionadas a compra e venda de automóveis, novos ou usados. Dentre as funcionalidades, é possível executar o CRUD (criação, leitura, atualização e exclusão) de usuários, anúncios e comentários. Também é possível escolher o tipo de usuário no momento do cadastro (vendedor ou usuário comum). Algumas das funcionalidades da página estão disponíveis somente para usuários vendedores de automóveis.


# Instalação

Para instalar os arquivos existentes na aplicação, é necessário executar o seguinte comando:
```bash
yarn
```
Em seguida, é necessário criar um arquivo ``.env`` na raiz do projeto, preenchendo com os dados existentes em ``.env.example``. Em seguida, é necessário executar as migrações das tabelas para o banco de dados. Isso pode ser feito através dos comandos:
``` bash
# para gerar as migrações
yarn typeorm:generate

# para persistir as migrações
yarn typeorm:run
```