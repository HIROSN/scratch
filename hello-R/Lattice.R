# install.packages("lattice")
library(lattice)
merc <- subset(mtcars, grepl("^Merc.*", row.names(mtcars)) & mtcars$cyl >= 8)
# dotplot(
#   x = merc$mpg ~ row.names(merc),
#   data = merc)
barchart(
  x = merc$mpg ~ row.names(merc),
  data = merc,
  col = "skyblue",
  main = "Mercedes",
  xlab = "Type",
  ylab = "MPG")