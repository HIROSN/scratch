movies <- read.csv("github/scratch/hello-R/Movies.csv")
# par(mfrow = c(2, 1))
# hist(
#   x = movies$Runtime,
#   breaks = 30,
#   main = "Distribution of Movie Rutimes",
#   xlab = "Runtime [min]")
# plot(
#   x = density(movies$Runtime),
#   main = "Distribution of Movie Rutimes",
#   xlab = "Runtime [min]")
library(grid)
library(ggplot2)
dev.off()
viewport <- viewport(layout = grid.layout(2, 1))
pushViewport(viewport)
hist <- ggplot(
  data = movies,
  aes(x = Runtime)) +
  geom_histogram(binwidth = 10) +
  ggtitle("Distribution of Movie Rutimes") +
  xlab("Runtime [min]")
print(
  x = hist,
  vp = viewport(
    layout.pos.row = 1,
    layout.pos.col = 1))
density <- ggplot(
  data = movies,
  aes(x = Runtime)) +
  geom_density() +
  ggtitle("Distribution of Movie Rutimes") +
  xlab("Runtime [min]")
print(
  x = density,
  vp = viewport(
    layout.pos.row = 2,
    layout.pos.col = 1))