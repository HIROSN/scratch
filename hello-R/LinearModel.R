# length <- iris$Petal.Length
# width <- iris$Petal.Width
# cor(length, width)
# plot(
#   length,
#   width,
#   main = "Petal length vs. width")
# model <- lm(width ~ length)
# lines(
#   x = length,
#   y = model$fitted,
#   col="red",
#   lwd = 1)
# summary(model)
#install.packages("ggplot2")
library(ggplot2)
p <- ggplot(iris, aes(Petal.Length, Petal.Width))
p + geom_point() + geom_smooth(aes(Petal.Length, Petal.Width, group = 1), method = "lm") + ggtitle("Petal length vs. width")