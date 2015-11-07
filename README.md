## Getting started

We use rails-dotenv so you need to create

```
.env.test
.env.development
```

with variables

```
POSTGRESQL_HOST=#{your_hostname} # localhost usually
POSTGRESQL_USERNAME=#{your_username}
POSTGRESQL_PASSWORD=#{your_password}
```

To run migrations use: <tt>rake db:migrate:reset</tt>

To run migrations on production use:
```
heroku pg:reset DATABASE_URL
heroku run rake db:migrate
```


## API:

USER

To create a User: `POST http://localhost:3000/users?name=#{name}` - respond will contain uuid

GAME

To create a Game: `POST http://localhost:3000/games` - respond will contain uuid

To get game by uuid: `GET http://localhost:3000/games?game_uuid=#{uuid}`

To save game stats: `GET http://localhost:3000/games?game_uuid=#{uuid}&time=#{time}&steps=#{steps}`

To retrieve scoreboard(top20 games): `GET http://localhost:3000/scoreboard`