class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception

  before_filter :set_up_image

  private

  def set_up_image
    if params[:screenshot]
      render 'pages/image', layout: false
    end
  end

  def set_up_user
    uuid = params[:uuid] || request.cookies['user_uuid']
    @current_user = User.find_by_uuid(uuid)
    render status: 404, json: @controller.to_json unless @current_user
  end
end
