# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_09_04_230423) do
  create_table "accounts", force: :cascade do |t|
    t.string "name"
    t.integer "skin1"
    t.integer "skin2"
    t.integer "skin3"
    t.integer "skin4"
    t.integer "skin5"
    t.integer "skin6"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "gem_skins", force: :cascade do |t|
    t.string "name"
    t.string "imageUrl"
    t.integer "categoryId"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "ranks", force: :cascade do |t|
    t.integer "score"
    t.string "account_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "skincategories", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tips", force: :cascade do |t|
    t.string "text"
    t.integer "skillId"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
