class CreateGemSkins < ActiveRecord::Migration[7.0]
  def change
    create_table :gem_skins do |t|
      t.string :name
      t.string :imageUrl
      t.integer :categoryId

      t.timestamps
    end
  end
end
