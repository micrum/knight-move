Rails.application.routes.draw do
  root 'pages#home'

  post 'users', to: 'users#create'
  get '/auth/:provider/callback', to: 'users#create'

  get 'about', to: 'pages#about'
  #get 'scores', to: 'pages#scores'

  get 'scoreboard', to: 'games#scoreboard'
end
