//
//  Tapsell.h
//  TapsellSDKv3
//
//  Created by Tapsell on 5/13/17.
//  Copyright © 2017 Tapsell. All rights reserved.
//

#ifndef Tapsell_h
#define Tapsell_h

#import <Foundation/Foundation.h>
#import "TSConfiguration.h"
#import "TSAdRequestOptions.h"
#import "TapsellAd.h"
#import "TSNativeBannerAdView.h"
#import "TSNativeVideoAdView.h"
#import "TSNativeBannerAdWrapper.h"

@interface Tapsell : NSObject

+ (void)initializeWithAppKey:(NSString*)appKey;

+ (void)initializeWithAppKey:(NSString* )appKey
                   andConfig:(TSConfiguration *)config;

+ (BOOL)isDebugMode;

+ (void)setDebugMode:(BOOL)debugMode;

+ (NSString*) getAppUserId;

+ (void)setAppUserId:(NSString*)appUserId;

+ (void)requestAdForZone:(NSString*)zoneId
           onAdAvailable: (void (^)(TapsellAd * ad)) onAdAvailable
         onNoAdAvailable:(void (^)()) onNoAdAvailable
                 onError:(void (^)(NSString* error)) onError
              onExpiring:(void (^)(TapsellAd * ad)) onExpiring;


+ (void)requestAdForZone:(NSString*)zoneId
              andOptions:(TSAdRequestOptions *)options
           onAdAvailable: (void (^)(TapsellAd * ad)) onAdAvailable
         onNoAdAvailable:(void (^)()) onNoAdAvailable
                 onError:(void (^)(NSString* error)) onError
              onExpiring:(void (^)(TapsellAd * ad)) onExpiring;

+(void) requestNativeBannerAdForZone:(NSString*_Nullable)zoneId
                    andContainerView:(TSNativeBannerAdView*_Nullable) nativeBanner
                     onRequestFilled:(void (^_Nullable)()) onRequestFilled
                     onNoAdAvailable:(void (^_Nullable)()) onNoAdAvailable
                             onError:(void (^_Nullable)(NSString*_Nullable error)) onError;

+(void) requestNativeBannerAdForZone:(NSString*_Nullable)zoneId
                       onAdAvailable:(void (^_Nullable)(TSNativeBannerAdWrapper* nativeBannerAd)) onRequestFilled
                     onNoAdAvailable:(void (^_Nullable)()) onNoAdAvailable
                             onError:(void (^_Nullable)(NSString*_Nullable error)) onError;
+(void) nativeBannerAdShowWithAdId:(NSString*_Nonnull)adId;
+(void) nativeBannerAdClickedWithAdId:(NSString*_Nonnull)adId;

+(void) requestNativeVideoAdForZone:(NSString*_Nonnull )zoneId
                   andContainerView:(TSNativeVideoAdView*_Nullable) nativeVideo
                    onRequestFilled: (void (^_Nullable)()) onRequestFilled
                    onNoAdAvailable:(void (^_Nullable)()) onNoAdAvailable
                            onError:(void (^_Nullable)(NSString*_Nullable error)) onError;

+ (void)setAdShowFinishedCallback: (void (^)(TapsellAd * ad, BOOL completed)) onAdShowFinished;

+ (NSString* )getVersion;

@end


#endif /* Tapsell_h */
