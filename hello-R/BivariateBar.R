movies <- read.csv("github/scratch/hello-R/Movies.csv")
# install.packages("dplyr")
# install.packages("RColorBrewer")
library(dplyr)
library(RColorBrewer)
library(ggplot2)
palette <- brewer.pal(9, "Pastel1")
average <- movies %>%
  select(Rating, Box.Office) %>%
  group_by(Rating) %>%
  summarize(Box.Office = mean(Box.Office)) %>%
  as.data.frame()
ggplot(
  data = average,
  aes(x = Rating, y = Box.Office)) +
  geom_bar(stat = "identity", fill = palette[2]) +
  ggtitle("Average Box Office Revenue by Rating") +
  xlab("Rating") +
  ylab("Box Office [$M]")