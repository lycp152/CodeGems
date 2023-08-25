class CreateRanks < ActiveRecord::Migration[7.0]
  def change
    create_table :ranks do |t|
      t.string :name
      t.integer :score

      t.timestamps
    end
  end
end
