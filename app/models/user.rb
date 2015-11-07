class User < ActiveRecord::Base
  has_many :games

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
      end
      user
    end
  end
end
