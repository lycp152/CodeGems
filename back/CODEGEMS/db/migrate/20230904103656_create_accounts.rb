class CreateAccounts < ActiveRecord::Migration[7.0]
  def change
    create_table :accounts do |t|
      t.string :name
      t.string :skin1
      t.string :skin2
      t.string :skin3
      t.string :skin4
      t.string :skin5
      t.string :skin6

      t.timestamps
    end
  end
end
