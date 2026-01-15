import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../theme/premium';

// AdMob 배너 플레이스홀더 컴포넌트
// 실제 배포 시 react-native-google-mobile-ads 라이브러리로 교체

// 테스트용 AdMob 단위 ID (실제 배포 시 본인의 AdMob ID로 교체)
export const AD_UNIT_IDS = {
  // 테스트 ID (개발용)
  BANNER_TEST: 'ca-app-pub-3940256099942544/6300978111',
  INTERSTITIAL_TEST: 'ca-app-pub-3940256099942544/1033173712',

  // 실제 ID (배포 시 여기에 본인의 AdMob 단위 ID 입력)
  BANNER: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
  INTERSTITIAL: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
};

// 개발 모드 여부 (배포 시 false로 변경)
const IS_DEV_MODE = true;

export default function AdBanner({ style }) {
  // 개발 모드에서는 플레이스홀더 표시
  if (IS_DEV_MODE) {
    return (
      <View style={[styles.container, style]}>
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>광고 영역</Text>
          <Text style={styles.placeholderSub}>AdMob 배너 (320x50)</Text>
        </View>
      </View>
    );
  }

  // 실제 배포 시 아래 코드로 교체
  // import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
  // return (
  //   <View style={[styles.container, style]}>
  //     <BannerAd
  //       unitId={AD_UNIT_IDS.BANNER}
  //       size={BannerAdSize.BANNER}
  //       requestOptions={{ requestNonPersonalizedAdsOnly: true }}
  //     />
  //   </View>
  // );

  return null;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.cardBg,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
  },
  placeholder: {
    width: 320,
    height: 50,
    backgroundColor: COLORS.backgroundGray,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
  },
  placeholderText: {
    fontSize: 12,
    color: COLORS.textMuted,
    fontWeight: '500',
  },
  placeholderSub: {
    fontSize: 10,
    color: COLORS.textMuted,
    marginTop: 2,
  },
});
