class Game < ActiveRecord::Base

  belongs_to :user

  scope :finished, -> { where(is_finished: true) }


  def self.top_scores
    Game.joins(:user).order('score ASC, time DESC').limit(20)
  end

end
