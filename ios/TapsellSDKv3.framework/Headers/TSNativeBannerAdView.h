//
//  NativeBannerAdView.h
//  TapsellSDKv3
//
//  Created by Tapsell on 11/8/17.
//  Copyright © 2017 Tapsell. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "TSNativeAdView.h"

@interface TSNativeBannerAdView : TSNativeAdView

@property(nonatomic, readwrite) NSInteger mainImageTag;

-(void) loadAd:(NSObject*)ad;

@end
