class HomeController < ApplicationController
  def home
    @sounds = Sound.all
  end

end
