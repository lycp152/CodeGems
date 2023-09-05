Rails.application.routes.draw do
  post '/login/oauth/github', to: 'github_oauth#login'
end