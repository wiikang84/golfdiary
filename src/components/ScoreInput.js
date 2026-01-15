import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { COLORS, SHADOWS } from '../theme/premium';

// 기본 파 설정 (일반적인 파 72 코스)
const DEFAULT_PARS = [4, 4, 3, 5, 4, 4, 3, 4, 5, 4, 4, 3, 5, 4, 4, 3, 4, 5];

export default function ScoreInput({ visible, onClose, onSave, initialScores, initialPars }) {
  const [scores, setScores] = useState(Array(18).fill(''));
  const [pars, setPars] = useState(DEFAULT_PARS);
  const [activeHole, setActiveHole] = useState(null);

  useEffect(() => {
    if (initialScores && initialScores.length === 18) {
      setScores(initialScores.map(s => s?.toString() || ''));
    }
    if (initialPars && initialPars.length === 18) {
      setPars(initialPars);
    }
  }, [initialScores, initialPars]);

  const updateScore = (index, value) => {
    const newScores = [...scores];
    newScores[index] = value;
    setScores(newScores);
  };

  const quickScore = (index, delta) => {
    const par = pars[index];
    const current = parseInt(scores[index]) || par;
    const newScore = Math.max(1, current + delta);
    updateScore(index, newScore.toString());
  };

  const getScoreColor = (holeIndex) => {
    const score = parseInt(scores[holeIndex]);
    const par = pars[holeIndex];
    if (isNaN(score)) return COLORS.textMuted;

    const diff = score - par;
    if (diff <= -2) return '#9C27B0'; // 이글 이하 - 보라
    if (diff === -1) return COLORS.info; // 버디 - 파랑
    if (diff === 0) return COLORS.primary; // 파 - 초록
    if (diff === 1) return COLORS.gold; // 보기 - 노랑
    if (diff === 2) return '#FF9800'; // 더블보기 - 주황
    return COLORS.error; // 트리플 이상 - 빨강
  };

  const getScoreName = (holeIndex) => {
    const score = parseInt(scores[holeIndex]);
    const par = pars[holeIndex];
    if (isNaN(score)) return '';

    const diff = score - par;
    if (diff <= -3) return 'Albatross';
    if (diff === -2) return 'Eagle';
    if (diff === -1) return 'Birdie';
    if (diff === 0) return 'Par';
    if (diff === 1) return 'Bogey';
    if (diff === 2) return 'Double';
    if (diff === 3) return 'Triple';
    return `+${diff}`;
  };

  // 전반/후반/총 스코어 계산
  const calculateTotals = () => {
    const front9 = scores.slice(0, 9).reduce((sum, s) => sum + (parseInt(s) || 0), 0);
    const back9 = scores.slice(9, 18).reduce((sum, s) => sum + (parseInt(s) || 0), 0);
    const frontPar = pars.slice(0, 9).reduce((sum, p) => sum + p, 0);
    const backPar = pars.slice(9, 18).reduce((sum, p) => sum + p, 0);
    const totalPar = frontPar + backPar;
    const total = front9 + back9;
    const filledHoles = scores.filter(s => s !== '' && !isNaN(parseInt(s))).length;

    return { front9, back9, frontPar, backPar, total, totalPar, filledHoles };
  };

  const totals = calculateTotals();

  const handleSave = () => {
    if (totals.filledHoles === 0) {
      Alert.alert('알림', '최소 1홀 이상 스코어를 입력해주세요.');
      return;
    }
    onSave({
      scores: scores.map(s => parseInt(s) || null),
      pars,
      totalScore: totals.total,
      frontScore: totals.front9,
      backScore: totals.back9,
    });
    onClose();
  };

  const resetScores = () => {
    Alert.alert('초기화', '모든 스코어를 초기화할까요?', [
      { text: '취소', style: 'cancel' },
      { text: '확인', onPress: () => setScores(Array(18).fill('')) },
    ]);
  };

  const renderHoleInput = (holeIndex) => {
    const holeNum = holeIndex + 1;
    const par = pars[holeIndex];
    const score = scores[holeIndex];
    const scoreColor = getScoreColor(holeIndex);
    const scoreName = getScoreName(holeIndex);

    return (
      <TouchableOpacity
        key={holeIndex}
        style={[
          styles.holeCard,
          activeHole === holeIndex && styles.holeCardActive,
        ]}
        onPress={() => setActiveHole(activeHole === holeIndex ? null : holeIndex)}
      >
        <View style={styles.holeHeader}>
          <Text style={styles.holeNumber}>{holeNum}H</Text>
          <Text style={styles.holePar}>PAR {par}</Text>
        </View>

        {activeHole === holeIndex ? (
          <View style={styles.scoreInputContainer}>
            <TouchableOpacity
              style={styles.scoreBtn}
              onPress={() => quickScore(holeIndex, -1)}
            >
              <Text style={styles.scoreBtnText}>-</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.scoreInput}
              value={score}
              onChangeText={(text) => updateScore(holeIndex, text.replace(/[^0-9]/g, ''))}
              keyboardType="numeric"
              maxLength={2}
              placeholder={par.toString()}
              placeholderTextColor={COLORS.textMuted}
            />
            <TouchableOpacity
              style={styles.scoreBtn}
              onPress={() => quickScore(holeIndex, 1)}
            >
              <Text style={styles.scoreBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.scoreDisplay}>
            <Text style={[styles.scoreValue, { color: scoreColor }]}>
              {score || '-'}
            </Text>
            {scoreName && (
              <Text style={[styles.scoreName, { color: scoreColor }]}>
                {scoreName}
              </Text>
            )}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>18홀 스코어</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* 총 스코어 요약 */}
          <View style={styles.summaryBar}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>전반</Text>
              <Text style={styles.summaryValue}>
                {totals.front9 > 0 ? totals.front9 : '-'}
                <Text style={styles.summaryPar}> / {totals.frontPar}</Text>
              </Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>후반</Text>
              <Text style={styles.summaryValue}>
                {totals.back9 > 0 ? totals.back9 : '-'}
                <Text style={styles.summaryPar}> / {totals.backPar}</Text>
              </Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={[styles.summaryItem, styles.summaryTotal]}>
              <Text style={styles.summaryLabel}>총</Text>
              <Text style={styles.summaryTotalValue}>
                {totals.total > 0 ? totals.total : '-'}
              </Text>
              {totals.total > 0 && (
                <Text style={[
                  styles.summaryDiff,
                  { color: totals.total - totals.totalPar <= 0 ? COLORS.info : COLORS.error }
                ]}>
                  {totals.total - totals.totalPar > 0 ? '+' : ''}
                  {totals.total - totals.totalPar}
                </Text>
              )}
            </View>
          </View>

          <ScrollView style={styles.holesContainer} showsVerticalScrollIndicator={false}>
            {/* 전반 9홀 */}
            <Text style={styles.sectionTitle}>전반 (OUT)</Text>
            <View style={styles.holesGrid}>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(renderHoleInput)}
            </View>

            {/* 후반 9홀 */}
            <Text style={styles.sectionTitle}>후반 (IN)</Text>
            <View style={styles.holesGrid}>
              {[9, 10, 11, 12, 13, 14, 15, 16, 17].map(renderHoleInput)}
            </View>

            {/* 범례 */}
            <View style={styles.legend}>
              <Text style={styles.legendTitle}>스코어 범례</Text>
              <View style={styles.legendItems}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#9C27B0' }]} />
                  <Text style={styles.legendText}>이글</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: COLORS.info }]} />
                  <Text style={styles.legendText}>버디</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: COLORS.primary }]} />
                  <Text style={styles.legendText}>파</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: COLORS.gold }]} />
                  <Text style={styles.legendText}>보기</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: COLORS.error }]} />
                  <Text style={styles.legendText}>더블+</Text>
                </View>
              </View>
            </View>

            <View style={styles.bottomSpace} />
          </ScrollView>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.resetButton} onPress={resetScores}>
              <Text style={styles.resetButtonText}>초기화</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>저장하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.cardBg,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '95%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.primary,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textWhite,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: COLORS.textWhite,
  },
  summaryBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.backgroundGray,
    padding: 16,
    alignItems: 'center',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryTotal: {
    flex: 1.2,
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.divider,
  },
  summaryLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: 4,
  },
  summaryPar: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.textSecondary,
  },
  summaryTotalValue: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.primary,
    marginTop: 2,
  },
  summaryDiff: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 2,
  },
  holesContainer: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 12,
    marginTop: 8,
  },
  holesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  holeCard: {
    width: '31%',
    backgroundColor: COLORS.backgroundGray,
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
  },
  holeCardActive: {
    backgroundColor: COLORS.primary + '20',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  holeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 8,
  },
  holeNumber: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  holePar: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  scoreDisplay: {
    alignItems: 'center',
    minHeight: 50,
    justifyContent: 'center',
  },
  scoreValue: {
    fontSize: 28,
    fontWeight: '700',
  },
  scoreName: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
  },
  scoreInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  scoreBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreBtnText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textWhite,
  },
  scoreInput: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.cardBg,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  legend: {
    marginTop: 20,
    padding: 16,
    backgroundColor: COLORS.backgroundGray,
    borderRadius: 12,
  },
  legendTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 10,
  },
  legendItems: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  bottomSpace: {
    height: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  resetButton: {
    flex: 1,
    backgroundColor: COLORS.backgroundGray,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  saveButton: {
    flex: 2,
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.textWhite,
  },
});
