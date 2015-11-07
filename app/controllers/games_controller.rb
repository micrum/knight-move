class GamesController < ApplicationController

  before_filter :set_up_user, except: [:scoreboard]
  before_filter :set_up_game, except: [:create, :scoreboard]


  def create
    @current_game = Game.create(
      uuid: SecureRandom.uuid,
      user: @current_user
    )

    render json: { uuid: @current_game.uuid }
  end


  def show
    render json: { game: @current_game.game_stats }
  end


  def save_steps
    time  = params[:time]
    steps = JSON.parse(params[:steps])

    if @current_game.update_attributes(time: time, steps: steps)
      render status: 200, json: @controller.to_json
    else
      render status: 406, json: @controller.to_json
    end
  end


  def position
    render json: { position: @current_game.position }
  end


  def scoreboard
    top_games    = Game.top_scores
    @top_results = top_games.map { |tg| { score:     tg.score,
                                          time:      tg.time,
                                          user_name: tg.user.name } }
    render json: { top_games: @top_results }
  end


  private

  def set_up_game
    @current_game = Game.find_by_uuid(params[:game_uuid])
  end


end
