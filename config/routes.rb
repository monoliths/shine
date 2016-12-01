Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "dashboard#index"
  resources :customers, only: [ :index ]

  # Angular test route to make sure Angular was properly installed to work with Rails
  get 'angular_test', to: "angular_test#index"



  # Routes to Angular static components
  get 'customer-search.component.html', to: redirect('/components/customer/customer-search.component.html')
end
