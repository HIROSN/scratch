# df <- data.frame(
#   Name = c("a", "b", "c"),
#   Value = c(1, 2, 3))
#df
#plot(df)
#plot(df$Name, df$Value)
# plot(
#   x = df$Name,
#   y = df$Value)
merc <- subset(mtcars, grepl("^Merc.*", row.names(mtcars)) & mtcars$cyl >= 8)
barplot(
  names = row.names(merc),
  height = merc$mpg,
  col = "skyblue",
  main = "Mercedes",
  xlab = "Type",
  ylab = "MPG")