class Game < ActiveRecord::Base

  belongs_to :user

  scope :finished, -> { where(is_finished: true) }

  before_save :validate_time, :validate_steps


  def self.top_scores
    Game.joins(:user).order('score DESC, time ASC').limit(20)
  end


  def validate_time
    new_time = self.time
    old_time = changed_attributes[:time]

    return true if old_time.nil?

    new_time > old_time
  end


  def validate_steps
    result = true

    self.steps.each_with_index do |step, index|
      result = valid_next_step?(step, steps[index])
      break unless result
    end
    result
  end


  def game_stats
    { steps: steps, time: time }
  end


  def position
    uuids = Game.where('score >= ?', score).order('score DESC, time ASC').select('uuid')
    uuids.index { |u| u.uuid == uuid }
  end


  private

  def valid_next_step?(cur_coords, next_coords)
    return true if next_coords.nil?

    x = (cur_coords[0] - next_coords[0]).abs
    y = (cur_coords[1] - next_coords[1]).abs

    if (x == 1 && y == 2) || (x == 2 && y == 1)
      true
    else
      false
    end
  end

end
