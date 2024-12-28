require 'json'

Jekyll::Hooks.register :site, :after_init do |site|
  # Initialize an empty array to store combined data
  combined_data = []
  data_dir = File.join(site.source, "_data", "events", "gd8") # Path to your JSON files
  output_file = File.join(data_dir, "all.json")    # Output combined file

  # Ensure the directory exists
  if Dir.exist?(data_dir)
    # Delete the combined file if it already exists
    if File.exist?(output_file)
      File.delete(output_file)
      puts "Deleted existing combined file: #{output_file}"
    end

    # Process all JSON files in the directory
    Dir.glob(File.join(data_dir, "*.json")).each do |file|
      next if File.basename(file) == "all.json" # Skip the combined file itself
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
    puts "Directory not found: #{data_dir}"
  end
end
