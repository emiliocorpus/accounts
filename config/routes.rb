Rails.application.routes.draw do
  resources :records
    root 'records#index'
    get '/about' => 'welcome#about', as: :about
end
