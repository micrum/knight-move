class CreateSteps < ActiveRecord::Migration
  def change
    create_table :steps do |t|
      t.integer :x_pos
      t.integer :y_pos

      t.references :game, index: true

      t.timestamps null: false
    end
  end
end
