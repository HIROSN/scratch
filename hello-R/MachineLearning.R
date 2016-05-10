# Loading data
rawData <- read.csv2(
  "github/scratch/hello-R/38189197_T_ONTIME.csv",
  sep = ",",
  header = TRUE,
  stringsAsFactors = FALSE)
airports <- c('ATL', 'LAX', 'ORD', 'DFW', 'JFK', 'SFO', 'CLT', 'LAS', 'PHX')
rawData <- subset(rawData, DEST %in% airports & ORIGIN %in% airports)
rawData$FL_DATE <- gsub("-", "", rawData$FL_DATE)
#rawData$DEP_TIME_BLK <- substr(rawData$DEP_TIME_BLK, 1, 2)
#rawData$ARR_TIME_BLK <- substr(rawData$ARR_TIME_BLK, 1, 2)
#nrow(rawData)
#head(rawData, 2)
#tail(rawData, 2)

# Loading station data
stations <- read.csv2(
  "github/scratch/hello-R/201501station.txt",
  sep = "|",
  header = TRUE,
  stringsAsFactors = FALSE)
stations <- subset(stations, CallSign %in% airports)
rawData <- merge(
  x = rawData,
  y = data.frame(ORIGIN = stations$CallSign, ORIGIN_WBAN = stations$WBAN),
  by = "ORIGIN",
  all.x = TRUE)
rawData <- merge(
  x = rawData,
  y = data.frame(DEST = stations$CallSign, DEST_WBAN = stations$WBAN),
  by = "DEST",
  all.x = TRUE)

# Loading weather data
weather <- read.csv2(
  "github/scratch/hello-R/201501daily.txt",
  sep = ",",
  header = TRUE,
  stringsAsFactors = FALSE)
rawData <- merge(
  x = rawData,
  y = data.frame(
    FL_DATE = weather$YearMonthDay,
    ORIGIN_WBAN = weather$WBAN,
    ORIGIN_TAVG = weather$Tavg,
    ORIGIN_PRECIP = weather$PrecipTotal),
  by = c("FL_DATE", "ORIGIN_WBAN"),
  all.x = TRUE)
rawData <- merge(
  x = rawData,
  y = data.frame(
    FL_DATE = weather$YearMonthDay,
    DEST_WBAN = weather$WBAN,
    DEST_TAVG = weather$Tavg,
    DEST_PRECIP = weather$PrecipTotal),
  by = c("FL_DATE", "DEST_WBAN"),
  all.x = TRUE)

# Dropping columns
rawData$X <- NULL
#head(rawData, 2)
#cor(rawData[c("ORIGIN_AIRPORT_SEQ_ID", "ORIGIN_AIRPORT_ID")])
#cor(rawData[c("DEST_AIRPORT_SEQ_ID", "DEST_AIRPORT_ID")])
#rawData$ORIGIN_AIRPORT_SEQ_ID <- NULL
#rawData$DEST_AIRPORT_SEQ_ID <- NULL
#mismatched <- rawData[rawData$CARRIER != rawData$UNIQUE_CARRIER,]
#nrow(mismatched)
#rawData$UNIQUE_CARRIER <- NULL
#head(rawData, 2)

# Cleaning data and dropping rows
rawData$CANCELLED <- as.integer(rawData$CANCELLED)
rawData$DIVERTED <- as.integer(rawData$DIVERTED)
cleanedData <- rawData[
  !is.na(rawData$ARR_DEL15) &
  rawData$ARR_DEL15 != "" &
  rawData$CANCELLED == 0 &
  rawData$DIVERTED == 0,]
#notarr <- cleanedData[cleanedData$CANCELLED != 0 | cleanedData$DIVERTED != 0,]
#nrow(notarr)
#nrow(rawData)
#nrow(cleanedData)
#head(cleanedData, 2)

# Adjusting data types
cleanedData$DISTANCE <- as.integer(cleanedData$DISTANCE)
cleanedData$ARR_DEL15 <- as.factor(cleanedData$ARR_DEL15)
#cleanedData$DEP_DEL15 <- as.factor(cleanedData$DEP_DEL15)
#cleanedData$DEST_AIRPORT_ID <- as.factor(cleanedData$DEST_AIRPORT_ID)
#cleanedData$ORIGIN_AIRPORT_ID <- as.factor(cleanedData$ORIGIN_AIRPORT_ID)
cleanedData$DAY_OF_WEEK <- as.factor(cleanedData$DAY_OF_WEEK)
cleanedData$DEST <- as.factor(cleanedData$DEST)
cleanedData$ORIGIN <- as.factor(cleanedData$ORIGIN)
cleanedData$ARR_TIME_BLK <- as.factor(cleanedData$ARR_TIME_BLK)
cleanedData$DEP_TIME_BLK <- as.factor(cleanedData$DEP_TIME_BLK)
cleanedData$CARRIER <- as.factor(cleanedData$CARRIER)
#tapply(cleanedData$ARR_DEL15, cleanedData$ARR_DEL15, length)
cleanedData$ORIGIN_TAVG <- as.integer(cleanedData$ORIGIN_TAVG)
cleanedData$DEST_TAVG <- as.integer(cleanedData$DEST_TAVG)
cleanedData$ORIGIN_PRECIP <- as.double(cleanedData$ORIGIN_PRECIP)
cleanedData$DEST_PRECIP <- as.double(cleanedData$DEST_PRECIP)

# Drop columns
featureCols <- c(
  "ARR_DEL15",
  "DAY_OF_WEEK",
  "CARRIER",
  "DEST",
  "ORIGIN",
  "DEP_TIME_BLK",
  "ORIGIN_TAVG",
  "DEST_TAVG",
  "ORIGIN_PRECIP",
  "DEST_PRECIP")
cleanedDataFiltered <- cleanedData[, featureCols]

# Split data for training and testing
#install.packages('caret')
library(caret)
inTrainRows <- createDataPartition(cleanedDataFiltered$ARR_DEL15, p = 0.70, list = FALSE)
trainDataFiltered <- cleanedDataFiltered[inTrainRows,]
testDataFiltered <- cleanedDataFiltered[ - inTrainRows,]
#nrow(cleanedDataFiltered)
#nrow(trainDataFiltered) * 100 / nrow(cleanedDataFiltered)
#nrow(testDataFiltered) * 100 / nrow(cleanedDataFiltered)

# Logistic Regression
#set.seed(122515)
#install.packages("e1071")
#logisticRegModel <- train(ARR_DEL15 ~ ., data=trainDataFiltered, method="glm", family="binomial")
#logRegPrediction <- predict(logisticRegModel, testDataFiltered)
#logRegConfMat <- confusionMatrix(logRegPrediction, testDataFiltered[, "ARR_DEL15"])
#logRegConfMat

# Random Forest
set.seed(122515)
#install.packages("randomForest")
library(randomForest)
rfModel <- randomForest(
  testDataFiltered[-1],
  testDataFiltered$ARR_DEL15,
  proximity = TRUE,
  importance = TRUE)
rfValidation <- predict(rfModel, testDataFiltered)
rfConfMat <- confusionMatrix(rfValidation, testDataFiltered[, "ARR_DEL15"])
rfConfMat