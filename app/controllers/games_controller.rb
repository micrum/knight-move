class GamesController < ApplicationController

  def scoreboard
    @top_games = Game.top_scores
    respond_to do |format|
      format.json { render :json => { top_games: @top_games } }
    end
  end
end
