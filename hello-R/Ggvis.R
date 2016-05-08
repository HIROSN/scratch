# install.packages("shiny")
# install.packages("ggvis")
library(shiny)
library(ggvis)
add_title <- function(vis, ..., x_lab, title)
{
  add_axis(vis, "x", title = x_lab) %>%
  add_axis("x", orient = "top", ticks = 0, title = title,
    properties = axis_props(
      axis = list(stroke = "white"),
      labels = list(fontSize = 0)
    ), ...
  )
}
mtcars %>%
  ggvis( ~ wt, ~ mpg, fill = ~cyl) %>%
  layer_points() %>%
  layer_smooths() %>%
  add_title(title = "Weight vs. MPG", x_lab = "weight [ton]")