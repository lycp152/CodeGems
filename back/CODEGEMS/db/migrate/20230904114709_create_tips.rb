class CreateTips < ActiveRecord::Migration[7.0]
  def change
    create_table :tips do |t|
      t.string :text
      t.integer :skillId

      t.timestamps
    end
  end
end
