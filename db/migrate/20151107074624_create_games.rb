class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.integer :score
      t.datetime :time

      t.references :user, :index => true

      t.timestamps null: false
    end
  end
end
