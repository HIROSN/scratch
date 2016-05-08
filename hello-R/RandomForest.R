# Random Forest
set.seed(122515)
#install.packages("randomForest")
library(randomForest)
rfModel <- randomForest(testDataFiltered[-1], testDataFiltered$ARR_DEL15, proximity=TRUE, importance=TRUE)
rfValidation <- predict(rfModel, testDataFiltered)
rfConfMat <- confusionMatrix(rfValidation, testDataFiltered[, "ARR_DEL15"])
rfConfMat