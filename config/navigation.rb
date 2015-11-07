# -*- coding: utf-8 -*-
SimpleNavigation::Configuration.run do |navigation|

  # Specify the class that will be applied to the current leaf of
  # active navigation items. Defaults to 'simple-navigation-active-leaf'
  navigation.active_leaf_class = 'active'

  # Define the primary navigation
  navigation.items do |primary|
    primary.dom_class = 'nav'
    primary.item :top_scores, 'Top Scores', scores_path
    primary.item :about, 'About', about_path
  end

end
