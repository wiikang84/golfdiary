import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, SHADOWS } from '../theme/premium';
import { getTodayQuote, getRandomQuote } from '../data/quotes';
import { calculateLevel, getLevelTitle, getWeeklyStats, loadScreenRounds, loadFieldRounds } from '../utils/storage';

export default function HomeScreen({ navigation }) {
  const [quote, setQuote] = useState(getTodayQuote());
  const [levelInfo, setLevelInfo] = useState(null);
  const [weeklyStats, setWeeklyStats] = useState(null);
  const [recentRounds, setRecentRounds] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    const level = await calculateLevel();
    const weekly = await getWeeklyStats();
    const screenRounds = await loadScreenRounds();
    const fieldRounds = await loadFieldRounds();

    // 최근 라운드 3개
    const allRounds = [...screenRounds, ...fieldRounds]
      .sort((a, b) => b.id - a.id)
      .slice(0, 3);

    setLevelInfo(level);
    setWeeklyStats(weekly);
    setRecentRounds(allRounds);
  };

  // 화면 포커스될 때마다 데이터 새로고침
  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const refreshQuote = () => {
    setQuote(getRandomQuote());
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.primary]} />
      }
    >
      {/* 상단 헤더 */}
      <View style={styles.header}>
        <Text style={styles.greeting}>오늘도 화이팅!</Text>
        <Text style={styles.date}>
          {new Date().toLocaleDateString('ko-KR', {
            month: 'long',
            day: 'numeric',
            weekday: 'long'
          })}
        </Text>
      </View>

      {/* 레벨 카드 */}
      {levelInfo && (
        <View style={styles.levelCard}>
          <View style={styles.levelHeader}>
            <View style={styles.levelBadge}>
              <Text style={styles.levelNumber}>Lv.{levelInfo.level}</Text>
            </View>
            <View style={styles.levelInfo}>
              <Text style={styles.levelTitle}>{getLevelTitle(levelInfo.level)}</Text>
              <Text style={styles.levelHours}>총 {levelInfo.totalHours}시간 연습</Text>
            </View>
          </View>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${levelInfo.progressPercent}%` }]} />
            </View>
            <Text style={styles.progressText}>
              다음 레벨까지 {levelInfo.hoursToNextLevel}시간
            </Text>
          </View>
        </View>
      )}

      {/* 명언 카드 */}
      <View style={styles.quoteCard}>
        <View style={styles.quoteHeader}>
          <View style={styles.quoteIcon}>
            <Text style={styles.quoteIconText}>💬</Text>
          </View>
          <TouchableOpacity style={styles.refreshButton} onPress={refreshQuote}>
            <Text style={styles.refreshButtonText}>🔄 다른 명언</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.quoteText}>"{quote.quote}"</Text>
        <Text style={styles.quoteAuthor}>- {quote.author}</Text>
      </View>

      {/* 이번 주 요약 */}
      <View style={styles.summaryCard}>
        <Text style={styles.sectionTitle}>이번 주 기록</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statIcon}>⛳</Text>
            <Text style={styles.statNumber}>{weeklyStats?.practiceCount || 0}</Text>
            <Text style={styles.statLabel}>연습</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statIcon}>🖥️</Text>
            <Text style={styles.statNumber}>{weeklyStats?.screenRoundCount || 0}</Text>
            <Text style={styles.statLabel}>스크린</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statIcon}>🏌️</Text>
            <Text style={styles.statNumber}>{weeklyStats?.fieldRoundCount || 0}</Text>
            <Text style={styles.statLabel}>필드</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statIcon}>⏱️</Text>
            <Text style={styles.statNumber}>{Math.floor((weeklyStats?.practiceTime || 0) / 60)}</Text>
            <Text style={styles.statLabel}>시간</Text>
          </View>
        </View>
      </View>

      {/* 빠른 기록 버튼 */}
      <Text style={styles.sectionTitle2}>빠른 기록</Text>
      <View style={styles.quickButtons}>
        <TouchableOpacity
          style={styles.quickButton}
          onPress={() => navigation.navigate('연습')}
        >
          <View style={[styles.quickIcon, { backgroundColor: COLORS.primary }]}>
            <Text style={styles.quickIconText}>⛳</Text>
          </View>
          <View style={styles.quickTextBox}>
            <Text style={styles.quickTitle}>연습 기록</Text>
            <Text style={styles.quickDesc}>오늘 연습 내용을 기록하세요</Text>
          </View>
          <Text style={styles.quickArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickButton}
          onPress={() => navigation.navigate('라운드')}
        >
          <View style={[styles.quickIcon, { backgroundColor: COLORS.info }]}>
            <Text style={styles.quickIconText}>🏆</Text>
          </View>
          <View style={styles.quickTextBox}>
            <Text style={styles.quickTitle}>라운드 기록</Text>
            <Text style={styles.quickDesc}>스크린/필드 라운드 기록</Text>
          </View>
          <Text style={styles.quickArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickButton}
          onPress={() => navigation.navigate('통계')}
        >
          <View style={[styles.quickIcon, { backgroundColor: COLORS.gold }]}>
            <Text style={styles.quickIconText}>📊</Text>
          </View>
          <View style={styles.quickTextBox}>
            <Text style={styles.quickTitle}>통계 보기</Text>
            <Text style={styles.quickDesc}>나의 골프 성적 분석</Text>
          </View>
          <Text style={styles.quickArrow}>›</Text>
        </TouchableOpacity>
      </View>

      {/* 최근 라운드 */}
      <View style={styles.recentCard}>
        <Text style={styles.sectionTitle}>최근 라운드</Text>
        {recentRounds.length === 0 ? (
          <View style={styles.emptyRecent}>
            <Text style={styles.emptyIcon}>🏌️</Text>
            <Text style={styles.emptyText}>아직 기록이 없어요</Text>
            <Text style={styles.emptyDesc}>첫 라운드를 기록해보세요!</Text>
          </View>
        ) : (
          recentRounds.map(round => (
            <View key={round.id} style={styles.recentItem}>
              <View style={styles.recentLeft}>
                <Text style={styles.recentType}>
                  {round.type === 'screen' ? '🖥️ 스크린' : '🏌️ 필드'}
                </Text>
                <Text style={styles.recentCourse}>{round.course || '골프장'}</Text>
                <Text style={styles.recentDate}>{round.date}</Text>
              </View>
              <View style={styles.recentScore}>
                <Text style={styles.recentScoreNumber}>{round.score}</Text>
                <Text style={styles.recentScoreLabel}>타</Text>
              </View>
            </View>
          ))
        )}
      </View>

      <View style={styles.bottomSpace} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundGray,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  greeting: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.textWhite,
  },
  date: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  levelCard: {
    backgroundColor: COLORS.cardBg,
    marginHorizontal: 16,
    marginTop: -20,
    borderRadius: 16,
    padding: 16,
    ...SHADOWS.medium,
  },
  levelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelBadge: {
    backgroundColor: COLORS.gold,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  levelNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textWhite,
  },
  levelInfo: {
    marginLeft: 14,
    flex: 1,
  },
  levelTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  levelHours: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  progressContainer: {
    marginTop: 14,
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.backgroundGray,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.gold,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 6,
    textAlign: 'right',
  },
  quoteCard: {
    backgroundColor: COLORS.cardBg,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 20,
    ...SHADOWS.small,
  },
  quoteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  quoteIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primaryLight + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quoteIconText: {
    fontSize: 22,
  },
  refreshButton: {
    backgroundColor: COLORS.backgroundGray,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  refreshButtonText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  quoteText: {
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.textPrimary,
    lineHeight: 28,
  },
  quoteAuthor: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 12,
  },
  summaryCard: {
    backgroundColor: COLORS.cardBg,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 20,
    ...SHADOWS.small,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  sectionTitle2: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 50,
    backgroundColor: COLORS.divider,
  },
  statIcon: {
    fontSize: 24,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.primary,
    marginTop: 6,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  quickButtons: {
    paddingHorizontal: 16,
  },
  quickButton: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    ...SHADOWS.small,
  },
  quickIcon: {
    width: 50,
    height: 50,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickIconText: {
    fontSize: 26,
  },
  quickTextBox: {
    flex: 1,
    marginLeft: 14,
  },
  quickTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  quickDesc: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  quickArrow: {
    fontSize: 28,
    color: COLORS.textMuted,
  },
  recentCard: {
    backgroundColor: COLORS.cardBg,
    marginHorizontal: 16,
    marginTop: 24,
    borderRadius: 16,
    padding: 20,
    ...SHADOWS.small,
  },
  emptyRecent: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  emptyIcon: {
    fontSize: 48,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.textSecondary,
    marginTop: 12,
  },
  emptyDesc: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginTop: 4,
  },
  recentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  recentLeft: {
    flex: 1,
  },
  recentType: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  recentCourse: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginTop: 2,
  },
  recentDate: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  recentScore: {
    flexDirection: 'row',
    alignItems: 'baseline',
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  recentScoreNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textWhite,
  },
  recentScoreLabel: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    marginLeft: 2,
  },
  bottomSpace: {
    height: 30,
  },
});
