import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const isWeb = Platform.OS === 'web';
import { COLORS, SHADOWS } from '../theme/premium';
import { saveScreenRounds, loadScreenRounds, saveFieldRounds, loadFieldRounds } from '../utils/storage';
import ScoreInput from '../components/ScoreInput';
import CourseSelector from '../components/CourseSelector';
import GolfzonCourseSelector from '../components/GolfzonCourseSelector';

const SCREEN_VENUES = ['골프존', 'SG골프', '카카오VX', '기타'];
const WEATHER_OPTIONS = ['맑음', '흐림', '비', '바람'];
const DIFFICULTY = ['쉬움', '보통', '어려움'];

export default function RoundScreen() {
  const [activeTab, setActiveTab] = useState('screen');
  const [modalVisible, setModalVisible] = useState(false);
  const [screenRounds, setScreenRounds] = useState([]);
  const [fieldRounds, setFieldRounds] = useState([]);
  const [scoreInputVisible, setScoreInputVisible] = useState(false);
  const [editingRound, setEditingRound] = useState(null); // 수정 중인 라운드
  const [isEditMode, setIsEditMode] = useState(false); // 수정 모드 여부
  const [courseSelectorVisible, setCourseSelectorVisible] = useState(false); // 코스 선택 모달
  const [selectedCourse, setSelectedCourse] = useState(null); // 선택된 코스
  const [selectedDate, setSelectedDate] = useState(new Date()); // 선택된 날짜
  const [showDatePicker, setShowDatePicker] = useState(false); // 날짜 선택기 표시 여부
  const scrollViewRef = useRef(null);

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
    holeScores: null,
    holePars: null,
    courseNames: null, // { front: '이지', back: '스카이' }
  });

  // 18홀 스코어 저장
  const handleScoreSave = (scoreData) => {
    setRoundData(prev => ({
      ...prev,
      score: scoreData.totalScore.toString(),
      holeScores: scoreData.scores,
      holePars: scoreData.pars,
    }));
  };

  // 라운드 수정 모드로 열기
  const openEditMode = (round) => {
    setEditingRound(round);
    setIsEditMode(true);
    setRoundData({
      courseName: round.courseName || '',
      score: round.score || '',
      venue: round.venue || '',
      difficulty: round.difficulty || '',
      mulligan: round.mulligan || '',
      weather: round.weather || '',
      companions: round.companions || '',
      cost: round.cost || '',
      memo: round.memo || '',
      holeScores: round.holeScores || null,
      holePars: round.holePars || null,
    });
    // 기존 날짜 파싱
    if (round.date) {
      const dateParts = round.date.replace(/\./g, '').trim().split(' ').filter(p => p);
      if (dateParts.length >= 3) {
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]) - 1;
        const day = parseInt(dateParts[2]);
        setSelectedDate(new Date(year, month, day));
      }
    }
    setModalVisible(true);
  };

  // 새 라운드 모드로 열기
  const openNewMode = () => {
    setEditingRound(null);
    setIsEditMode(false);
    setSelectedCourse(null);
    setSelectedDate(new Date()); // 오늘 날짜로 초기화
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
      holeScores: null,
      holePars: null,
    });
    setModalVisible(true);
  };

  // 코스 선택 처리
  const handleCourseSelect = (course) => {
    if (course) {
      setSelectedCourse(course);

      // 골프존 코스 선택 시 코스명 저장 (frontName, backName)
      const courseNames = course.frontName && course.backName
        ? { front: course.frontName, back: course.backName }
        : null;

      setRoundData(prev => ({
        ...prev,
        courseName: course.name,
        holePars: course.holes,
        courseNames: courseNames,
      }));

      // 기본 PAR 사용 시 안내 메시지 (실제 코스 데이터가 없는 경우)
      const defaultPars = [4, 4, 3, 5, 4, 4, 3, 4, 5, 4, 4, 3, 5, 4, 4, 3, 4, 5];
      const isDefaultPar = course.holes &&
        JSON.stringify(course.holes) === JSON.stringify(defaultPars);

      if (isDefaultPar && !isWeb) {
        setTimeout(() => {
          Alert.alert(
            '홀 PAR 안내',
            '이 골프장은 기본 PAR 정보를 사용합니다.\n\n스코어 입력 시 각 홀의 PAR을 직접 수정할 수 있습니다.\n\n(홀 번호 위의 PAR 숫자를 터치하세요)',
            [{ text: '확인' }]
          );
        }, 300);
      }
    } else {
      // 직접 입력 모드
      setSelectedCourse(null);
    }
  };

  // 모달 닫기
  const closeModal = () => {
    setModalVisible(false);
    setIsEditMode(false);
    setEditingRound(null);
    setSelectedCourse(null);
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
      holeScores: null,
      holePars: null,
      courseNames: null,
    });
  };

  // 날짜를 포맷팅하는 함수
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}. ${month}. ${day}.`;
  };

  const saveRound = async () => {
    const formattedDate = formatDate(selectedDate);

    if (isEditMode && editingRound) {
      // 수정 모드: 기존 라운드 업데이트
      const updatedRound = {
        ...editingRound,
        ...roundData,
        date: formattedDate,
      };

      if (editingRound.type === 'screen') {
        const updatedRounds = screenRounds.map(r =>
          r.id === editingRound.id ? updatedRound : r
        );
        setScreenRounds(updatedRounds);
        await saveScreenRounds(updatedRounds);
      } else {
        const updatedRounds = fieldRounds.map(r =>
          r.id === editingRound.id ? updatedRound : r
        );
        setFieldRounds(updatedRounds);
        await saveFieldRounds(updatedRounds);
      }
    } else {
      // 새 라운드 저장
      const newRound = {
        ...roundData,
        id: Date.now(),
        date: formattedDate,
        type: activeTab,
      };

      if (activeTab === 'screen') {
        const updatedRounds = [newRound, ...screenRounds];
        setScreenRounds(updatedRounds);
        await saveScreenRounds(updatedRounds);
      } else {
        const updatedRounds = [newRound, ...fieldRounds];
        setFieldRounds(updatedRounds);
        await saveFieldRounds(updatedRounds);
      }
    }

    closeModal();
  };

  // 라운드 삭제
  const deleteRound = async () => {
    if (!editingRound) return;

    const doDelete = async () => {
      if (editingRound.type === 'screen') {
        const updatedRounds = screenRounds.filter(r => r.id !== editingRound.id);
        setScreenRounds(updatedRounds);
        await saveScreenRounds(updatedRounds);
      } else {
        const updatedRounds = fieldRounds.filter(r => r.id !== editingRound.id);
        setFieldRounds(updatedRounds);
        await saveFieldRounds(updatedRounds);
      }
      closeModal();
    };

    if (isWeb) {
      if (window.confirm('이 라운드 기록을 삭제하시겠습니까?\n삭제된 기록은 복구할 수 없습니다.')) {
        await doDelete();
      }
    } else {
      Alert.alert(
        '기록 삭제',
        '이 라운드 기록을 삭제하시겠습니까?\n삭제된 기록은 복구할 수 없습니다.',
        [
          { text: '취소', style: 'cancel' },
          {
            text: '삭제',
            style: 'destructive',
            onPress: doDelete,
          },
        ]
      );
    }
  };

  const rounds = activeTab === 'screen' ? screenRounds : fieldRounds;

  // 홀별 스코어 요약 표시
  const renderHoleScoreSummary = (round) => {
    if (!round.holeScores) return null;

    const front9 = round.holeScores.slice(0, 9);
    const back9 = round.holeScores.slice(9, 18);
    const frontTotal = front9.reduce((sum, s) => sum + (s || 0), 0);
    const backTotal = back9.reduce((sum, s) => sum + (s || 0), 0);

    return (
      <View style={styles.holeScoreSummary}>
        <View style={styles.holeScoreRow}>
          <Text style={styles.holeScoreLabel}>전반:</Text>
          <Text style={styles.holeScoreValue}>{frontTotal > 0 ? frontTotal : '-'}</Text>
        </View>
        <View style={styles.holeScoreDivider} />
        <View style={styles.holeScoreRow}>
          <Text style={styles.holeScoreLabel}>후반:</Text>
          <Text style={styles.holeScoreValue}>{backTotal > 0 ? backTotal : '-'}</Text>
        </View>
      </View>
    );
  };

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
        onPress={openNewMode}
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
            <TouchableOpacity
              key={round.id}
              style={styles.roundCard}
              onPress={() => openEditMode(round)}
              activeOpacity={0.7}
            >
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
                {/* 홀별 스코어 요약 */}
                {renderHoleScoreSummary(round)}

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
                  </>
                )}
                {round.memo && (
                  <Text style={styles.memoText}>{round.memo}</Text>
                )}
              </View>
            </TouchableOpacity>
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
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.modalContent}>
            <View style={[
              styles.modalHeader,
              activeTab === 'field' && styles.modalHeaderField
            ]}>
              <View style={styles.modalHeaderLeft}>
                <Text style={styles.modalTitle}>
                  {isEditMode ? '기록 수정' : (activeTab === 'screen' ? '스크린 라운드' : '필드 라운드')}
                </Text>
                {isEditMode && (
                  <Text style={styles.modalSubtitle}>
                    {editingRound?.date} · {editingRound?.courseName || '코스'}
                  </Text>
                )}
              </View>
              <View style={styles.modalHeaderRight}>
                {isEditMode && (
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={deleteRound}
                  >
                    <Text style={styles.deleteButtonText}>삭제</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={closeModal}
                >
                  <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView
              ref={scrollViewRef}
              style={styles.modalBody}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {/* 날짜 선택 */}
              <Text style={styles.inputLabel}>날짜</Text>
              <TouchableOpacity
                style={styles.dateSelector}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.dateSelectorIcon}>📅</Text>
                <Text style={styles.dateSelectorText}>{formatDate(selectedDate)}</Text>
                <Text style={styles.dateSelectorArrow}>›</Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={(event, date) => {
                    setShowDatePicker(Platform.OS === 'ios');
                    if (date) {
                      setSelectedDate(date);
                    }
                  }}
                  maximumDate={new Date()}
                  locale="ko-KR"
                />
              )}

              <Text style={styles.inputLabel}>코스명</Text>
              <View style={styles.courseInputRow}>
                <TextInput
                  style={[styles.textInput, styles.courseInput]}
                  placeholder="코스 이름"
                  placeholderTextColor={COLORS.textMuted}
                  value={roundData.courseName}
                  onChangeText={(text) => {
                    setSelectedCourse(null);
                    setRoundData({ ...roundData, courseName: text });
                  }}
                />
                <TouchableOpacity
                  style={styles.courseSearchButton}
                  onPress={() => setCourseSelectorVisible(true)}
                >
                  <Text style={styles.courseSearchIcon}>🔍</Text>
                  <Text style={styles.courseSearchText}>검색</Text>
                </TouchableOpacity>
              </View>
              {selectedCourse && (
                <View style={styles.selectedCourseInfo}>
                  <Text style={styles.selectedCourseText}>
                    ✓ {selectedCourse.type === 'screen' ? '스크린' : '필드'} · PAR {selectedCourse.totalPar} · 파 정보 자동 설정됨
                  </Text>
                </View>
              )}

              {/* 18홀 스코어 입력 */}
              <Text style={styles.inputLabel}>스코어</Text>
              <View style={styles.scoreSection}>
                <View style={styles.scoreDisplay}>
                  <Text style={styles.scoreTotalLabel}>총 스코어</Text>
                  <Text style={styles.scoreTotalValue}>
                    {roundData.score || '-'}
                    {roundData.score && <Text style={styles.scoreTotalUnit}>타</Text>}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.scoreButton}
                  onPress={() => setScoreInputVisible(true)}
                >
                  <Text style={styles.scoreButtonIcon}>🏌️</Text>
                  <Text style={styles.scoreButtonText}>18홀 스코어 입력</Text>
                </TouchableOpacity>
              </View>

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
                onFocus={() => {
                  setTimeout(() => {
                    scrollViewRef.current?.scrollToEnd({ animated: true });
                  }, 300);
                }}
              />
              {/* 키보드 여백 */}
              <View style={styles.keyboardSpace} />
            </ScrollView>

            <TouchableOpacity
              style={[styles.saveButton, activeTab === 'field' && styles.saveButtonField]}
              onPress={saveRound}
            >
              <Text style={styles.saveButtonText}>{isEditMode ? '수정하기' : '저장하기'}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* 18홀 스코어 입력 모달 */}
      <ScoreInput
        visible={scoreInputVisible}
        onClose={() => setScoreInputVisible(false)}
        onSave={handleScoreSave}
        initialScores={roundData.holeScores}
        initialPars={roundData.holePars || (selectedCourse ? selectedCourse.holes : null)}
        initialCourseNames={roundData.courseNames}
      />

      {/* 코스 선택 모달 - 골프존 데이터 사용 */}
      <GolfzonCourseSelector
        visible={courseSelectorVisible}
        onClose={() => setCourseSelectorVisible(false)}
        onSelect={handleCourseSelect}
      />

      {/* 기존 CourseSelector (주석 처리)
      <CourseSelector
        visible={courseSelectorVisible}
        onClose={() => setCourseSelectorVisible(false)}
        onSelect={handleCourseSelect}
        roundType={activeTab}
      />
      */}

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
  holeScoreSummary: {
    flexDirection: 'row',
    backgroundColor: COLORS.backgroundGray,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  holeScoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  holeScoreLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginRight: 8,
  },
  holeScoreValue: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
  },
  holeScoreDivider: {
    width: 1,
    height: 20,
    backgroundColor: COLORS.divider,
    marginHorizontal: 16,
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
  modalSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  modalHeaderLeft: {
    flex: 1,
  },
  modalHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  deleteButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  deleteButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6B6B',
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
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundGray,
    borderRadius: 12,
    padding: 16,
  },
  dateSelectorIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  dateSelectorText: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  dateSelectorArrow: {
    fontSize: 20,
    color: COLORS.textSecondary,
  },
  textInput: {
    backgroundColor: COLORS.backgroundGray,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  courseInputRow: {
    flexDirection: 'row',
    gap: 10,
  },
  courseInput: {
    flex: 1,
  },
  courseSearchButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
  },
  courseSearchIcon: {
    fontSize: 16,
  },
  courseSearchText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textWhite,
  },
  selectedCourseInfo: {
    backgroundColor: COLORS.primary + '15',
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
  },
  selectedCourseText: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '500',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  scoreSection: {
    backgroundColor: COLORS.backgroundGray,
    borderRadius: 12,
    padding: 16,
  },
  scoreDisplay: {
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreTotalLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  scoreTotalValue: {
    fontSize: 36,
    fontWeight: '700',
    color: COLORS.primary,
    marginTop: 4,
  },
  scoreTotalUnit: {
    fontSize: 18,
    fontWeight: '400',
    color: COLORS.textSecondary,
  },
  scoreButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  scoreButtonIcon: {
    fontSize: 18,
    marginRight: 6,
  },
  scoreButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textWhite,
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
  keyboardSpace: {
    height: 150,
  },
});
