# Loading data
rawData <- read.csv2("github/scratch/hello-R/752031480_T_ONTIME.csv", sep = ",", header = TRUE, stringsAsFactors = FALSE)
nrow(rawData)
airports <- c('ATL', 'LAX', 'ORD', 'DFW', 'JFK', 'SFO', 'CLT', 'LAS', 'PHX')
rawData <- subset(rawData, DEST %in% airports & ORIGIN %in% airports)
#nrow(rawData)
#head(rawData, 2)
#tail(rawData, 2)

# Dropping rows
rawData$X <- NULL
#head(rawData, 2)
#cor(rawData[c("ORIGIN_AIRPORT_SEQ_ID", "ORIGIN_AIRPORT_ID")])
#cor(rawData[c("DEST_AIRPORT_SEQ_ID", "DEST_AIRPORT_ID")])
rawData$ORIGIN_AIRPORT_SEQ_ID <- NULL
rawData$DEST_AIRPORT_SEQ_ID <- NULL
#mismatched <- rawData[rawData$CARRIER != rawData$UNIQUE_CARRIER,]
#nrow(mismatched)
rawData$UNIQUE_CARRIER <- NULL
#head(rawData, 2)

# Cleaning data
cleanedData <- rawData[!is.na(rawData$ARR_DEL15) & rawData$ARR_DEL15 != "" & !is.na(rawData$DEP_DEL15) & rawData$DEP_DEL15 != "",]
#nrow(rawData)
#nrow(cleanedData)
#head(cleanedData, 2)

# Adjusting data types
cleanedData$DISTANCE <- as.integer(cleanedData$DISTANCE)
cleanedData$CANCELLED <- as.integer(cleanedData$CANCELLED)
cleanedData$DIVERTED <- as.integer(cleanedData$DIVERTED)
cleanedData$ARR_DEL15 <- as.factor(cleanedData$ARR_DEL15)
cleanedData$DEP_DEL15 <- as.factor(cleanedData$DEP_DEL15)
cleanedData$DEST_AIRPORT_ID <- as.factor(cleanedData$DEST_AIRPORT_ID)
cleanedData$ORIGIN_AIRPORT_ID <- as.factor(cleanedData$ORIGIN_AIRPORT_ID)
cleanedData$DAY_OF_WEEK <- as.factor(cleanedData$DAY_OF_WEEK)
cleanedData$DEST <- as.factor(cleanedData$DEST)
cleanedData$ORIGIN <- as.factor(cleanedData$ORIGIN)
cleanedData$DEP_TIME_BLK <- as.factor(cleanedData$DEP_TIME_BLK)
cleanedData$CARRIER <- as.factor(cleanedData$CARRIER)
#tapply(cleanedData$ARR_DEL15, cleanedData$ARR_DEL15, length)

# Split data for training and testing
#install.packages('caret')
library(caret)
featureCols <- c("ARR_DEL15", "DAY_OF_WEEK", "CARRIER", "DEST", "ORIGIN", "DEP_TIME_BLK")
cleanedDataFiltered <- cleanedData[, featureCols]
inTrainRows <- createDataPartition(cleanedDataFiltered$ARR_DEL15, p = 0.70, list = FALSE)
trainDataFiltered <- cleanedDataFiltered[inTrainRows,]
testDataFiltered <- cleanedDataFiltered[ - inTrainRows,]
nrow(cleanedDataFiltered)
nrow(trainDataFiltered) * 100 / nrow(cleanedDataFiltered)
nrow(testDataFiltered) * 100 / nrow(cleanedDataFiltered)