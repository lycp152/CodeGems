
module Api
    module V1
        class AccountsController < ApplicationController
        before_action :set_account, only: [:show, :update, :destroy]
  
        def index
          accounts = Account.order(id: :asc)
          render json: { status: 'SUCCESS', message: 'Loaded accounts', data: accounts }
        end
  
        def show
          render json: { status: 'SUCCESS', message: 'Loaded the account', data: @account }
        end
  
        def create
          account = Account.new(account_params)
          if account.save
            render json: { status: 'SUCCESS', data: account }
          else
            render json: { status: 'ERROR', data: account.errors }
          end
        end
  
        def destroy
          @account.destroy
          render json: { status: 'SUCCESS', message: 'Deleted the account', data: @account }
        end
  
        def update
          if @account.update(account_params)
            render json: { status: 'SUCCESS', message: 'Updated the account', data: @account }
          else
            render json: { status: 'SUCCESS', message: 'Not updated', data: @account.errors }
          end
        end
  
        private
  
        def set_account
          @account = Account.find(params[:id])
        end
  
        def account_params
          params.require(:account).permit(:name,:skin1,:skin2,:skin3,:skin4,:skin5,:skin6)
        end
      end
    end
  end
  