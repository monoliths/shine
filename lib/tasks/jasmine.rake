# This Rake task locates the spec/javascripts directory and feeds it to
# "jasmine-node", basically a script that runs a unit testing framework on the JS files.
# runs using: "rake" or "rake jasmine"
desc "Run Jasmine-Based unit tests of JavaScript"
task :jasmine do
  root_dir = File.expand_path(File.join(File.dirname(__FILE__), "..", ".."))
  sh("node_modules/.bin/jasmine-node #{root_dir}/spec/javascripts")
end

task :default => :jasmine
