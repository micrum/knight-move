class User < ActiveRecord::Base
  has_many :games

  scope :with_name, -> { where("name <> ''") }

  validates_length_of :name, maximum: 50

  class << self
    def find_or_update_from_oauth(auth_hash)
      user = where(uid: auth_hash[:uid]).first
      user ||= where(name: auth_hash[:name]).first
      user ||= where(email: auth_hash[:email]).first
      if user.present?
        if user.provider != auth_hash[:provider]
          user.provider = auth_hash[:provider]
          user.uid = auth_hash[:uid]
          user.save
        end
      else
        user = User.find_by_uuid(auth_hash[:uuid])
        user.uid = auth_hash[:uid]
        user.name = auth_hash[:name]
        user.email = auth_hash[:email]
        user.email = auth_hash[:provider]
        user.save
      end
      user
    end
  end
end
