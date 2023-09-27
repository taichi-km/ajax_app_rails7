class PostsController < ApplicationController
  def index
    @posts = Post.order(id: "DESC")
  end

  def new
  end

  def create
    post = Post.create(content: params[:content])
    render json:{ post: post }
    # renderメソッドを用いて、レスポンスで返却されるデータフォーマットにJSONを指定する
  end
end
