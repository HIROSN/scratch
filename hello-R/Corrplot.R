#install.packages("corrplot")
library(corrplot)
dataset <- mtcars
dataset$am <- NULL
dataset$wt <- NULL
M <- cor(dataset)
corrplot(M, method = "circle", tl.cex = 0.6, tl.srt = 45, tl.col = "black", type = "upper", order = "hclust")