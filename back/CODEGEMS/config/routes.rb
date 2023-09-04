Rails.application.routes.draw do
  post "/graphql", to: "graphql#execute"
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: '/graphql'
  end
  post '/login/oauth/github', to: 'github_oauth#login'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  namespace 'api' do
    namespace 'v1' do
      resources :ranks
      resources :accounts
      resources :tips
      resources :gemskins
      get '/github' =>  'github#index'
    end
  end
end
