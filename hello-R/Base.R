df <- data.frame(
  Name = c("a", "b", "c"),
  Value = c(1, 2, 3))
#df
#plot(df)
#plot(df$Name, df$Value)
#plot(
  #x = df$Name,
  #y = df$Value)
barplot(
  names = df$Name,
  height = df$Value,
  col = "skyblue",
  main = "Hello World",
  xlab = "Name",
  ylab = "Value")