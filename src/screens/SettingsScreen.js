import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { COLORS, SHADOWS } from '../theme/premium';

export default function SettingsScreen() {
  const handleComingSoon = () => {
    Alert.alert('준비 중', '곧 추가될 기능입니다!');
  };

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>설정</Text>
        <Text style={styles.headerSub}>앱 설정 및 정보</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* 프로필 섹션 */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>🏌️</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>골퍼</Text>
            <Text style={styles.profileLevel}>LV. 1 초보 골퍼</Text>
          </View>
          <TouchableOpacity style={styles.editButton} onPress={handleComingSoon}>
            <Text style={styles.editButtonText}>수정</Text>
          </TouchableOpacity>
        </View>

        {/* 메뉴 섹션 */}
        <Text style={styles.sectionTitle}>데이터 관리</Text>
        <View style={styles.menuCard}>
          <TouchableOpacity style={styles.menuItem} onPress={handleComingSoon}>
            <View style={[styles.menuIcon, { backgroundColor: COLORS.info + '20' }]}>
              <Text style={styles.menuIconText}>💾</Text>
            </View>
            <View style={styles.menuText}>
              <Text style={styles.menuTitle}>데이터 백업</Text>
              <Text style={styles.menuDesc}>클라우드에 백업하기</Text>
            </View>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          <TouchableOpacity style={styles.menuItem} onPress={handleComingSoon}>
            <View style={[styles.menuIcon, { backgroundColor: COLORS.primary + '20' }]}>
              <Text style={styles.menuIconText}>📥</Text>
            </View>
            <View style={styles.menuText}>
              <Text style={styles.menuTitle}>데이터 복원</Text>
              <Text style={styles.menuDesc}>백업에서 복원하기</Text>
            </View>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          <TouchableOpacity style={styles.menuItem} onPress={handleComingSoon}>
            <View style={[styles.menuIcon, { backgroundColor: COLORS.gold + '20' }]}>
              <Text style={styles.menuIconText}>📤</Text>
            </View>
            <View style={styles.menuText}>
              <Text style={styles.menuTitle}>CSV 내보내기</Text>
              <Text style={styles.menuDesc}>엑셀 파일로 저장</Text>
            </View>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* 개발 로드맵 */}
        <Text style={styles.sectionTitle}>개발 로드맵</Text>
        <View style={styles.roadmapCard}>
          <View style={styles.roadmapItem}>
            <View style={[styles.roadmapCheck, styles.roadmapCheckDone]}>
              <Text style={styles.roadmapCheckText}>✓</Text>
            </View>
            <Text style={styles.roadmapText}>기본 기록 기능</Text>
          </View>
          <View style={styles.roadmapItem}>
            <View style={styles.roadmapCheck}>
              <Text style={styles.roadmapCheckText}>-</Text>
            </View>
            <Text style={styles.roadmapTextPending}>이미지 첨부</Text>
          </View>
          <View style={styles.roadmapItem}>
            <View style={styles.roadmapCheck}>
              <Text style={styles.roadmapCheckText}>-</Text>
            </View>
            <Text style={styles.roadmapTextPending}>장비 관리</Text>
          </View>
          <View style={styles.roadmapItem}>
            <View style={styles.roadmapCheck}>
              <Text style={styles.roadmapCheckText}>-</Text>
            </View>
            <Text style={styles.roadmapTextPending}>목표 설정</Text>
          </View>
          <View style={styles.roadmapItem}>
            <View style={styles.roadmapCheck}>
              <Text style={styles.roadmapCheckText}>-</Text>
            </View>
            <Text style={styles.roadmapTextPending}>클라우드 백업</Text>
          </View>
        </View>

        {/* 앱 정보 */}
        <View style={styles.appInfoCard}>
          <Text style={styles.appName}>⛳ Golf Diary</Text>
          <Text style={styles.appVersion}>버전 1.0.0</Text>
          <Text style={styles.appDev}>Made by 빛나아빠</Text>
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundGray,
  },
  header: {
    backgroundColor: COLORS.textPrimary,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textWhite,
  },
  headerSub: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: -8,
  },
  profileCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 32,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  profileLevel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.backgroundGray,
    borderRadius: 8,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginTop: 28,
    marginBottom: 12,
    marginLeft: 4,
  },
  menuCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    ...SHADOWS.small,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  menuDivider: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginLeft: 72,
  },
  menuIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIconText: {
    fontSize: 22,
  },
  menuText: {
    flex: 1,
    marginLeft: 14,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
  menuDesc: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  menuArrow: {
    fontSize: 24,
    color: COLORS.textMuted,
  },
  roadmapCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 20,
    ...SHADOWS.small,
  },
  roadmapItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  roadmapCheck: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.backgroundGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  roadmapCheckDone: {
    backgroundColor: COLORS.primary,
  },
  roadmapCheckText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textWhite,
  },
  roadmapText: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
  roadmapTextPending: {
    fontSize: 15,
    color: COLORS.textMuted,
  },
  appInfoCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    padding: 24,
    marginTop: 28,
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  appName: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textWhite,
  },
  appVersion: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 8,
  },
  appDev: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 4,
  },
  bottomSpace: {
    height: 40,
  },
});
