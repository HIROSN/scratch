# install.packages("ggplot2")
library(ggplot2)
merc <- subset(mtcars, grepl("^Merc.*", row.names(mtcars)) & mtcars$cyl >= 8)
df <- data.frame(
  Type = row.names(merc),
  MPG = merc$mpg)
# ggplot(
#   data = df,
#   aes(
#   x = Type,
#   y = MPG)) +
#   geom_point()
ggplot(
  data = df,
  aes(
  x = Type,
  y = MPG)) +
  geom_bar(
  stat = "identity",
  fill = "skyblue") +
  ggtitle("Mercedes") +
  xlab("Type") +
  ylab("MPG")