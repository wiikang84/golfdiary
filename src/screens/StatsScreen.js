import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { COLORS, SHADOWS } from '../theme/premium';

export default function StatsScreen() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>통계</Text>
        <Text style={styles.headerSub}>나의 골프 성적 분석</Text>
      </View>

      {/* 탭 버튼 */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'all' && styles.activeTab]}
          onPress={() => setActiveTab('all')}
        >
          <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>
            전체
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'screen' && styles.activeTabBlue]}
          onPress={() => setActiveTab('screen')}
        >
          <Text style={[styles.tabText, activeTab === 'screen' && styles.activeTabText]}>
            스크린
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'field' && styles.activeTab]}
          onPress={() => setActiveTab('field')}
        >
          <Text style={[styles.tabText, activeTab === 'field' && styles.activeTabText]}>
            필드
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* 차트 플레이스홀더 */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>스코어 추이</Text>
          <View style={styles.chartPlaceholder}>
            <Text style={styles.chartEmoji}>📊</Text>
            <Text style={styles.chartText}>데이터가 쌓이면 그래프가 표시됩니다</Text>
          </View>
        </View>

        {/* 통계 카드 */}
        <View style={styles.statsCard}>
          <View style={styles.statsCardHeader}>
            <Text style={styles.statsCardIcon}>
              {activeTab === 'all' ? '📊' : activeTab === 'screen' ? '🖥️' : '🌿'}
            </Text>
            <Text style={styles.statsCardTitle}>
              {activeTab === 'all' ? '전체 통계' :
               activeTab === 'screen' ? '스크린 통계' : '필드 통계'}
            </Text>
          </View>
          <View style={styles.statsCardBody}>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>총 라운드</Text>
              <Text style={styles.statValue}>0회</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>평균 스코어</Text>
              <Text style={styles.statValue}>-</Text>
            </View>
            <View style={[styles.statRow, styles.statRowLast]}>
              <Text style={styles.statLabel}>베스트 스코어</Text>
              <Text style={[styles.statValue, { color: COLORS.gold }]}>-</Text>
            </View>
          </View>
        </View>

        {activeTab === 'screen' && (
          <View style={styles.challengeCard}>
            <View style={styles.challengeHeader}>
              <Text style={styles.challengeIcon}>🏆</Text>
              <Text style={styles.challengeTitle}>올버디 챌린지</Text>
            </View>
            <View style={styles.challengeBody}>
              <Text style={styles.challengeValue}>0 / 18</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '0%' }]} />
              </View>
              <Text style={styles.challengePercent}>0%</Text>
            </View>
          </View>
        )}

        {activeTab === 'field' && (
          <View style={styles.costCard}>
            <View style={styles.costHeader}>
              <Text style={styles.costIcon}>💰</Text>
              <Text style={styles.costTitle}>비용 통계</Text>
            </View>
            <View style={styles.costBody}>
              <View style={styles.costItem}>
                <Text style={styles.costLabel}>이번 달</Text>
                <Text style={styles.costValue}>0원</Text>
              </View>
              <View style={styles.costDivider} />
              <View style={styles.costItem}>
                <Text style={styles.costLabel}>올해 총</Text>
                <Text style={styles.costValue}>0원</Text>
              </View>
            </View>
          </View>
        )}

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
    backgroundColor: COLORS.primaryDark,
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
  activeTabBlue: {
    backgroundColor: COLORS.info,
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
  chartCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 20,
    ...SHADOWS.small,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  chartPlaceholder: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: COLORS.backgroundGray,
    borderRadius: 12,
  },
  chartEmoji: {
    fontSize: 48,
  },
  chartText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 12,
  },
  statsCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    marginTop: 16,
    overflow: 'hidden',
    ...SHADOWS.small,
  },
  statsCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.primary,
  },
  statsCardIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  statsCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textWhite,
  },
  statsCardBody: {
    padding: 16,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  statRowLast: {
    borderBottomWidth: 0,
  },
  statLabel: {
    fontSize: 15,
    color: COLORS.textSecondary,
  },
  statValue: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  challengeCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    marginTop: 16,
    overflow: 'hidden',
    ...SHADOWS.small,
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.info,
  },
  challengeIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textWhite,
  },
  challengeBody: {
    padding: 20,
    alignItems: 'center',
  },
  challengeValue: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.info,
  },
  progressBar: {
    width: '100%',
    height: 12,
    backgroundColor: COLORS.backgroundGray,
    borderRadius: 6,
    marginTop: 16,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.info,
    borderRadius: 6,
  },
  challengePercent: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 10,
  },
  costCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    marginTop: 16,
    overflow: 'hidden',
    ...SHADOWS.small,
  },
  costHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.gold,
  },
  costIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  costTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textWhite,
  },
  costBody: {
    flexDirection: 'row',
    padding: 20,
  },
  costItem: {
    flex: 1,
    alignItems: 'center',
  },
  costDivider: {
    width: 1,
    backgroundColor: COLORS.divider,
  },
  costLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  costValue: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: 6,
  },
  bottomSpace: {
    height: 30,
  },
});
