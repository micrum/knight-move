class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception

  private

  def set_up_user
    @current_user = User.find_by_uuid(params[:uuid])
  end
end
