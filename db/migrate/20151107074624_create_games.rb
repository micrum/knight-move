class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.integer :score, default: 0
      t.integer :time, default: 0
      t.boolean :is_finished
      t.text :steps, array: true, default: []
      t.uuid :uuid, index: true

      t.references :user, index: true

      t.timestamps null: false
    end
  end
end
