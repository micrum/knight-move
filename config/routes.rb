Rails.application.routes.draw do
  root 'pages#home'

  post 'users', to: 'users#create'
  get 'users', to: 'users#show'
  put 'users', to: 'users#update'

  get '/auth/:provider/callback', to: 'users#create'

  get 'about', to: 'pages#about'

  post 'games', to: 'games#create'
  get 'games', to: 'games#show'
  put 'games', to: 'games#update'
  get 'position', to: 'games#position'
  get 'scoreboard', to: 'games#scoreboard'
end
