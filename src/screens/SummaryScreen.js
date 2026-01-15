import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { COLORS, SHADOWS } from '../theme/premium';

export default function SummaryScreen() {
  const [activeTab, setActiveTab] = useState('week');

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>요약</Text>
        <Text style={styles.headerSub}>나의 골프 활동 요약</Text>
      </View>

      {/* 탭 버튼 */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'week' && styles.activeTab]}
          onPress={() => setActiveTab('week')}
        >
          <Text style={[styles.tabText, activeTab === 'week' && styles.activeTabText]}>
            이번 주
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'month' && styles.activeTab]}
          onPress={() => setActiveTab('month')}
        >
          <Text style={[styles.tabText, activeTab === 'month' && styles.activeTabText]}>
            이번 달
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'year' && styles.activeTab]}
          onPress={() => setActiveTab('year')}
        >
          <Text style={[styles.tabText, activeTab === 'year' && styles.activeTabText]}>
            올해
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* 스탯 박스들 */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statEmoji}>⛳</Text>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>연습 횟수</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statEmoji}>🏐</Text>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>총 타수</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statEmoji}>🖥️</Text>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>스크린 라운드</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statEmoji}>🌿</Text>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>필드 라운드</Text>
          </View>
        </View>

        {/* 스코어 박스 */}
        <View style={styles.scoreSection}>
          <View style={styles.scoreCard}>
            <View style={styles.scoreHeader}>
              <Text style={styles.scoreIcon}>⭐</Text>
              <Text style={styles.scoreTitle}>평균 스코어</Text>
            </View>
            <Text style={styles.scoreValue}>-</Text>
          </View>
          {activeTab !== 'week' && (
            <View style={[styles.scoreCard, styles.scoreCardGold]}>
              <View style={styles.scoreHeader}>
                <Text style={styles.scoreIcon}>🏆</Text>
                <Text style={styles.scoreTitle}>베스트</Text>
              </View>
              <Text style={styles.scoreValue}>-</Text>
            </View>
          )}
        </View>

        {/* 안내 박스 */}
        <View style={styles.infoCard}>
          <View style={styles.infoIconBox}>
            <Text style={styles.infoEmoji}>💡</Text>
          </View>
          <View style={styles.infoTextBox}>
            <Text style={styles.infoTitle}>기록을 시작해보세요</Text>
            <Text style={styles.infoText}>
              연습과 라운드를 기록하면 여기에 통계가 표시됩니다.
            </Text>
          </View>
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
    backgroundColor: COLORS.accent,
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
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: -16,
    backgroundColor: COLORS.cardBg,
    borderRadius: 14,
    padding: 4,
    ...SHADOWS.medium,
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  activeTabText: {
    color: COLORS.textWhite,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 20,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    ...SHADOWS.small,
  },
  statEmoji: {
    fontSize: 32,
  },
  statValue: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.primary,
    marginTop: 10,
  },
  statLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  scoreSection: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  scoreCard: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    ...SHADOWS.small,
  },
  scoreCardGold: {
    backgroundColor: COLORS.gold,
  },
  scoreHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreIcon: {
    fontSize: 18,
    marginRight: 6,
  },
  scoreTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textWhite,
  },
  scoreValue: {
    fontSize: 36,
    fontWeight: '700',
    color: COLORS.textWhite,
    marginTop: 10,
  },
  infoCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  infoIconBox: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.warning + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoEmoji: {
    fontSize: 28,
  },
  infoTextBox: {
    flex: 1,
    marginLeft: 16,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
    lineHeight: 20,
  },
  bottomSpace: {
    height: 30,
  },
});
