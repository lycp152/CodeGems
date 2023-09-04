class CreateRanks < ActiveRecord::Migration[7.0]
  def change
    create_table :ranks do |t|
      t.integer :score
      t.string :account_id

      t.timestamps
    end
  end
end
