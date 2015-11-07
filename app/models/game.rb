class Game < ActiveRecord::Base

  belongs_to :user
  has_many :steps

  scope :finished, -> { where(is_finished: true) }
end
