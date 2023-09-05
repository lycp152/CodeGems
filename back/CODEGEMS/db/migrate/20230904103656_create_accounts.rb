class CreateAccounts < ActiveRecord::Migration[7.0]
  def change
    create_table :accounts do |t|
      t.string :name
      t.integer :skin1
      t.integer :skin2
      t.integer :skin3
      t.integer :skin4
      t.integer :skin5
      t.integer :skin6

      t.timestamps
    end
  end
end
