movies <- read.csv("github/scratch/hello-R/Movies.csv")
# pie(
#   x = table(movies$Awards),
#   clockwise = TRUE,
#   main = "Proportion of Movies that won awards")
library(ggplot2)
ggplot(
  data = movies,
  aes(x = "", fill = Rating)) +
  geom_bar() +
  coord_polar(theta = "y") +
  ggtitle("Count of Movies by Rating") +
  xlab("") +
  ylab("")