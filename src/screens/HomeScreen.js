import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { COLORS, SHADOWS } from '../theme/premium';
import { getTodayQuote } from '../data/quotes';

export default function HomeScreen({ navigation }) {
  const todayQuote = getTodayQuote();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 상단 헤더 */}
      <View style={styles.header}>
        <Text style={styles.greeting}>오늘도 화이팅! 🏌️</Text>
        <Text style={styles.date}>
          {new Date().toLocaleDateString('ko-KR', {
            month: 'long',
            day: 'numeric',
            weekday: 'long'
          })}
        </Text>
      </View>

      {/* 명언 카드 */}
      <View style={styles.quoteCard}>
        <View style={styles.quoteIcon}>
          <Text style={styles.quoteIconText}>💬</Text>
        </View>
        <Text style={styles.quoteText}>"{todayQuote.quote}"</Text>
        <Text style={styles.quoteAuthor}>- {todayQuote.author}</Text>
      </View>

      {/* 이번 주 요약 */}
      <View style={styles.summaryCard}>
        <Text style={styles.sectionTitle}>이번 주 기록</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statIcon}>⛳</Text>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>연습</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statIcon}>🏆</Text>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>라운드</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statIcon}>⭐</Text>
            <Text style={styles.statNumber}>-</Text>
            <Text style={styles.statLabel}>베스트</Text>
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

      {/* 최근 기록 */}
      <View style={styles.recentCard}>
        <Text style={styles.sectionTitle}>최근 라운드</Text>
        <View style={styles.emptyRecent}>
          <Text style={styles.emptyIcon}>🏌️</Text>
          <Text style={styles.emptyText}>아직 기록이 없어요</Text>
          <Text style={styles.emptyDesc}>첫 라운드를 기록해보세요!</Text>
        </View>
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
  quoteCard: {
    backgroundColor: COLORS.cardBg,
    marginHorizontal: 16,
    marginTop: -20,
    borderRadius: 16,
    padding: 20,
    ...SHADOWS.medium,
  },
  quoteIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primaryLight + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quoteIconText: {
    fontSize: 22,
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
    fontSize: 28,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.primary,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
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
  bottomSpace: {
    height: 30,
  },
});
