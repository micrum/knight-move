class UsersController < ApplicationController

  before_filter :set_up_user, except: [:create]


  def create
    @current_user = User.create(
      name: params[:name],
      uuid: SecureRandom.uuid
    )

    respond_to do |format|
      format.json { render :json => { uuid: @current_user.uuid } }
    end
  end


  def create_game

  end


  private

  def set_up_user
    @current_user = User.find_by_uuid(params[:uuid])
  end
end
