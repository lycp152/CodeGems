module Api
    module V1
        class RanksController < ApplicationController
        before_action :set_rank, only: [:show, :update, :destroy]
  
        def index
          ranks = Rank.order(created_at: :desc)
          render json: { status: 'SUCCESS', message: 'Loaded ranks', data: ranks }
        end
  
        def show
          render json: { status: 'SUCCESS', message: 'Loaded the rank', data: @rank }
        end
  
        def create
          rank = Rank.new(rank_params)
          if rank.save
            render json: { status: 'SUCCESS', data: rank }
          else
            render json: { status: 'ERROR', data: rank.errors }
          end
        end
  
        def destroy
          @rank.destroy
          render json: { status: 'SUCCESS', message: 'Deleted the rank', data: @rank }
        end
  
        def update
          if @rank.update(rank_params)
            render json: { status: 'SUCCESS', message: 'Updated the rank', data: @rank }
          else
            render json: { status: 'SUCCESS', message: 'Not updated', data: @rank.errors }
          end
        end
  
        private
  
        def set_rank
          @rank = Rank.find(params[:id])
        end
  
        def rank_params
          params.require(:rank).permit(:name,:score)
        end
      end
    end
  end
  