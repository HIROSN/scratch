timeSeries <- read.csv("github/scratch/hello-R/Timeseries.csv")
library(ggplot2)
ggplot(
  data = timeSeries,
  aes(x = Year, y = Box.Office)) +
  geom_line(color = "skyblue") +
  expand_limits(y = 0) +
  ggtitle("Average Box Office Revenue by Year") +
  xlab("Year") +
  ylab("Box Office [$M]")