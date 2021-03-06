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
heroku pg:reset DATABASE_URL --confirm tranquil-bayou-6575
heroku run rake db:migrate
```


## API:

USER

To create a User: `POST http://localhost:3000/users?name=#{name}` - respond will contain uuid

To update User name: `PUT http://localhost:3000/users?uuid=#{uuid}&name=#{name}`

To get User name: `GET http://localhost:3000/users?uuid=#{uuid}`

GAME

To create a Game: `POST http://localhost:3000/games` - respond will contain uuid

To get game by uuid: `GET http://localhost:3000/games?game_uuid=#{uuid}`

To save game stats: `PUT http://localhost:3000/games?uuid=#{user_uuid}&game_uuid=#{uuid}&time=#{time}&steps=#{steps}`

To retrieve position of current game: `GET http://localhost:3000/position?game_uuid=#{uuid}`

To retrieve scoreboard(top20 games): `GET http://localhost:3000/scoreboard`