length <- iris$Petal.Length
width <- iris$Petal.Width
# cor(length, width)
plot(
  length,
  width,
  main = "Petal length vs. width")
model <- lm(width ~ length)
lines(
  x = length,
  y = model$fitted,
  col="red",
  lwd = 1)
summary(model)