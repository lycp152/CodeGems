module Api
    module V1
        class SkincategorysController < ApplicationController
        before_action :set_skincategory, only: [:show, :update, :destroy]
  
        def index
          skincategorys = Skincategory.order(created_at: :desc)
          render json: { status: 'SUCCESS', message: 'Loaded skincategorys', data: skincategorys }
        end
  
        def show
          render json: { status: 'SUCCESS', message: 'Loaded the skincategory', data: @skincategory }
        end
  
        def create
          skincategory = Skincategory.new(skincategory_params)
          if skincategory.save
            render json: { status: 'SUCCESS', data: skincategory }
          else
            render json: { status: 'ERROR', data: skincategory.errors }
          end
        end
  
        def destroy
          @skincategory.destroy
          render json: { status: 'SUCCESS', message: 'Deleted the skincategory', data: @skincategory }
        end
  
        def update
          if @skincategory.update(skincategory_params)
            render json: { status: 'SUCCESS', message: 'Updated the skincategory', data: @skincategory }
          else
            render json: { status: 'SUCCESS', message: 'Not updated', data: @skincategory.errors }
          end
        end
  
        private
  
        def set_skincategory
          @skincategory = Skincategory.find(params[:id])
        end
  
        def skincategory_params
          params.require(:skincategory).permit(:name)
        end
      end
    end
  end
  