class UsersController < ApplicationController

  before_filter :set_up_user, except: [:create]


  def create
    @current_user = User.create(uuid: SecureRandom.uuid)

    render json: { uuid: @current_user.uuid }
  end


  def update
    if @current_user.update_attributes(name: params[:name])
      render status: 200, json: @controller.to_json
    else
      render status: 406, json: @controller.to_json
    end
  end


  def show
    render json: { name: @current_user.name }
  end


  def external_auth
    @current_user = User.find_or_update_from_oauth(auth_hash.merge(uuid: @current_user.uuid))

    redirect_to root_path
  end


  private

  def auth_hash
    request.env['omniauth.auth']
  end
end
