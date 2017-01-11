Rails.application.routes.draw do
  devise_for :users
  root to: "dashboard#index"

  # These supercede the other /customers routes, so must
  # come before reource :customers
  get "customers/ng", to: "customers#ng"
  get "customers/ng/*angular_route", to: "customers#ng"
  resources :customers, only: [ :index ]
  # Angular test route to make sure Angular was properly installed to work with Rails
  # get "angular_test", to: "angular_test#index"
end
