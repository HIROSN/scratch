# install.packages("hexbin")
library(ggplot2)
ggplot(
  data = iris,
  aes(x = Petal.Length, y = Petal.Width)) +
  stat_binhex() +
  ggtitle("Petal Length vs. Petal Width") +
  xlab("Length") +
  ylab("Width")