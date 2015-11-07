class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.integer :score
      t.datetime :time
      t.boolean :is_finished
      t.text :tags, array: true, default: []

      t.references :user, index: true

      t.timestamps null: false
    end
  end
end
