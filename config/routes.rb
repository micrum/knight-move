Rails.application.routes.draw do
  root 'pages#home'

  post 'users', to: 'users#create'
  get '/auth/:provider/callback', to: 'users#create'

  get 'about', to: 'pages#about'

  post 'games', to: 'games#create'
  get 'games', to: 'games#show'
  post 'save_steps', to: 'games#save_steps'
  get 'position', to: 'games#position'
  get 'scoreboard', to: 'games#scoreboard'
end
