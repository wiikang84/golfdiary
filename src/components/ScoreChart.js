import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import { COLORS, SHADOWS } from '../theme/premium';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CHART_WIDTH = SCREEN_WIDTH - 64;
const CHART_HEIGHT = 180;
const PADDING_LEFT = 40;
const PADDING_RIGHT = 20;
const PADDING_TOP = 20;
const PADDING_BOTTOM = 30;

export default function ScoreChart({ rounds, title = '최근 스코어 추이' }) {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [rounds]);

  if (!rounds || rounds.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.emptyChart}>
          <Text style={styles.emptyIcon}>📊</Text>
          <Text style={styles.emptyText}>라운드 기록이 없습니다</Text>
        </View>
      </View>
    );
  }

  // 최근 10개 라운드만 사용 (역순으로 정렬)
  const recentRounds = [...rounds]
    .filter(r => r.score && !isNaN(parseInt(r.score)))
    .slice(0, 10)
    .reverse();

  if (recentRounds.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.emptyChart}>
          <Text style={styles.emptyIcon}>📊</Text>
          <Text style={styles.emptyText}>스코어 기록이 없습니다</Text>
        </View>
      </View>
    );
  }

  const scores = recentRounds.map(r => parseInt(r.score));
  const minScore = Math.min(...scores) - 5;
  const maxScore = Math.max(...scores) + 5;
  const scoreRange = maxScore - minScore;

  const graphWidth = CHART_WIDTH - PADDING_LEFT - PADDING_RIGHT;
  const graphHeight = CHART_HEIGHT - PADDING_TOP - PADDING_BOTTOM;

  // 점 위치 계산
  const points = scores.map((score, index) => {
    const x = PADDING_LEFT + (index / (scores.length - 1 || 1)) * graphWidth;
    const y = PADDING_TOP + ((maxScore - score) / scoreRange) * graphHeight;
    return { x, y, score };
  });

  // Y축 눈금 생성
  const yAxisLabels = [];
  const step = Math.ceil(scoreRange / 4);
  for (let i = 0; i <= 4; i++) {
    const value = maxScore - (i * step);
    if (value >= minScore) {
      yAxisLabels.push({
        value,
        y: PADDING_TOP + (i * step / scoreRange) * graphHeight,
      });
    }
  }

  // 평균 스코어
  const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  const avgY = PADDING_TOP + ((maxScore - avgScore) / scoreRange) * graphHeight;

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.avgBadge}>
          <Text style={styles.avgLabel}>평균</Text>
          <Text style={styles.avgValue}>{avgScore}타</Text>
        </View>
      </View>

      <View style={styles.chartContainer}>
        {/* Y축 라벨 */}
        {yAxisLabels.map((label, i) => (
          <View key={i} style={[styles.yAxisLabel, { top: label.y - 8 }]}>
            <Text style={styles.yAxisText}>{label.value}</Text>
          </View>
        ))}

        {/* 그리드 라인 */}
        {yAxisLabels.map((label, i) => (
          <View
            key={`grid-${i}`}
            style={[
              styles.gridLine,
              { top: label.y, left: PADDING_LEFT, width: graphWidth },
            ]}
          />
        ))}

        {/* 평균선 */}
        <View
          style={[
            styles.avgLine,
            { top: avgY, left: PADDING_LEFT, width: graphWidth },
          ]}
        />

        {/* 연결선 (SVG 대신 View로 구현) */}
        {points.length > 1 && points.map((point, index) => {
          if (index === 0) return null;
          const prevPoint = points[index - 1];
          const dx = point.x - prevPoint.x;
          const dy = point.y - prevPoint.y;
          const length = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);

          return (
            <Animated.View
              key={`line-${index}`}
              style={[
                styles.line,
                {
                  left: prevPoint.x,
                  top: prevPoint.y,
                  width: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, length],
                  }),
                  transform: [{ rotate: `${angle}deg` }],
                },
              ]}
            />
          );
        })}

        {/* 데이터 포인트 */}
        {points.map((point, index) => (
          <Animated.View
            key={`point-${index}`}
            style={[
              styles.point,
              {
                left: point.x - 8,
                top: point.y - 8,
                opacity: animatedValue,
                transform: [{
                  scale: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  }),
                }],
              },
            ]}
          >
            <View style={styles.pointInner} />
          </Animated.View>
        ))}

        {/* X축 라벨 */}
        {recentRounds.map((round, index) => {
          const x = PADDING_LEFT + (index / (recentRounds.length - 1 || 1)) * graphWidth;
          // 날짜에서 월/일만 추출
          const dateStr = round.date || '';
          const parts = dateStr.replace(/\./g, '').trim().split(' ').filter(p => p);
          const label = parts.length >= 3 ? `${parts[1]}/${parts[2]}` : `R${index + 1}`;

          return (
            <View
              key={`xlabel-${index}`}
              style={[styles.xAxisLabel, { left: x - 20 }]}
            >
              <Text style={styles.xAxisText}>{label}</Text>
            </View>
          );
        })}
      </View>

      {/* 최고/최저 표시 */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>최고</Text>
          <Text style={[styles.statValue, { color: COLORS.scoreBirdie }]}>
            {Math.min(...scores)}타
          </Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>최저</Text>
          <Text style={[styles.statValue, { color: COLORS.scoreTriple }]}>
            {Math.max(...scores)}타
          </Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>라운드</Text>
          <Text style={styles.statValue}>{scores.length}회</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    ...SHADOWS.medium,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  avgBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary + '15',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  avgLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginRight: 6,
  },
  avgValue: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
  },
  chartContainer: {
    height: CHART_HEIGHT,
    position: 'relative',
  },
  yAxisLabel: {
    position: 'absolute',
    left: 0,
    width: PADDING_LEFT - 8,
    alignItems: 'flex-end',
  },
  yAxisText: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  gridLine: {
    position: 'absolute',
    height: 1,
    backgroundColor: COLORS.divider,
  },
  avgLine: {
    position: 'absolute',
    height: 1,
    backgroundColor: COLORS.gold,
    borderStyle: 'dashed',
  },
  line: {
    position: 'absolute',
    height: 3,
    backgroundColor: COLORS.primary,
    borderRadius: 1.5,
    transformOrigin: 'left center',
  },
  point: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.cardBg,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  pointInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  xAxisLabel: {
    position: 'absolute',
    bottom: 0,
    width: 40,
    alignItems: 'center',
  },
  xAxisText: {
    fontSize: 10,
    color: COLORS.textMuted,
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.divider,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: 4,
  },
  emptyChart: {
    height: CHART_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundGray,
    borderRadius: 12,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.textMuted,
  },
});
