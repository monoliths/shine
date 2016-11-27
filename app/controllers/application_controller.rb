class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  # All pages and actions should be restricted
  before_action :authenticate_user!
end
