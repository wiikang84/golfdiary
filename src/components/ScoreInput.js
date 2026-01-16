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
  Dimensions,
  Platform,
} from 'react-native';

const isWeb = Platform.OS === 'web';
import { COLORS, SHADOWS } from '../theme/premium';

const { width } = Dimensions.get('window');
const HOLE_WIDTH = (width - 60) / 9; // 9홀씩 표시

// 기본 파 설정 (일반적인 파 72 코스)
const DEFAULT_PARS = [4, 4, 3, 5, 4, 4, 3, 4, 5, 4, 4, 3, 5, 4, 4, 3, 4, 5];

export default function ScoreInput({ visible, onClose, onSave, initialScores, initialPars, fromOCR }) {
  const [scores, setScores] = useState(Array(18).fill(''));
  const [pars, setPars] = useState(DEFAULT_PARS);
  const [editingHole, setEditingHole] = useState(null);
  const [inputMode, setInputMode] = useState('strokes'); // 'strokes' 실제 타수, 'diff' 파 대비

  useEffect(() => {
    if (visible) {
      if (initialScores && initialScores.length === 18) {
        setScores(initialScores.map(s => s?.toString() || ''));
      } else {
        setScores(Array(18).fill(''));
      }
      if (initialPars && initialPars.length === 18) {
        setPars(initialPars);
      } else {
        setPars(DEFAULT_PARS);
      }
    }
  }, [visible, initialScores, initialPars]);

  const updateScore = (index, value) => {
    const newScores = [...scores];
    // 숫자만 허용, 최대 2자리
    const numValue = value.replace(/[^0-9]/g, '').slice(0, 2);
    newScores[index] = numValue;
    setScores(newScores);
  };

  const getScoreStyle = (holeIndex) => {
    const score = parseInt(scores[holeIndex]);
    const par = pars[holeIndex];
    if (isNaN(score) || !score) return {};

    const diff = score - par;
    if (diff <= -2) return { backgroundColor: COLORS.scoreEagle, color: '#fff' }; // 이글
    if (diff === -1) return { backgroundColor: COLORS.scoreBirdie, color: '#fff' }; // 버디
    if (diff === 0) return { backgroundColor: COLORS.scorePar, color: '#fff' }; // 파
    if (diff === 1) return { backgroundColor: COLORS.scoreBogey, color: '#fff' }; // 보기
    if (diff === 2) return { backgroundColor: COLORS.scoreDouble, color: '#fff' }; // 더블
    return { backgroundColor: COLORS.scoreTriple, color: '#fff' }; // 트리플+
  };

  // 전반/후반/총 스코어 계산
  const calculateTotals = () => {
    const front9 = scores.slice(0, 9).reduce((sum, s) => sum + (parseInt(s) || 0), 0);
    const back9 = scores.slice(9, 18).reduce((sum, s) => sum + (parseInt(s) || 0), 0);
    const frontPar = pars.slice(0, 9).reduce((sum, p) => sum + p, 0);
    const backPar = pars.slice(9, 18).reduce((sum, p) => sum + p, 0);
    const total = front9 + back9;
    const totalPar = frontPar + backPar;
    const filledCount = scores.filter(s => s && !isNaN(parseInt(s))).length;

    return { front9, back9, frontPar, backPar, total, totalPar, filledCount };
  };

  const totals = calculateTotals();

  const handleSave = () => {
    if (totals.filledCount === 0) {
      if (isWeb) {
        window.alert('최소 1홀 이상 스코어를 입력해주세요.');
      } else {
        Alert.alert('알림', '최소 1홀 이상 스코어를 입력해주세요.');
      }
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

  const fillWithPar = () => {
    if (isWeb) {
      if (window.confirm('모든 홀을 파로 채울까요?')) {
        setScores(pars.map(p => p.toString()));
      }
    } else {
      Alert.alert('파로 채우기', '모든 홀을 파로 채울까요?', [
        { text: '취소', style: 'cancel' },
        {
          text: '확인',
          onPress: () => setScores(pars.map(p => p.toString())),
        },
      ]);
    }
  };

  const resetScores = () => {
    if (isWeb) {
      if (window.confirm('모든 스코어를 초기화할까요?')) {
        setScores(Array(18).fill(''));
      }
    } else {
      Alert.alert('초기화', '모든 스코어를 초기화할까요?', [
        { text: '취소', style: 'cancel' },
        { text: '확인', onPress: () => setScores(Array(18).fill('')) },
      ]);
    }
  };

  // 스코어 테이블 행 렌더링
  const renderScoreRow = (startHole, label) => {
    const holes = Array.from({ length: 9 }, (_, i) => startHole + i);
    const rowScores = holes.map(h => parseInt(scores[h]) || 0);
    const rowTotal = rowScores.reduce((a, b) => a + b, 0);
    const rowPar = holes.map(h => pars[h]).reduce((a, b) => a + b, 0);

    return (
      <View style={styles.scoreTable}>
        {/* 헤더: 홀 번호 */}
        <View style={styles.tableRow}>
          <View style={[styles.tableCell, styles.labelCell]}>
            <Text style={styles.labelText}>{label}</Text>
          </View>
          {holes.map(h => (
            <View key={h} style={styles.tableCell}>
              <Text style={styles.holeNumber}>{h + 1}</Text>
            </View>
          ))}
          <View style={[styles.tableCell, styles.totalCell]}>
            <Text style={styles.totalLabel}>합계</Text>
          </View>
        </View>

        {/* 파 */}
        <View style={styles.tableRow}>
          <View style={[styles.tableCell, styles.labelCell]}>
            <Text style={styles.parLabel}>PAR</Text>
          </View>
          {holes.map(h => (
            <View key={h} style={styles.tableCell}>
              <Text style={styles.parValue}>{pars[h]}</Text>
            </View>
          ))}
          <View style={[styles.tableCell, styles.totalCell]}>
            <Text style={styles.parTotal}>{rowPar}</Text>
          </View>
        </View>

        {/* 스코어 입력 */}
        <View style={styles.tableRow}>
          <View style={[styles.tableCell, styles.labelCell]}>
            <Text style={styles.scoreLabel}>타수</Text>
          </View>
          {holes.map(h => {
            const scoreStyle = getScoreStyle(h);
            return (
              <TouchableOpacity
                key={h}
                style={[styles.tableCell, styles.scoreCell, scoreStyle]}
                onPress={() => setEditingHole(h)}
              >
                <Text style={[styles.scoreValue, scoreStyle.color && { color: scoreStyle.color }]}>
                  {scores[h] || '-'}
                </Text>
              </TouchableOpacity>
            );
          })}
          <View style={[styles.tableCell, styles.totalCell, styles.scoreTotalCell]}>
            <Text style={styles.scoreTotal}>{rowTotal || '-'}</Text>
          </View>
        </View>
      </View>
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
          {/* 헤더 */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>18홀 스코어 입력</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* OCR 안내 메시지 */}
          {fromOCR && (
            <View style={styles.ocrNotice}>
              <Text style={styles.ocrNoticeText}>
                스코어카드 인식 결과입니다. 틀린 부분을 터치해서 수정하세요.
              </Text>
            </View>
          )}

          {/* 총 스코어 요약 */}
          <View style={styles.summaryBar}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>전반(OUT)</Text>
              <Text style={styles.summaryValue}>{totals.front9 || '-'}</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>후반(IN)</Text>
              <Text style={styles.summaryValue}>{totals.back9 || '-'}</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={[styles.summaryItem, styles.summaryTotal]}>
              <Text style={styles.summaryLabel}>총 스코어</Text>
              <Text style={styles.summaryTotalValue}>{totals.total || '-'}</Text>
              {totals.total > 0 && (
                <Text style={[
                  styles.summaryDiff,
                  { color: totals.total - totals.totalPar <= 0 ? COLORS.info : COLORS.error }
                ]}>
                  ({totals.total - totals.totalPar > 0 ? '+' : ''}{totals.total - totals.totalPar})
                </Text>
              )}
            </View>
          </View>

          <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {/* 전반 9홀 */}
            <Text style={styles.sectionTitle}>전반 (OUT)</Text>
            {renderScoreRow(0, 'HOLE')}

            {/* 후반 9홀 */}
            <Text style={styles.sectionTitle}>후반 (IN)</Text>
            {renderScoreRow(9, 'HOLE')}

            {/* 범례 */}
            <View style={styles.legend}>
              <View style={[styles.legendItem, { backgroundColor: COLORS.scoreEagle }]}>
                <Text style={styles.legendText}>이글</Text>
              </View>
              <View style={[styles.legendItem, { backgroundColor: COLORS.scoreBirdie }]}>
                <Text style={styles.legendText}>버디</Text>
              </View>
              <View style={[styles.legendItem, { backgroundColor: COLORS.scorePar }]}>
                <Text style={styles.legendText}>파</Text>
              </View>
              <View style={[styles.legendItem, { backgroundColor: COLORS.scoreBogey }]}>
                <Text style={styles.legendText}>보기</Text>
              </View>
              <View style={[styles.legendItem, { backgroundColor: COLORS.scoreTriple }]}>
                <Text style={styles.legendText}>더블+</Text>
              </View>
            </View>

            {/* 빠른 채우기 버튼 */}
            <View style={styles.quickActions}>
              <TouchableOpacity style={styles.quickButton} onPress={fillWithPar}>
                <Text style={styles.quickButtonText}>전체 파로 채우기</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.quickButton, styles.resetButton]} onPress={resetScores}>
                <Text style={styles.quickButtonText}>초기화</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.bottomSpace} />
          </ScrollView>

          {/* 저장 버튼 */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>저장하기</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 개별 홀 스코어 입력 모달 */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={editingHole !== null}
        onRequestClose={() => setEditingHole(null)}
      >
        <TouchableOpacity
          style={styles.editOverlay}
          activeOpacity={1}
          onPress={() => setEditingHole(null)}
        >
          <View style={styles.editBox}>
            <Text style={styles.editTitle}>{editingHole !== null ? `${editingHole + 1}번홀` : ''}</Text>
            <Text style={styles.editPar}>PAR {editingHole !== null ? pars[editingHole] : ''}</Text>

            <View style={styles.editInputRow}>
              <TouchableOpacity
                style={styles.editBtn}
                onPress={() => {
                  if (editingHole !== null) {
                    const current = parseInt(scores[editingHole]) || pars[editingHole];
                    updateScore(editingHole, Math.max(1, current - 1).toString());
                  }
                }}
              >
                <Text style={styles.editBtnText}>-</Text>
              </TouchableOpacity>

              <TextInput
                style={styles.editInput}
                value={editingHole !== null ? scores[editingHole] : ''}
                onChangeText={(text) => editingHole !== null && updateScore(editingHole, text)}
                keyboardType="numeric"
                maxLength={2}
                placeholder={editingHole !== null ? pars[editingHole].toString() : ''}
                placeholderTextColor={COLORS.textMuted}
                autoFocus
              />

              <TouchableOpacity
                style={styles.editBtn}
                onPress={() => {
                  if (editingHole !== null) {
                    const current = parseInt(scores[editingHole]) || pars[editingHole];
                    updateScore(editingHole, (current + 1).toString());
                  }
                }}
              >
                <Text style={styles.editBtnText}>+</Text>
              </TouchableOpacity>
            </View>

            {/* 골프존 스타일 빠른 선택 버튼 */}
            <Text style={styles.quickScoreLabel}>파 대비 선택</Text>
            <View style={styles.quickScoreRow}>
              {editingHole !== null && (() => {
                const par = pars[editingHole];
                const doublePar = par * 2; // 더블파(양파)

                // 스코어 옵션 생성
                const options = [
                  { score: 1, label: '홀인원', color: '#FFD700' }, // 골드
                  { score: par - 3, label: '알바', color: '#9C27B0' }, // 알바트로스
                  { score: par - 2, label: '이글', color: COLORS.scoreEagle },
                  { score: par - 1, label: '버디', color: COLORS.scoreBirdie },
                  { score: par, label: '파', color: COLORS.scorePar },
                  { score: par + 1, label: '보기', color: COLORS.scoreBogey },
                  { score: par + 2, label: '더블', color: COLORS.scoreDouble },
                  { score: par + 3, label: '+3', color: COLORS.scoreTriple },
                  { score: doublePar, label: '양파', color: '#4A148C' }, // 더블파
                ].filter(item => item.score > 0 && item.score <= doublePar);

                // 중복 제거 (홀인원과 버디/이글이 같은 경우 등)
                const uniqueOptions = options.reduce((acc, item) => {
                  if (!acc.find(x => x.score === item.score)) {
                    acc.push(item);
                  }
                  return acc;
                }, []);

                return uniqueOptions.map(item => {
                  const isSelected = parseInt(scores[editingHole]) === item.score;
                  return (
                    <TouchableOpacity
                      key={`${item.label}-${item.score}`}
                      style={[
                        styles.quickScoreBtn,
                        { backgroundColor: isSelected ? item.color : COLORS.backgroundGray }
                      ]}
                      onPress={() => {
                        updateScore(editingHole, item.score.toString());
                        setTimeout(() => setEditingHole(null), 150);
                      }}
                    >
                      <Text style={[
                        styles.quickScoreText,
                        isSelected && { color: '#fff' }
                      ]}>{item.label}</Text>
                      <Text style={[
                        styles.quickScoreNum,
                        isSelected && { color: '#fff' }
                      ]}>{item.score}타</Text>
                    </TouchableOpacity>
                  );
                });
              })()}
            </View>

            <TouchableOpacity
              style={styles.editDone}
              onPress={() => setEditingHole(null)}
            >
              <Text style={styles.editDoneText}>확인</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
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
    minHeight: '70%',
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
  ocrNotice: {
    backgroundColor: COLORS.info + '20',
    padding: 12,
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 10,
  },
  ocrNoticeText: {
    fontSize: 14,
    color: COLORS.info,
    textAlign: 'center',
  },
  summaryBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.backgroundGray,
    padding: 16,
    marginTop: 8,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryTotal: {
    flex: 1.3,
  },
  summaryDivider: {
    width: 1,
    backgroundColor: COLORS.divider,
  },
  summaryLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  summaryValue: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: 4,
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
  },
  scrollContent: {
    flexGrow: 1,
    flexShrink: 1,
    paddingHorizontal: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: 16,
    marginBottom: 8,
    marginLeft: 4,
  },
  scoreTable: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.divider,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.divider,
  },
  labelCell: {
    flex: 0.9,
    backgroundColor: COLORS.backgroundGray,
  },
  totalCell: {
    flex: 1.1,
    backgroundColor: COLORS.backgroundGray,
  },
  scoreTotalCell: {
    backgroundColor: COLORS.primary + '20',
  },
  labelText: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  holeNumber: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  parLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  parValue: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  parTotal: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  scoreLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.primary,
  },
  scoreCell: {
    backgroundColor: COLORS.cardBg,
  },
  scoreValue: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  scoreTotal: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
  },
  totalLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 16,
  },
  legendItem: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#fff',
  },
  quickActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
    paddingHorizontal: 4,
  },
  quickButton: {
    flex: 1,
    backgroundColor: COLORS.backgroundGray,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  resetButton: {
    backgroundColor: COLORS.error + '20',
  },
  quickButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  bottomSpace: {
    height: 20,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    margin: 16,
    padding: 18,
    borderRadius: 14,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.textWhite,
  },
  // 개별 홀 편집 모달
  editOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editBox: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    padding: 24,
    width: '80%',
    alignItems: 'center',
  },
  editTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  editPar: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  editInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    gap: 12,
  },
  editBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editBtnText: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.textWhite,
  },
  editInput: {
    width: 80,
    height: 60,
    backgroundColor: COLORS.backgroundGray,
    borderRadius: 12,
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    color: COLORS.textPrimary,
  },
  quickScoreLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 16,
    marginBottom: 4,
  },
  quickScoreRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  quickScoreBtn: {
    width: 52,
    height: 52,
    borderRadius: 10,
    backgroundColor: COLORS.backgroundGray,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
  },
  quickScoreBtnActive: {
    backgroundColor: COLORS.primary,
  },
  quickScoreText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  quickScoreNum: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: 2,
  },
  quickScoreTextActive: {
    color: COLORS.textWhite,
  },
  editDone: {
    marginTop: 20,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 12,
  },
  editDoneText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textWhite,
  },
});
