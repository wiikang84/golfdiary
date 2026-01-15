import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, SHADOWS } from '../theme/premium';
import {
  calculateStats,
  loadScreenRounds,
  loadFieldRounds,
  getMonthlyPractices,
} from '../utils/storage';
import ScoreChart from '../components/ScoreChart';

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

export default function StatsScreen() {
  const [activeTab, setActiveTab] = useState('all');
  const [stats, setStats] = useState(null);
  const [screenRounds, setScreenRounds] = useState([]);
  const [fieldRounds, setFieldRounds] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [monthlyData, setMonthlyData] = useState({});

  const loadData = async () => {
    const statsData = await calculateStats();
    const screen = await loadScreenRounds();
    const field = await loadFieldRounds();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const monthly = await getMonthlyPractices(year, month);

    setStats(statsData);
    setScreenRounds(screen);
    setFieldRounds(field);
    setMonthlyData(monthly);
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [currentDate])
  );

  // 현재 탭에 맞는 통계 계산
  const getTabStats = () => {
    if (!stats) return { totalRounds: 0, avgScore: null, bestScore: null };

    const rounds = activeTab === 'all'
      ? [...screenRounds, ...fieldRounds]
      : activeTab === 'screen'
        ? screenRounds
        : fieldRounds;

    const scores = rounds.map(r => parseInt(r.score)).filter(s => !isNaN(s));

    return {
      totalRounds: rounds.length,
      avgScore: scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null,
      bestScore: scores.length > 0 ? Math.min(...scores) : null,
    };
  };

  // 필드 비용 계산
  const getFieldCosts = () => {
    const now = new Date();
    const thisMonth = fieldRounds.filter(r => {
      const dateParts = r.date?.replace(/\./g, '').trim().split(' ').filter(p => p);
      if (dateParts?.length >= 2) {
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]);
        return year === now.getFullYear() && month === now.getMonth() + 1;
      }
      return false;
    });

    const thisYear = fieldRounds.filter(r => {
      const dateParts = r.date?.replace(/\./g, '').trim().split(' ').filter(p => p);
      if (dateParts?.length >= 1) {
        return parseInt(dateParts[0]) === now.getFullYear();
      }
      return false;
    });

    return {
      monthTotal: thisMonth.reduce((sum, r) => sum + (parseInt(r.cost) || 0), 0),
      yearTotal: thisYear.reduce((sum, r) => sum + (parseInt(r.cost) || 0), 0),
    };
  };

  const tabStats = getTabStats();
  const fieldCosts = getFieldCosts();

  // 캘린더 관련 함수들
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const days = [];

    // 빈 칸 추가
    for (let i = 0; i < firstDay; i++) {
      days.push(<View key={`empty-${i}`} style={styles.calendarDay} />);
    }

    // 날짜 추가
    for (let day = 1; day <= daysInMonth; day++) {
      const dayData = monthlyData[day];
      const hasData = dayData && dayData.totalTime > 0;
      const intensity = hasData ? Math.min(dayData.totalTime / 120, 1) : 0; // 최대 2시간 기준

      days.push(
        <View key={day} style={styles.calendarDay}>
          <View style={[
            styles.calendarDayInner,
            hasData && { backgroundColor: `rgba(27, 94, 32, ${0.2 + intensity * 0.6})` }
          ]}>
            <Text style={[
              styles.calendarDayText,
              hasData && styles.calendarDayTextActive
            ]}>
              {day}
            </Text>
            {hasData && (
              <Text style={styles.calendarDayTime}>{dayData.totalTime}분</Text>
            )}
          </View>
        </View>
      );
    }

    return days;
  };

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
        {/* 스코어 추이 그래프 */}
        <View style={styles.chartWrapper}>
          <ScoreChart
            rounds={activeTab === 'all'
              ? [...screenRounds, ...fieldRounds].sort((a, b) => b.id - a.id)
              : activeTab === 'screen'
                ? screenRounds
                : fieldRounds
            }
            title={activeTab === 'all' ? '전체 스코어 추이' :
                   activeTab === 'screen' ? '스크린 스코어 추이' : '필드 스코어 추이'}
          />
        </View>

        {/* 월별 캘린더 */}
        <View style={styles.calendarCard}>
          <View style={styles.calendarHeader}>
            <TouchableOpacity onPress={prevMonth} style={styles.calendarArrow}>
              <Text style={styles.calendarArrowText}>‹</Text>
            </TouchableOpacity>
            <Text style={styles.calendarTitle}>
              {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
            </Text>
            <TouchableOpacity onPress={nextMonth} style={styles.calendarArrow}>
              <Text style={styles.calendarArrowText}>›</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.calendarWeekHeader}>
            {DAYS.map(day => (
              <Text key={day} style={[
                styles.calendarWeekDay,
                day === '일' && styles.calendarSunday,
                day === '토' && styles.calendarSaturday,
              ]}>
                {day}
              </Text>
            ))}
          </View>
          <View style={styles.calendarGrid}>
            {renderCalendar()}
          </View>
          <View style={styles.calendarLegend}>
            <Text style={styles.legendText}>연습 시간에 따라 색상 진하기가 달라집니다</Text>
          </View>
        </View>

        {/* 통계 카드 */}
        <View style={styles.statsCard}>
          <View style={[
            styles.statsCardHeader,
            activeTab === 'screen' && { backgroundColor: COLORS.info }
          ]}>
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
              <Text style={styles.statValue}>{tabStats.totalRounds}회</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>평균 스코어</Text>
              <Text style={styles.statValue}>
                {tabStats.avgScore !== null ? `${tabStats.avgScore}타` : '-'}
              </Text>
            </View>
            <View style={[styles.statRow, styles.statRowLast]}>
              <Text style={styles.statLabel}>베스트 스코어</Text>
              <Text style={[styles.statValue, { color: COLORS.gold }]}>
                {tabStats.bestScore !== null ? `${tabStats.bestScore}타` : '-'}
              </Text>
            </View>
          </View>
        </View>

        {/* 연습 통계 (전체 탭일 때) */}
        {activeTab === 'all' && stats && (
          <View style={styles.practiceCard}>
            <View style={styles.practiceHeader}>
              <Text style={styles.practiceIcon}>⛳</Text>
              <Text style={styles.practiceTitle}>연습 통계</Text>
            </View>
            <View style={styles.practiceBody}>
              <View style={styles.practiceItem}>
                <Text style={styles.practiceValue}>{stats.totalPractices}</Text>
                <Text style={styles.practiceLabel}>총 연습 횟수</Text>
              </View>
              <View style={styles.practiceDivider} />
              <View style={styles.practiceItem}>
                <Text style={styles.practiceValue}>{stats.totalPracticeHours}</Text>
                <Text style={styles.practiceLabel}>총 연습 시간(h)</Text>
              </View>
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
                <Text style={styles.costValue}>
                  {fieldCosts.monthTotal.toLocaleString()}원
                </Text>
              </View>
              <View style={styles.costDivider} />
              <View style={styles.costItem}>
                <Text style={styles.costLabel}>올해 총</Text>
                <Text style={styles.costValue}>
                  {fieldCosts.yearTotal.toLocaleString()}원
                </Text>
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
    marginTop: 20,
  },
  chartWrapper: {
    marginHorizontal: 0,
    marginBottom: 8,
  },
  // 캘린더 스타일
  calendarCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    ...SHADOWS.small,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  calendarArrow: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarArrowText: {
    fontSize: 28,
    color: COLORS.primary,
    fontWeight: '600',
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  calendarWeekHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  calendarWeekDay: {
    flex: 1,
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  calendarSunday: {
    color: COLORS.error,
  },
  calendarSaturday: {
    color: COLORS.info,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarDay: {
    width: '14.28%',
    aspectRatio: 1,
    padding: 2,
  },
  calendarDayInner: {
    flex: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarDayText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  calendarDayTextActive: {
    color: COLORS.textWhite,
    fontWeight: '600',
  },
  calendarDayTime: {
    fontSize: 8,
    color: COLORS.textWhite,
    marginTop: 1,
  },
  calendarLegend: {
    marginTop: 12,
    alignItems: 'center',
  },
  legendText: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  // 통계 카드
  statsCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    marginTop: 16,
    marginHorizontal: 16,
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
  // 연습 통계 카드
  practiceCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    marginTop: 16,
    marginHorizontal: 16,
    overflow: 'hidden',
    ...SHADOWS.small,
  },
  practiceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.primary,
  },
  practiceIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  practiceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textWhite,
  },
  practiceBody: {
    flexDirection: 'row',
    padding: 20,
  },
  practiceItem: {
    flex: 1,
    alignItems: 'center',
  },
  practiceDivider: {
    width: 1,
    backgroundColor: COLORS.divider,
  },
  practiceValue: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.primary,
  },
  practiceLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  // 비용 카드
  costCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    marginTop: 16,
    marginHorizontal: 16,
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
