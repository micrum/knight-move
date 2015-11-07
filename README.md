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


API:
To create a User: <tt>POST http://localhost:3000/users?name=#{name}</tt> - respond will contain uuid