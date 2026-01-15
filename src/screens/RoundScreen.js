import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
} from 'react-native';
import { COLORS, SHADOWS } from '../theme/premium';
import { saveScreenRounds, loadScreenRounds, saveFieldRounds, loadFieldRounds } from '../utils/storage';

const SCREEN_VENUES = ['골프존', 'SG골프', '카카오VX', '기타'];
const WEATHER_OPTIONS = ['맑음', '흐림', '비', '바람'];
const DIFFICULTY = ['쉬움', '보통', '어려움'];

export default function RoundScreen() {
  const [activeTab, setActiveTab] = useState('screen');
  const [modalVisible, setModalVisible] = useState(false);
  const [screenRounds, setScreenRounds] = useState([]);
  const [fieldRounds, setFieldRounds] = useState([]);

  // 앱 시작시 저장된 데이터 불러오기
  useEffect(() => {
    const loadData = async () => {
      const savedScreenRounds = await loadScreenRounds();
      const savedFieldRounds = await loadFieldRounds();
      setScreenRounds(savedScreenRounds);
      setFieldRounds(savedFieldRounds);
    };
    loadData();
  }, []);

  const [roundData, setRoundData] = useState({
    courseName: '',
    score: '',
    venue: '',
    difficulty: '',
    mulligan: '',
    weather: '',
    companions: '',
    cost: '',
    memo: '',
  });

  const saveRound = async () => {
    const newRound = {
      ...roundData,
      id: Date.now(),
      date: new Date().toLocaleDateString('ko-KR'),
      type: activeTab,
    };

    if (activeTab === 'screen') {
      const updatedRounds = [newRound, ...screenRounds];
      setScreenRounds(updatedRounds);
      await saveScreenRounds(updatedRounds); // 로컬에 저장
    } else {
      const updatedRounds = [newRound, ...fieldRounds];
      setFieldRounds(updatedRounds);
      await saveFieldRounds(updatedRounds); // 로컬에 저장
    }

    setRoundData({
      courseName: '',
      score: '',
      venue: '',
      difficulty: '',
      mulligan: '',
      weather: '',
      companions: '',
      cost: '',
      memo: '',
    });
    setModalVisible(false);
  };

  const rounds = activeTab === 'screen' ? screenRounds : fieldRounds;

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>라운드 기록</Text>
        <Text style={styles.headerSub}>스크린/필드 라운드를 기록하세요</Text>
      </View>

      {/* 탭 버튼 */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'screen' && styles.activeTab]}
          onPress={() => setActiveTab('screen')}
        >
          <Text style={styles.tabIcon}>🖥️</Text>
          <Text style={[styles.tabText, activeTab === 'screen' && styles.activeTabText]}>
            스크린
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'field' && styles.activeTabField]}
          onPress={() => setActiveTab('field')}
        >
          <Text style={styles.tabIcon}>🌿</Text>
          <Text style={[styles.tabText, activeTab === 'field' && styles.activeTabTextGreen]}>
            필드
          </Text>
        </TouchableOpacity>
      </View>

      {/* 기록 추가 버튼 */}
      <TouchableOpacity
        style={[styles.addButton, activeTab === 'field' && styles.addButtonField]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonIcon}>+</Text>
        <Text style={styles.addButtonText}>
          새 {activeTab === 'screen' ? '스크린' : '필드'} 라운드
        </Text>
      </TouchableOpacity>

      {/* 라운드 목록 */}
      <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
        {rounds.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>
              {activeTab === 'screen' ? '🖥️' : '🌿'}
            </Text>
            <Text style={styles.emptyText}>아직 기록이 없어요</Text>
            <Text style={styles.emptySubText}>
              첫 {activeTab === 'screen' ? '스크린' : '필드'} 라운드를 기록해보세요!
            </Text>
          </View>
        ) : (
          rounds.map(round => (
            <View key={round.id} style={styles.roundCard}>
              <View style={[
                styles.cardHeader,
                activeTab === 'field' && styles.cardHeaderField
              ]}>
                <View style={styles.cardHeaderLeft}>
                  <Text style={styles.cardDate}>{round.date}</Text>
                  <Text style={styles.cardCourse}>{round.courseName || '코스'}</Text>
                </View>
                <View style={styles.scoreBox}>
                  <Text style={styles.scoreNumber}>{round.score || '-'}</Text>
                  <Text style={styles.scoreLabel}>타</Text>
                </View>
              </View>
              <View style={styles.cardBody}>
                {activeTab === 'screen' ? (
                  <>
                    {round.venue && (
                      <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>골프장</Text>
                        <Text style={styles.infoValue}>{round.venue}</Text>
                      </View>
                    )}
                    {round.difficulty && (
                      <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>난이도</Text>
                        <Text style={styles.infoValue}>{round.difficulty}</Text>
                      </View>
                    )}
                    {round.mulligan && (
                      <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>멀리건</Text>
                        <Text style={styles.infoValue}>{round.mulligan}회</Text>
                      </View>
                    )}
                  </>
                ) : (
                  <>
                    {round.weather && (
                      <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>날씨</Text>
                        <Text style={styles.infoValue}>{round.weather}</Text>
                      </View>
                    )}
                    {round.companions && (
                      <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>동반자</Text>
                        <Text style={styles.infoValue}>{round.companions}</Text>
                      </View>
                    )}
                    {round.cost && (
                      <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>비용</Text>
                        <Text style={[styles.infoValue, { color: COLORS.gold }]}>
                          {Number(round.cost).toLocaleString()}원
                        </Text>
                      </View>
                    )}
                  </>
                )}
                {round.memo && (
                  <Text style={styles.memoText}>{round.memo}</Text>
                )}
              </View>
            </View>
          ))
        )}
        <View style={styles.bottomSpace} />
      </ScrollView>

      {/* 모달 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={[
              styles.modalHeader,
              activeTab === 'field' && styles.modalHeaderField
            ]}>
              <Text style={styles.modalTitle}>
                {activeTab === 'screen' ? '스크린 라운드' : '필드 라운드'}
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
              <Text style={styles.inputLabel}>코스명</Text>
              <TextInput
                style={styles.textInput}
                placeholder="코스 이름을 입력하세요"
                placeholderTextColor={COLORS.textMuted}
                value={roundData.courseName}
                onChangeText={(text) => setRoundData({ ...roundData, courseName: text })}
              />

              <Text style={styles.inputLabel}>스코어</Text>
              <TextInput
                style={styles.textInput}
                placeholder="총 타수"
                placeholderTextColor={COLORS.textMuted}
                keyboardType="numeric"
                value={roundData.score}
                onChangeText={(text) => setRoundData({ ...roundData, score: text })}
              />

              {activeTab === 'screen' ? (
                <>
                  <Text style={styles.inputLabel}>골프장</Text>
                  <View style={styles.chipContainer}>
                    {SCREEN_VENUES.map(venue => (
                      <TouchableOpacity
                        key={venue}
                        style={[
                          styles.chip,
                          roundData.venue === venue && styles.chipSelectedBlue
                        ]}
                        onPress={() => setRoundData({ ...roundData, venue })}
                      >
                        <Text style={[
                          styles.chipText,
                          roundData.venue === venue && styles.chipTextSelected
                        ]}>
                          {venue}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <Text style={styles.inputLabel}>난이도</Text>
                  <View style={styles.chipContainer}>
                    {DIFFICULTY.map(diff => (
                      <TouchableOpacity
                        key={diff}
                        style={[
                          styles.chip,
                          roundData.difficulty === diff && styles.chipSelectedBlue
                        ]}
                        onPress={() => setRoundData({ ...roundData, difficulty: diff })}
                      >
                        <Text style={[
                          styles.chipText,
                          roundData.difficulty === diff && styles.chipTextSelected
                        ]}>
                          {diff}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <Text style={styles.inputLabel}>멀리건</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="멀리건 횟수"
                    placeholderTextColor={COLORS.textMuted}
                    keyboardType="numeric"
                    value={roundData.mulligan}
                    onChangeText={(text) => setRoundData({ ...roundData, mulligan: text })}
                  />
                </>
              ) : (
                <>
                  <Text style={styles.inputLabel}>날씨</Text>
                  <View style={styles.chipContainer}>
                    {WEATHER_OPTIONS.map(weather => (
                      <TouchableOpacity
                        key={weather}
                        style={[
                          styles.chip,
                          roundData.weather === weather && styles.chipSelected
                        ]}
                        onPress={() => setRoundData({ ...roundData, weather })}
                      >
                        <Text style={[
                          styles.chipText,
                          roundData.weather === weather && styles.chipTextSelected
                        ]}>
                          {weather}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <Text style={styles.inputLabel}>동반자</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="함께 플레이한 사람"
                    placeholderTextColor={COLORS.textMuted}
                    value={roundData.companions}
                    onChangeText={(text) => setRoundData({ ...roundData, companions: text })}
                  />

                  <Text style={styles.inputLabel}>비용</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="총 비용 (원)"
                    placeholderTextColor={COLORS.textMuted}
                    keyboardType="numeric"
                    value={roundData.cost}
                    onChangeText={(text) => setRoundData({ ...roundData, cost: text })}
                  />
                </>
              )}

              <Text style={styles.inputLabel}>메모</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder="라운드 후기를 남겨주세요"
                placeholderTextColor={COLORS.textMuted}
                multiline
                numberOfLines={4}
                value={roundData.memo}
                onChangeText={(text) => setRoundData({ ...roundData, memo: text })}
              />
            </ScrollView>

            <TouchableOpacity
              style={[styles.saveButton, activeTab === 'field' && styles.saveButtonField]}
              onPress={saveRound}
            >
              <Text style={styles.saveButtonText}>저장하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundGray,
  },
  header: {
    backgroundColor: COLORS.info,
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
    gap: 10,
  },
  tab: {
    flex: 1,
    backgroundColor: COLORS.cardBg,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  activeTab: {
    backgroundColor: COLORS.info,
  },
  activeTabField: {
    backgroundColor: COLORS.primary,
  },
  tabIcon: {
    fontSize: 24,
    marginBottom: 6,
  },
  tabText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  activeTabText: {
    color: COLORS.textWhite,
  },
  activeTabTextGreen: {
    color: COLORS.textWhite,
  },
  addButton: {
    backgroundColor: COLORS.info,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.small,
  },
  addButtonField: {
    backgroundColor: COLORS.primary,
  },
  addButtonIcon: {
    fontSize: 22,
    color: COLORS.textWhite,
    fontWeight: '600',
    marginRight: 8,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textWhite,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 50,
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    ...SHADOWS.small,
  },
  emptyEmoji: {
    fontSize: 56,
  },
  emptyText: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginTop: 16,
  },
  emptySubText: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginTop: 6,
  },
  roundCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    ...SHADOWS.small,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.info,
  },
  cardHeaderField: {
    backgroundColor: COLORS.primary,
  },
  cardHeaderLeft: {
    flex: 1,
  },
  cardDate: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
  },
  cardCourse: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textWhite,
    marginTop: 2,
  },
  scoreBox: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  scoreNumber: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.textWhite,
  },
  scoreLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginLeft: 2,
  },
  cardBody: {
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  infoLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
  memoText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 22,
    marginTop: 12,
  },
  bottomSpace: {
    height: 30,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.cardBg,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.info,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  modalHeaderField: {
    backgroundColor: COLORS.primary,
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
  modalBody: {
    padding: 20,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 10,
    marginTop: 16,
  },
  textInput: {
    backgroundColor: COLORS.backgroundGray,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    backgroundColor: COLORS.backgroundGray,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  chipSelected: {
    backgroundColor: COLORS.primary,
  },
  chipSelectedBlue: {
    backgroundColor: COLORS.info,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  chipTextSelected: {
    color: COLORS.textWhite,
  },
  saveButton: {
    backgroundColor: COLORS.info,
    margin: 20,
    borderRadius: 14,
    padding: 18,
    alignItems: 'center',
  },
  saveButtonField: {
    backgroundColor: COLORS.primary,
  },
  saveButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.textWhite,
  },
});
