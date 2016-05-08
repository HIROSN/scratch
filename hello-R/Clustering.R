# plot(iris[1:4])
length <- iris$Petal.Length
width <- iris$Petal.Width
clusters <- kmeans(x = iris[, 1:4], centers = 3, nstart = 10)
plot(
  length,
  width,
  main = "Petal length vs. width",
  col = as.integer(iris$Species),
  pch=clusters$cluster)
points(
  x = clusters$centers[, "Petal.Length"],
  y = clusters$centers[, "Petal.Width"],
  pch = 4,
  lwd = 2,
  col = "blue")
table(x = clusters$cluster, y = iris$Species)