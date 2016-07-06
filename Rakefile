require "yaml"
require "mustache"

namespace :build do
  task :stylesheets do
    system "rm -rf _site/assets/bundle-*.css"
    system "cat assets/css/*.css > _site/assets/bundle-#{digest}.css"
  end

  task :scripts do
    system "rm -rf _site/assets/bundle-*.js"
    system "babel --presets es2015 assets/js/source -d assets/js/build"
    system "browserify assets/js/build/app.js -o _site/assets/bundle-#{digest}.js"
  end

  task :html do
    Dir["*.html"].each do |file|
      meta, content = File.read(file).split("\n\n")

      meta = OpenStruct.new(YAML.load(meta))
      layout = File.read("_layouts/#{meta.layout}.html.mustache")

      File.open("_site/#{file}", "w") do |f|
        f.write Mustache.render(layout, content: content, digest: digest)
      end
    end
  end
end

task :build => ["build:html", "build:stylesheets", "build:scripts"]

task :server => [:build] do
  system "rackup"
end

task :watch do
  system "watch 'rake build' assets/js/source assets/css"
end

def digest
  @digest ||= SecureRandom.hex
end
