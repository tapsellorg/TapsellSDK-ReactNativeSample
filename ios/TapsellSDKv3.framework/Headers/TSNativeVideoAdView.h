//
//  TSNativeVideoAdView.h
//  TapsellSDKv3
//
//  Created by Tapsell on 11/16/17.
//  Copyright © 2017 Tapsell. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "TSNativeAdView.h"

@interface TSNativeVideoAdView : TSNativeAdView

@property(nonatomic, readwrite) NSInteger videoViewTag;

-(void) loadAd:(NSObject*)ad;

@end
