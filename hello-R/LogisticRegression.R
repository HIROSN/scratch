# Logistic Regression
set.seed(122515)
#sample(1:10,4)
#install.packages("e1071")
logisticRegModel <- train(ARR_DEL15 ~ ., data=trainDataFiltered, method="glm", family="binomial")
#logisticRegModel
logRegPrediction <- predict(logisticRegModel, testDataFiltered)
logRegConfMat <- confusionMatrix(logRegPrediction, testDataFiltered[, "ARR_DEL15"])
logRegConfMat