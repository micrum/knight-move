class UsersController < ApplicationController

  before_filter :set_up_user, except: [:create]


  def create
    @current_user = User.create(
      name: params[:name],
      uuid: SecureRandom.uuid
    )

    render json: { uuid: @current_user.uuid }
  end

  def external_auth
    @current_user = User.find_or_update_from_oauth(auth_hash.merge(uuid: @current_user.uuid))

    respond_to do |format|
      format.json { render :json => { uuid: @current_user.uuid } }
    end
  end

  private

  def auth_hash
    request.env['omniauth.auth']
  end

  def set_up_user
    @current_user = User.find_by_uuid(params[:uuid])
  end
end
