class GithubOauthController < ApplicationController
    require 'jwt'
    require 'net/http'
    require 'json'
  
    GITHUB_CLIENT_ID = ENV['GITHUB_CLIENT_ID']
    GITHUB_CLIENT_SECRET = ENV['GITHUB_CLIENT_SECRET']
    SECRET_KEY = 'your_secret_key' # あなたのシークレットキーを設定してください
  
    def login
      code = params[:code]
      puts code
      puts GITHUB_CLIENT_ID
      puts GITHUB_CLIENT_SECRET
  
      # 認証が成功した場合は、JWTトークンを生成して返却します。
      begin
        token = get_github_token(code)
        puts token
        user = get_github_user(token)
        username = user['login']
        avatar_url = user['avatar_url']
        puts username
  
        payload = { username: username }
        token = JWT.encode(payload, SECRET_KEY, 'HS256')
  
        # JWTトークンをcookieとして設定します。
        cookies[:access_token] = {
          value: token,
          expires: 1.hour.from_now,
          httponly: true
        }
  
        render json: {
          message: 'login successfully',
          username: username,
          avatar_url: avatar_url
        }
      rescue => e
        puts e
        render json: { error: 'Invalid code' }, status: :unauthorized
      end
    end
  
    private
  
    def get_github_token(code)
      uri = URI('https://github.com/login/oauth/access_token')
      https = Net::HTTP.new(uri.host, uri.port)
      https.use_ssl = true
  
      request = Net::HTTP::Post.new(uri.path)
      request['Content-Type'] = 'application/json'
      request['Accept'] = 'application/json'
  
      data = {
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code: code
      }
  
      request.body = data.to_json
  
      response = https.request(request)
      response_data = JSON.parse(response.body)
      puts response_data
      response_data['access_token']
    end
  def get_github_user(token)
      uri = URI('https://api.github.com/user')
      https = Net::HTTP.new(uri.host, uri.port)
      https.use_ssl = true
  
      request = Net::HTTP::Get.new(uri.path)
      request['Authorization'] = "Bearer #{token}"
      request['Accept'] = 'application/vnd.github+json'
      request['X-GitHub-Api-Version'] = '2022-11-28'
  
      response = https.request(request)
      response_data = JSON.parse(response.body)
      puts response_data
      response_data
    end
  end
  backend/login/login.pyをすべてRailsに変換したものです