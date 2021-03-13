require 'test_helper'

class SoundControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get sound_create_url
    assert_response :success
  end

end
