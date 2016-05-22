# install.packages("wordcloud")
library(wordcloud)
set.seed(6712)
wordcloud(rownames(USArrests), USArrests$Murder, colors=brewer.pal(8, "Dark2"))