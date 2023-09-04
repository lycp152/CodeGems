class GemSkinsController < ApplicationController
end
module Api
    module V1
        class Gem_skinsController < ApplicationController
        before_action :set_gem_skin, only: [:show, :update, :destroy]
  
        def index
          gem_skins = Gem_skin.order(created_at: :desc)
          render json: { status: 'SUCCESS', message: 'Loaded gem_skins', data: gem_skins }
        end
  
        def show
          render json: { status: 'SUCCESS', message: 'Loaded the gem_skin', data: @gem_skin }
        end
  
        def create
          gem_skin = Gem_skin.new(gem_skin_params)
          if gem_skin.save
            render json: { status: 'SUCCESS', data: gem_skin }
          else
            render json: { status: 'ERROR', data: gem_skin.errors }
          end
        end
  
        def destroy
          @gem_skin.destroy
          render json: { status: 'SUCCESS', message: 'Deleted the gem_skin', data: @gem_skin }
        end
  
        def update
          if @gem_skin.update(gem_skin_params)
            render json: { status: 'SUCCESS', message: 'Updated the gem_skin', data: @gem_skin }
          else
            render json: { status: 'SUCCESS', message: 'Not updated', data: @gem_skin.errors }
          end
        end
  
        private
  
        def set_gem_skin
          @gem_skin = .find(params[:id])
        end
  
        def gem_skin_params
          params.require(:gem_skin).permit(:name,:imageUrl,:categoryId)
        end
      end
    end
  end
  