class User < ActiveRecord::Base
  has_many :games

  scope :with_name, -> { where("name <> ''") }

  validates_length_of :name, maximum: 50

  class << self
    def find_or_update_from_oauth(auth_hash)
      user = User.find_by_uuid(auth_hash[:uuid])
      user ||= where(uid: auth_hash[:uid]).first
      user.name  ||= auth_hash[:info][:name]
      user.email ||= auth_hash[:info][:email]
      user.uid   ||= auth_hash[:uid]
      if user.provider != auth_hash[:provider]
        user.provider = auth_hash[:provider]
        user.uid = auth_hash[:uid]
        user.save
      end
    end
  end
end
