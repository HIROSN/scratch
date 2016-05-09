movies <- read.csv("github/scratch/hello-R/Movies.csv")
# table <- table(movies$Rating)
# ratings <- as.data.frame(table)
# names(ratings)[1] <- "Rating"
# names(ratings)[2] <- "Count"
# print(ratings)
# library(lattice)
# barchart(
#   x = Rating ~ Count,
#   data = ratings,
#   main = "Count of Movies by Rating",
#   ylab = "Rating")
library(ggplot2)
ggplot(
  data = movies,
  aes(x = Rating)) +
  geom_bar() +
  coord_flip() +
  ggtitle("Count of Movies by Rating")