#import <Foundation/Foundation.h>


// Custom class - User
@interface User : NSObject <NSCoding>

@property NSString* name;
@property NSString* email;
@property (readonly) NSDate* created;

@end

@implementation User {
    int _countDescriptionAccessed;
}

- (instancetype)init {
    self = [super init];

    if (self) {
        _created = [NSDate date];
        _countDescriptionAccessed = 0;
    }

    return self;
}

- (NSString *)description {
    return [NSString stringWithFormat:@"Name: %@, Email: %@, Created: %@, Accessed: %i",
            _name, [self email], self.created, ++_countDescriptionAccessed];
}

- (void)dealloc {}

// NSCoding implementation
- (void)encodeWithCoder:(NSCoder*)aCoder {
    [aCoder encodeObject:self.name forKey:@"name"];
    [aCoder encodeObject:self.email forKey:@"email"];
    [aCoder encodeObject:self.created forKey:@"created"];
}

- (instancetype)initWithCoder:(NSCoder*)aDecoder {
    self = [super init];

    if (self) {
        _name = [aDecoder decodeObjectForKey:@"name"];
        _email = [aDecoder decodeObjectForKey:@"email"];
        _created = [aDecoder decodeObjectForKey:@"created"];
    }

    return self;
}

@end


// Categories
@interface NSString (Categories)
- (NSString*)stringWithLowDash;
@end

@implementation NSString (Categories)
- (NSString*)stringWithLowDash {
    return [self stringByReplacingOccurrencesOfString:@" " withString:@"_"];
}
@end


// C-style function prototype
void NSLogArray(NSArray* array);
void NSLogDictionary(NSDictionary* dictionary);


// Command Line Tool entry
int main(/* int argc, const char * argv[] */) {
    @autoreleasepool {
        User* me = [[User alloc] init];
        NSLog(@"User %@", me);

        // Custom class
        {
            [me setName:@"Hiroshi Nagata"];
            [me setEmail:@"hirosn@live.com"];
            
            NSLog(@"User %@", me);
            NSLog(@"User Created %@", [me created]);
        }

        // NSLog format %lli, %llu, %g, %@
        {
            long long largeInteger = 9223372036854775807;
            unsigned long long largerInteger = (largeInteger + 1) * 2 - 1;
            float singlePrecision = 33.3f;

            NSString* commentCommon = @"Maximum value for a 64-bit";
            NSLog(@"%@ signed integer:    %lli", commentCommon, largeInteger);
            NSLog(@"%@ unsigned integer: %llu", commentCommon, largerInteger);
            NSLog(@"\"%%f\": %f, \"%%g\": %g", singlePrecision, singlePrecision);
        }

        // NSDate
        {
            NSDate* today = [NSDate date];
            NSData* newDate = [[NSData alloc] init];

            NSString* newDateMessage = [NSString stringWithFormat:@"New date is %@", newDate];
            NSLog(@"Today is %@ (%@)", today, [today description]);
            NSLog(@"%@", newDateMessage);
        }

        // NSMutableArray
        {
            NSMutableArray* array = [[NSMutableArray alloc] initWithObjects:
                                     @"abc",
                                     [NSDate date],
                                     nil];

            [array addObject:@"foo"];
            [array addObject:[NSNumber numberWithInt:123]];
            [array removeObjectAtIndex:0];

            NSLogArray(array);
        }

        // NSArray
        {
            NSArray* array = @[ @"abc", [NSNumber numberWithInt:789] ];

            NSLogArray(array);
        }

        // NSMutableDictionary
        {
            NSMutableDictionary* lang = [[NSMutableDictionary alloc] initWithObjectsAndKeys:
                                         @"English (United States)", @"en-US",
                                         @"Japanese", @"ja-JP",
                                         @"Bogus", @"zz-XX",
                                         nil];

            [lang setObject:@"Chinese (China)" forKey:@"zh-CN"];
            [lang removeObjectForKey:@"zz-XX"];

            NSLogDictionary(lang);
        }

        // NSDictionary
        {
            NSDictionary* lang = @{ @"zh-TW": @"Chinese (Taiwan)",
                                    @"ko-KR": @"Korean" };

            NSLogDictionary(lang);
        }

        // NSFileManager
        {
            NSFileManager* fileManager = [NSFileManager defaultManager];

            // Array of sub paths
            NSArray* sounds = [fileManager subpathsAtPath:@"/System/Library/Sounds"];

            NSLogArray(sounds);

            // Path to a file in home directory
            NSString* pathToBashHistory = [NSHomeDirectory() stringByAppendingPathComponent:@".bash_history"];

            NSLog(@"Bash history URL: %@", pathToBashHistory);

            // Dictionary of file attributes
            NSDictionary* attributes = [fileManager attributesOfItemAtPath:pathToBashHistory
                                                                     error:nil];

            NSLogDictionary(attributes);

            // URL of Documents folder
            NSURL* urlDocuments = [fileManager URLForDirectory:NSDocumentDirectory
                                                      inDomain:NSUserDomainMask
                                             appropriateForURL:nil
                                                        create:NO
                                                         error:nil];

            NSLog(@"Documents URL: %@", [urlDocuments absoluteString]);

            // Path => URL
            NSURL* urlBashHistory = [NSURL fileURLWithPath:pathToBashHistory];

            // URL of a file in Documents folder
            NSURL* urlBashHistoryCopy = [urlDocuments URLByAppendingPathComponent:@"bash_history.txt"];

            // Read text from file URL
            NSMutableString* bashHistory = [[NSMutableString alloc] initWithContentsOfURL:urlBashHistory
                                                                                 encoding:NSUTF8StringEncoding
                                                                                    error:nil];
            // Write text to file URL
            [bashHistory writeToURL:urlBashHistoryCopy
                         atomically:YES
                           encoding:NSUTF8StringEncoding
                              error:nil];

            NSLog(@"Bash history saved to %@", urlBashHistoryCopy);

            // Path to Documents folder
            NSString* pathToDocuments = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) firstObject];

            // Path to a file in Documents folder
            NSString* pathToArchive = [pathToDocuments stringByAppendingPathComponent:@"users.plist"];

            // Array of NSCoding objects
            NSMutableArray* users;

            // Check if a file exists
            if (![fileManager fileExistsAtPath:pathToArchive]) {

                // Archive objects to a file
                users = [[NSMutableArray alloc] init];
                [users addObject:me];
                [NSKeyedArchiver archiveRootObject:users toFile:pathToArchive]; // Deprecated in macOS 10.14

                NSLog(@"Archiving %@", pathToArchive);
            } else {

                // Unarchive objects from a file
                users = [NSKeyedUnarchiver unarchiveObjectWithFile:pathToArchive]; // Deprecated in macOS 10.14

                NSLog(@"Unarchiving %@", pathToArchive);
            }

            NSLogArray(users);
        }

        // Categories
        {
            NSString* message = @"The quick brown fox jumps over the lazy dog.";

            // Check if this object supports the method
            if ([message respondsToSelector:@selector(stringWithLowDash)]) {
                message = [message stringWithLowDash];
            }

            NSLog(@"%@", message);
        }

        // NSException
        {
            @try {
                id today = [NSDate date];
                [today stringWithLowDash];
            } @catch (NSException* exception) {
                for (NSString* line in [exception callStackSymbols]) {
                    NSLog(@"%@", line);
                }
            } @finally {
            }
        }
    }
    return 0;
}


// C-style function
// Log NSArray
void NSLogArray(NSArray* array) {
    NSMutableString* message = [[NSMutableString alloc] init];

    for (id obj in array) {
        if ([message length] > 0) {
            [message appendString:@", "];
        }

        NSString* format;
        if ([obj isKindOfClass:[NSString class]]) {
            format = @"\"%@\"";
        } else {
            format = @"%@";
        }

        [message appendString:[NSString stringWithFormat:format, obj]];
    }

    NSLog(@"[ %@ ] Class: %@, Length: %u",
          message, [array class], (unsigned)[array count]);
}

// Log NSDictionary
void NSLogDictionary(NSDictionary* dictionary) {
    NSLog(@"--- Class: %@", [dictionary class]);

    for (NSString* key in dictionary) {
        NSLog(@"%@: %@", key, dictionary[key]);
    }

    NSLog(@"--- Count: %u", (unsigned)[dictionary count]);
}


// Indent the selection
// Editor > Structure > Re-Indent (^I)

// Trim trailing whitespace
// Xcode > Preferendes > Text Editing > Editing > While Editing:
// [v] Automatically trim trailing whitespace
//      [v] Including whitespace-only lines
