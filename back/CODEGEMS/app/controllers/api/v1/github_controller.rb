module Api
    module V1
        class GithubController < ApplicationController
            # HTTPClientを呼び出す
            require 'httpclient'
            require 'json'
            require 'httparty'
            def index
                curl -sS https://github-contributions-api.deno.dev/[ユーザ名].json?flat=true | jq ".contributions[-3:]"
                binding.pry
                                
                headers = {
                    'Authorization' => "token #{access_token}",
                    'User-Agent' => 'HTTParty'
                }

                # query = '{query($userName:String!) {
                #     user(login: $userName){
                #       contributionsCollection {
                #         contributionCalendar {
                #           totalContributions
                #           weeks {
                #             contributionDays {
                #               contributionCount
                #               date
                #             }
                #           }
                #         }
                #       }
                #     }
                #   }}'
                response = HTTParty.get(url,header: headers)
                binding.pry
                # レスポンスから草の数を取得
                total_contributions = response.parsed_response.map { |c| c['total'] }.sum
                # 草の数を表示
                puts "Total contributions: #{total_contributions}"                # POSTするデータ
                
                # JSON形式に変換
                # json_data = JSON.generate(data)
                # client = HTTPClient.new
                # response = client.post(url, json_data,header: header, query: query) #headerとqueryを指定
                # render json: JSON.parse(response.body)
            end
        end
    end
end
