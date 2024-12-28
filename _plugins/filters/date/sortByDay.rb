module CustomFilters
    def sort_by_day(input)
      input.sort_by { |person| person["dob"].split("-")[2].to_i }
    end
  end
  
  Liquid::Template.register_filter(CustomFilters)
  