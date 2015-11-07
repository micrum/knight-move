class UsersController < ApplicationController

  before_filter :set_up_user, except: [:create]


  def create
    @current_user = User.create(
      name: params[:name],
      uuid: SecureRandom.uuid
    )

    render json: { uuid: @current_user.uuid }
  end

end
