require 'neocities'
require 'pathname'

# we assume that the api key is already present, and if not, we'll tell the user
# to login with the official cli
begin
  app_config_path = File.join Neocities::CLI::app_config_path('neocities'), 'config'
  api_key = File.read app_config_path
rescue Errno::ENOENT
  puts 'API key does not exist. Please login with neocities CLI.'
  exit 1
end

client = Neocities::Client.new api_key: api_key

def walk(client, path)
  if path.file?
    resp = client.upload path, path, true
    # Need this to avoid getting rate limited and blocked.
    sleep 0.25
    print path
    if resp[:result] == 'error' && resp[:error_type] == 'file_exists'
      puts ' exists'
    elsif resp[:result] == 'success'
      puts ' uploaded'
    else
      print " error: #{resp[:message]}"
      puts
    end
  else
    # this is what makes this different from the official push command:
    # we do not exclude hidden files, allowing us to push the .well-known directory
    path.children.each do |child|
      walk client, child
    end
  end
end

Dir.chdir('out') do
  walk client, Pathname('.')
end
