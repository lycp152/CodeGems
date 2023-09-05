module Api
    module V1
        class TipsController < ApplicationController
        before_action :set_tip, only: [:show, :update, :destroy]
  
        def index
          tips = Tip.order(created_at: :desc)
          render json: { status: 'SUCCESS', message: 'Loaded tips', data: tips }
        end
  
        def show
          render json: { status: 'SUCCESS', message: 'Loaded the tip', data: @tip }
        end
  
        def create
          tip = Tip.new(tip_params)
          if tip.save
            render json: { status: 'SUCCESS', data: tip }
          else
            render json: { status: 'ERROR', data: tip.errors }
          end
        end
  
        def destroy
          @tip.destroy
          render json: { status: 'SUCCESS', message: 'Deleted the tip', data: @tip }
        end
  
        def update
          if @tip.update(tip_params)
            render json: { status: 'SUCCESS', message: 'Updated the tip', data: @tip }
          else
            render json: { status: 'SUCCESS', message: 'Not updated', data: @tip.errors }
          end
        end
  
        private
  
        def set_tip
          @tip = Tip.find(params[:id])
        end
  
        def tip_params
          params.require(:tip).permit(:text,:skillId)
        end
      end
    end
  end
  