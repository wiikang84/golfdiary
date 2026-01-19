import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Platform,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS, SHADOWS } from '../theme/premium';
import { savePractices, loadPractices } from '../utils/storage';

const CLUBS = ['드라이버', '우드', '유틸', '아이언', '웨지', '퍼터'];
const FOCUS_ITEMS = ['스윙', '임팩트', '어드레스', '그립', '백스윙', '팔로우'];

export default function PracticeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingPractice, setEditingPractice] = useState(null); // 수정 중인 연습기록
  const [practiceData, setPracticeData] = useState({
    location: '',
    clubs: [],
    practiceTime: '',
    focus: [],
    memo: '',
    selectedDate: new Date(),
  });
  const [practices, setPractices] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // 앱 시작시 저장된 데이터 불러오기
  useEffect(() => {
    const loadData = async () => {
      const savedPractices = await loadPractices();
      setPractices(savedPractices);
    };
    loadData();
  }, []);

  const toggleClub = (club) => {
    setPracticeData(prev => ({
      ...prev,
      clubs: prev.clubs.includes(club)
        ? prev.clubs.filter(c => c !== club)
        : [...prev.clubs, club]
    }));
  };

  const toggleFocus = (item) => {
    setPracticeData(prev => ({
      ...prev,
      focus: prev.focus.includes(item)
        ? prev.focus.filter(f => f !== item)
        : [...prev.focus, item]
    }));
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setPracticeData({ ...practiceData, selectedDate });
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short',
    });
  };

  const savePractice = async () => {
    if (editingPractice) {
      // 수정 모드
      const updatedPractices = practices.map(p =>
        p.id === editingPractice.id
          ? { ...practiceData, id: editingPractice.id, date: practiceData.selectedDate.toLocaleDateString('ko-KR') }
          : p
      );
      setPractices(updatedPractices);
      await savePractices(updatedPractices);
      setEditingPractice(null);
    } else {
      // 새 기록 추가
      const newPractice = {
        ...practiceData,
        id: Date.now(),
        date: practiceData.selectedDate.toLocaleDateString('ko-KR'),
      };
      const updatedPractices = [newPractice, ...practices];
      setPractices(updatedPractices);
      await savePractices(updatedPractices);
    }
    setPracticeData({
      location: '',
      clubs: [],
      practiceTime: '',
      focus: [],
      memo: '',
      selectedDate: new Date(),
    });
    setModalVisible(false);
  };

  // 연습기록 수정
  const handleEditPractice = (practice) => {
    setEditingPractice(practice);
    setPracticeData({
      location: practice.location || '',
      clubs: practice.clubs || [],
      practiceTime: practice.practiceTime || '',
      focus: practice.focus || [],
      memo: practice.memo || '',
      selectedDate: practice.selectedDate ? new Date(practice.selectedDate) : new Date(),
    });
    setModalVisible(true);
  };

  // 연습기록 삭제
  const handleDeletePractice = (practice) => {
    Alert.alert(
      '삭제 확인',
      '이 연습 기록을 삭제하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '삭제',
          style: 'destructive',
          onPress: async () => {
            const updatedPractices = practices.filter(p => p.id !== practice.id);
            setPractices(updatedPractices);
            await savePractices(updatedPractices);
          },
        },
      ]
    );
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setModalVisible(false);
    setEditingPractice(null);
    setPracticeData({
      location: '',
      clubs: [],
      practiceTime: '',
      focus: [],
      memo: '',
      selectedDate: new Date(),
    });
  };

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>연습 기록</Text>
        <Text style={styles.headerSub}>오늘의 연습을 기록하세요</Text>
      </View>

      {/* 기록 추가 버튼 */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonIcon}>+</Text>
        <Text style={styles.addButtonText}>새 연습 기록</Text>
      </TouchableOpacity>

      {/* 연습 기록 목록 */}
      <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
        {practices.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🏌️</Text>
            <Text style={styles.emptyText}>아직 기록이 없어요</Text>
            <Text style={styles.emptySubText}>첫 연습 기록을 추가해보세요!</Text>
          </View>
        ) : (
          practices.map(practice => (
            <View key={practice.id} style={styles.practiceCard}>
              <View style={styles.cardHeader}>
                <View style={styles.cardHeaderLeft}>
                  <Text style={styles.cardDate}>{practice.date}</Text>
                  <Text style={styles.cardLocation}>{practice.location || '연습장'}</Text>
                </View>
                <View style={styles.timeBadge}>
                  <Text style={styles.timeCount}>{practice.practiceTime || 0}</Text>
                  <Text style={styles.timeLabel}>분</Text>
                </View>
              </View>
              <View style={styles.cardBody}>
                {practice.clubs.length > 0 && (
                  <View style={styles.clubsRow}>
                    <Text style={styles.clubsLabel}>클럽</Text>
                    <Text style={styles.clubsText}>{practice.clubs.join(', ')}</Text>
                  </View>
                )}
                {practice.focus.length > 0 && (
                  <View style={styles.focusTags}>
                    {practice.focus.map(f => (
                      <View key={f} style={styles.focusTag}>
                        <Text style={styles.focusTagText}>{f}</Text>
                      </View>
                    ))}
                  </View>
                )}
                {practice.memo && (
                  <Text style={styles.memoText}>{practice.memo}</Text>
                )}
                {/* 수정/삭제 버튼 */}
                <View style={styles.cardActions}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleEditPractice(practice)}
                  >
                    <Text style={styles.actionButtonText}>수정</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={() => handleDeletePractice(practice)}
                  >
                    <Text style={[styles.actionButtonText, styles.deleteButtonText]}>삭제</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        )}
        <View style={styles.bottomSpace} />
      </ScrollView>

      {/* 기록 추가 모달 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{editingPractice ? '연습 기록 수정' : '새 연습 기록'}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleCloseModal}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
              {/* 날짜 선택 */}
              <Text style={styles.inputLabel}>연습 날짜</Text>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.dateIcon}>📅</Text>
                <Text style={styles.dateText}>{formatDate(practiceData.selectedDate)}</Text>
                <Text style={styles.dateArrow}>›</Text>
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={practiceData.selectedDate}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={handleDateChange}
                  maximumDate={new Date()}
                  locale="ko-KR"
                />
              )}

              {/* 연습장 이름 */}
              <Text style={styles.inputLabel}>연습장</Text>
              <TextInput
                style={styles.textInput}
                placeholder="연습장 이름을 입력하세요"
                placeholderTextColor={COLORS.textMuted}
                value={practiceData.location}
                onChangeText={(text) => setPracticeData({ ...practiceData, location: text })}
              />

              {/* 클럽 선택 */}
              <Text style={styles.inputLabel}>사용 클럽</Text>
              <View style={styles.chipContainer}>
                {CLUBS.map(club => (
                  <TouchableOpacity
                    key={club}
                    style={[
                      styles.chip,
                      practiceData.clubs.includes(club) && styles.chipSelected
                    ]}
                    onPress={() => toggleClub(club)}
                  >
                    <Text style={[
                      styles.chipText,
                      practiceData.clubs.includes(club) && styles.chipTextSelected
                    ]}>
                      {club}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* 연습 시간 */}
              <Text style={styles.inputLabel}>연습 시간</Text>
              <TextInput
                style={styles.textInput}
                placeholder="연습 시간 (분)"
                placeholderTextColor={COLORS.textMuted}
                keyboardType="numeric"
                value={practiceData.practiceTime}
                onChangeText={(text) => setPracticeData({ ...practiceData, practiceTime: text })}
              />

              {/* 연습 포커스 */}
              <Text style={styles.inputLabel}>연습 포인트</Text>
              <View style={styles.chipContainer}>
                {FOCUS_ITEMS.map(item => (
                  <TouchableOpacity
                    key={item}
                    style={[
                      styles.chip,
                      practiceData.focus.includes(item) && styles.chipSelectedBlue
                    ]}
                    onPress={() => toggleFocus(item)}
                  >
                    <Text style={[
                      styles.chipText,
                      practiceData.focus.includes(item) && styles.chipTextSelected
                    ]}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* 메모 */}
              <Text style={styles.inputLabel}>메모</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder="오늘 연습에서 느낀 점을 기록하세요"
                placeholderTextColor={COLORS.textMuted}
                multiline
                numberOfLines={4}
                value={practiceData.memo}
                onChangeText={(text) => setPracticeData({ ...practiceData, memo: text })}
              />
            </ScrollView>

            <TouchableOpacity style={styles.saveButton} onPress={savePractice}>
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
    backgroundColor: COLORS.primary,
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
  addButton: {
    backgroundColor: COLORS.cardBg,
    marginHorizontal: 16,
    marginTop: -16,
    borderRadius: 14,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.medium,
  },
  addButtonIcon: {
    fontSize: 24,
    color: COLORS.primary,
    fontWeight: '600',
    marginRight: 8,
  },
  addButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.primary,
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
  practiceCard: {
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
    backgroundColor: COLORS.primary,
  },
  cardHeaderLeft: {
    flex: 1,
  },
  cardDate: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
  },
  cardLocation: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textWhite,
    marginTop: 2,
  },
  timeBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  timeCount: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textWhite,
  },
  timeLabel: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    marginLeft: 2,
  },
  cardBody: {
    padding: 16,
  },
  clubsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  clubsLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginRight: 10,
  },
  clubsText: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.textPrimary,
    flex: 1,
  },
  focusTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  focusTag: {
    backgroundColor: COLORS.info + '20',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  focusTagText: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.info,
  },
  memoText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: COLORS.backgroundGray,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.primary,
  },
  deleteButton: {
    backgroundColor: '#FFEBEE',
  },
  deleteButtonText: {
    color: '#D32F2F',
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
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.backgroundGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: COLORS.textSecondary,
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
    backgroundColor: COLORS.primary,
    margin: 20,
    borderRadius: 14,
    padding: 18,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.textWhite,
  },
  dateButton: {
    backgroundColor: COLORS.backgroundGray,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  dateText: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  dateArrow: {
    fontSize: 20,
    color: COLORS.textMuted,
  },
});
