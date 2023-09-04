class GemSkin < ApplicationRecord
    belongs_to :skincategory
    has_many :tips
end
