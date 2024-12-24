# The script generates the file gd8_all.json at the build. gd8_all.json combines all the gd_*.json files in one file.

require 'json'

Jekyll::Hooks.register :site, :after_init do |site|
  # Initialize an empty array to store combined data
  combined_data = []
  persons_dir = File.join(site.source, "_data", "persons", "gd8") # Path to your JSON files
  output_file = File.join(persons_dir, "all.json")    # Output combined file

  # Ensure the directory exists
  if Dir.exist?(persons_dir)
    # Process all JSON files in the directory
    Dir.glob(File.join(persons_dir, "*.json")).each do |file|
      next if File.basename(file) == "gd8_all.json" # Skip the combined file itself
      begin
        # Parse the JSON file and append its data
        data = JSON.parse(File.read(file))
        combined_data.concat(data)
      rescue JSON::ParserError => e
        # Print an error message if parsing fails
        puts "Error parsing file: #{file}"
        puts e.message
      end
    end

    # Write combined data to the output file
    File.write(output_file, JSON.pretty_generate(combined_data))
    puts "Combined JSON written to: #{output_file}"
  else
    puts "Directory not found: #{persons_dir}"
  end
end
