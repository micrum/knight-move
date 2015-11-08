class Game < ActiveRecord::Base

  belongs_to :user

  scope :finished, -> { where(is_finished: true) }

  before_save :validate_time, :validate_steps


  def self.top_scores
    Game.joins(:user).where("users.name <> ''").order('score DESC, time ASC').limit(20)
  end


  def game_stats
    { steps: steps, time: time }
  end


  def position
    uuids = Game.joins(:user).where('score >= ?', score).where("users.name <> ''").order('score DESC, time ASC').select('uuid')
    uuids.index { |u| u.uuid == uuid } + 1
  end


  private

  def validate_time
    new_time = self.time
    old_time = changed_attributes[:time]

    return true if old_time.nil?

    new_time > old_time
  end


  def validate_steps
    result = true

    self.steps.each_with_index do |step, index|
      result = valid_next_step?(step, steps[index + 1])
      break unless result
    end
    result
  end


  def valid_next_step?(cur_coords_str, next_coords_str)
    return true if next_coords_str.nil?

    cur_coords = cur_coords_str.split(',')
    next_coords = next_coords_str.split(',')

    x = (cur_coords[0].to_i - next_coords[0].to_i).abs
    y = (cur_coords[1].to_i - next_coords[1].to_i).abs

    if (x == 1 && y == 2) || (x == 2 && y == 1)
      true
    else
      false
    end
  end

end
