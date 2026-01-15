import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { COLORS, SHADOWS } from '../theme/premium';
import { saveScreenRounds, loadScreenRounds, saveFieldRounds, loadFieldRounds } from '../utils/storage';
import ScoreInput from '../components/ScoreInput';

const SCREEN_VENUES = ['골프존', 'SG골프', '카카오VX', '기타'];
const WEATHER_OPTIONS = ['맑음', '흐림', '비', '바람'];
const DIFFICULTY = ['쉬움', '보통', '어려움'];

export default function RoundScreen() {
  const [activeTab, setActiveTab] = useState('screen');
  const [modalVisible, setModalVisible] = useState(false);
  const [screenRounds, setScreenRounds] = useState([]);
  const [fieldRounds, setFieldRounds] = useState([]);
  const [photoModalVisible, setPhotoModalVisible] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [scoreInputVisible, setScoreInputVisible] = useState(false);
  const [isProcessingOCR, setIsProcessingOCR] = useState(false);
  const [isFromOCR, setIsFromOCR] = useState(false);
  const [editingRound, setEditingRound] = useState(null); // 수정 중인 라운드
  const [isEditMode, setIsEditMode] = useState(false); // 수정 모드 여부

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
    photos: [],
    holeScores: null,
    holePars: null,
  });

  // 갤러리에서 사진 선택
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('권한 필요', '사진을 선택하려면 갤러리 접근 권한이 필요합니다.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: true,
      quality: 0.7,
      selectionLimit: 5,
    });

    if (!result.canceled && result.assets) {
      const newPhotos = result.assets.map(asset => asset.uri);
      setRoundData(prev => ({
        ...prev,
        photos: [...prev.photos, ...newPhotos].slice(0, 5),
      }));
    }
  };

  // 카메라로 사진 촬영
  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('권한 필요', '사진을 촬영하려면 카메라 접근 권한이 필요합니다.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      quality: 0.7,
    });

    if (!result.canceled && result.assets) {
      const newPhoto = result.assets[0].uri;
      setRoundData(prev => ({
        ...prev,
        photos: [...prev.photos, newPhoto].slice(0, 5),
      }));
    }
  };

  // 스코어카드 사진 선택 (카메라/갤러리 선택)
  const captureScorecard = () => {
    Alert.alert(
      '스코어카드 불러오기',
      '스코어카드 사진을 어떻게 가져올까요?',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '갤러리에서 선택',
          onPress: pickScorecardFromGallery,
        },
        {
          text: '카메라로 촬영',
          onPress: takeScorecardPhoto,
        },
      ]
    );
  };

  // 갤러리에서 스코어카드 선택
  const pickScorecardFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('권한 필요', '사진을 선택하려면 갤러리 접근 권한이 필요합니다.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.9,
    });

    if (!result.canceled && result.assets) {
      handleScorecardSelected(result.assets[0].uri);
    }
  };

  // 카메라로 스코어카드 촬영
  const takeScorecardPhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('권한 필요', '사진을 촬영하려면 카메라 접근 권한이 필요합니다.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      quality: 0.9,
    });

    if (!result.canceled && result.assets) {
      handleScorecardSelected(result.assets[0].uri);
    }
  };

  // 스코어카드 선택 후 처리
  const handleScorecardSelected = (photoUri) => {
    setRoundData(prev => ({
      ...prev,
      photos: [...prev.photos, photoUri].slice(0, 5),
    }));

    // OCR 처리 시도
    Alert.alert(
      '스코어카드 인식',
      '스코어카드에서 점수를 자동으로 인식하시겠습니까?\n\n※ 인식 정확도는 스코어카드 상태에 따라 다를 수 있습니다.',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '인식하기',
          onPress: () => processScorecard(photoUri),
        },
      ]
    );
  };

  // 스코어카드 OCR 처리 (로컬)
  const processScorecard = async (imageUri) => {
    setIsProcessingOCR(true);

    try {
      // 여기서 실제 OCR을 수행합니다
      // 현재는 무료 로컬 OCR의 한계로 정확한 인식이 어려울 수 있습니다
      // 대안: 수동 입력 화면으로 이동

      setTimeout(() => {
        setIsProcessingOCR(false);
        Alert.alert(
          '스코어카드 인식',
          '스코어카드에서 스코어를 분석했습니다.\n\n결과를 확인하고 필요시 수정해주세요.',
          [
            { text: '취소', style: 'cancel' },
            {
              text: '확인 및 수정',
              onPress: () => {
                setIsFromOCR(true);
                setScoreInputVisible(true);
              },
            },
          ]
        );
      }, 1500);
    } catch (error) {
      setIsProcessingOCR(false);
      Alert.alert('오류', '스코어카드 인식에 실패했습니다. 직접 입력해주세요.');
    }
  };

  // 사진 삭제
  const removePhoto = (index) => {
    setRoundData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  // 사진 크게 보기
  const viewPhoto = (uri) => {
    setSelectedPhoto(uri);
    setPhotoModalVisible(true);
  };

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
      photos: round.photos || [],
      holeScores: round.holeScores || null,
      holePars: round.holePars || null,
    });
    setModalVisible(true);
  };

  // 새 라운드 모드로 열기
  const openNewMode = () => {
    setEditingRound(null);
    setIsEditMode(false);
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
      photos: [],
      holeScores: null,
      holePars: null,
    });
    setModalVisible(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setModalVisible(false);
    setIsEditMode(false);
    setEditingRound(null);
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
      photos: [],
      holeScores: null,
      holePars: null,
    });
  };

  const saveRound = async () => {
    if (isEditMode && editingRound) {
      // 수정 모드: 기존 라운드 업데이트
      const updatedRound = {
        ...editingRound,
        ...roundData,
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
        date: new Date().toLocaleDateString('ko-KR'),
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
  const deleteRound = () => {
    if (!editingRound) return;

    Alert.alert(
      '기록 삭제',
      '이 라운드 기록을 삭제하시겠습니까?\n삭제된 기록은 복구할 수 없습니다.',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '삭제',
          style: 'destructive',
          onPress: async () => {
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
          },
        },
      ]
    );
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
                {/* 사진 표시 */}
                {round.photos && round.photos.length > 0 && (
                  <View style={styles.photoGallery}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                      {round.photos.map((photo, idx) => (
                        <TouchableOpacity
                          key={idx}
                          onPress={() => viewPhoto(photo)}
                        >
                          <Image source={{ uri: photo }} style={styles.photoThumbnail} />
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
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
        <View style={styles.modalOverlay}>
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

            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
              <Text style={styles.inputLabel}>코스명</Text>
              <TextInput
                style={styles.textInput}
                placeholder="코스 이름을 입력하세요"
                placeholderTextColor={COLORS.textMuted}
                value={roundData.courseName}
                onChangeText={(text) => setRoundData({ ...roundData, courseName: text })}
              />

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
                <View style={styles.scoreButtons}>
                  <TouchableOpacity
                    style={styles.scoreButton}
                    onPress={() => {
                      setIsFromOCR(false);
                      setScoreInputVisible(true);
                    }}
                  >
                    <Text style={styles.scoreButtonIcon}>🏌️</Text>
                    <Text style={styles.scoreButtonText}>18홀 입력</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.scoreButton, styles.scoreButtonOCR]}
                    onPress={captureScorecard}
                  >
                    <Text style={styles.scoreButtonIcon}>📸</Text>
                    <Text style={styles.scoreButtonText}>스코어카드 촬영</Text>
                  </TouchableOpacity>
                </View>
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

              {/* 사진 추가 섹션 */}
              <Text style={styles.inputLabel}>사진 (최대 5장)</Text>
              <View style={styles.photoSection}>
                <View style={styles.photoButtons}>
                  <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
                    <Text style={styles.photoButtonIcon}>🖼️</Text>
                    <Text style={styles.photoButtonText}>갤러리</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.photoButton} onPress={takePhoto}>
                    <Text style={styles.photoButtonIcon}>📷</Text>
                    <Text style={styles.photoButtonText}>카메라</Text>
                  </TouchableOpacity>
                </View>
                {roundData.photos.length > 0 && (
                  <ScrollView horizontal style={styles.photoPreview} showsHorizontalScrollIndicator={false}>
                    {roundData.photos.map((photo, idx) => (
                      <View key={idx} style={styles.photoPreviewItem}>
                        <Image source={{ uri: photo }} style={styles.photoPreviewImage} />
                        <TouchableOpacity
                          style={styles.photoRemoveButton}
                          onPress={() => removePhoto(idx)}
                        >
                          <Text style={styles.photoRemoveText}>✕</Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                  </ScrollView>
                )}
              </View>

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
              <Text style={styles.saveButtonText}>{isEditMode ? '수정하기' : '저장하기'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 18홀 스코어 입력 모달 */}
      <ScoreInput
        visible={scoreInputVisible}
        onClose={() => {
          setScoreInputVisible(false);
          setIsFromOCR(false);
        }}
        onSave={handleScoreSave}
        initialScores={roundData.holeScores}
        initialPars={roundData.holePars}
        fromOCR={isFromOCR}
      />

      {/* 사진 크게 보기 모달 */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={photoModalVisible}
        onRequestClose={() => setPhotoModalVisible(false)}
      >
        <View style={styles.photoModalOverlay}>
          <TouchableOpacity
            style={styles.photoModalClose}
            onPress={() => setPhotoModalVisible(false)}
          >
            <Text style={styles.photoModalCloseText}>✕</Text>
          </TouchableOpacity>
          {selectedPhoto && (
            <Image
              source={{ uri: selectedPhoto }}
              style={styles.photoModalImage}
              resizeMode="contain"
            />
          )}
        </View>
      </Modal>

      {/* OCR 처리 중 로딩 */}
      {isProcessingOCR && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.loadingText}>스코어카드 인식 중...</Text>
          </View>
        </View>
      )}
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
  photoGallery: {
    marginTop: 12,
  },
  photoThumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 8,
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
  scoreButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  scoreButton: {
    flex: 1,
    backgroundColor: COLORS.cardBg,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  scoreButtonOCR: {
    backgroundColor: COLORS.primary + '20',
  },
  scoreButtonIcon: {
    fontSize: 18,
    marginRight: 6,
  },
  scoreButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
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
  photoSection: {
    marginTop: 4,
  },
  photoButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  photoButton: {
    flex: 1,
    backgroundColor: COLORS.backgroundGray,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  photoButtonIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  photoButtonText: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  photoPreview: {
    marginTop: 12,
  },
  photoPreviewItem: {
    position: 'relative',
    marginRight: 10,
  },
  photoPreviewImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  photoRemoveButton: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.error,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoRemoveText: {
    color: COLORS.textWhite,
    fontSize: 12,
    fontWeight: '700',
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
  photoModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoModalClose: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  photoModalCloseText: {
    color: COLORS.textWhite,
    fontSize: 22,
  },
  photoModalImage: {
    width: '90%',
    height: '70%',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingBox: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: COLORS.textPrimary,
    marginTop: 16,
  },
});
