movies <- read.csv("github/scratch/hello-R/Movies.csv")
library(grid)
library(ggplot2)
dev.off()
viewport <- viewport(layout = grid.layout(2, 1))
pushViewport(viewport)
group <- ggplot(
  data = movies,
  aes(x = Rating, fill = Awards)) +
  geom_bar(position = "dodge") +
  ggtitle("Count of Movies by Rating and Awards") +
  scale_fill_discrete(labels = c("No", "Yes"))
print(
  x = group,
  vp = viewport(
    layout.pos.row = 1,
    layout.pos.col = 1))
stack <- ggplot(
  data = movies,
  aes(x = Rating, fill = Awards)) +
  geom_bar() +
  ggtitle("Count of Movies by Rating and Awards") +
  scale_fill_discrete(labels = c("No", "Yes"))
print(
  x = stack,
  vp = viewport(
    layout.pos.row = 2,
    layout.pos.col = 1))