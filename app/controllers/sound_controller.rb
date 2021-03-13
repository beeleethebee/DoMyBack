class SoundController < ApplicationController

  def create
    puts params
    Sound.create(name: 'aaa', sound: params[:sound])
    redirect_to root_path
  end

  def destroy
    Sound.find(params[:id]).destroy
    redirect_to root_path
  end
end
