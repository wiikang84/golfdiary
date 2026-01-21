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
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import { COLORS, SHADOWS } from '../theme/premium';
import { GOLFZON_CLUBS, GOLFZON_REGIONS } from '../data/golfzonClubs';
import golfzonHoles from '../data/golfzonHoles.json';
import golfzonDifficulty from '../data/golfzonDifficulty.json';

const isWeb = Platform.OS === 'web';

export default function GolfzonCourseSelector({ visible, onClose, onSelect }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('전체');
  const [filteredClubs, setFilteredClubs] = useState([]);

  // 2단계 선택을 위한 상태
  const [selectedClub, setSelectedClub] = useState(null);
  const [step, setStep] = useState('list'); // 'list' | 'courses'

  // 간소화된 코스 선택 상태
  const [frontCourse, setFrontCourse] = useState('');
  const [backCourse, setBackCourse] = useState('');

  // 직접입력 상태
  const [customCourseName, setCustomCourseName] = useState('');

  // 초기 로드
  useEffect(() => {
    if (visible) {
      setSearchQuery('');
      setSelectedRegion('전체');
      setSelectedClub(null);
      setStep('list');
      setCustomCourseName('');
    }
  }, [visible]);

  // 검색 및 필터링
  useEffect(() => {
    let results = [...GOLFZON_CLUBS];

    // 지역 필터
    if (selectedRegion !== '전체') {
      results = results.filter(club => club.region === selectedRegion);
    }

    // 검색어 필터
    if (searchQuery.trim()) {
      const searchTerm = searchQuery.toLowerCase().trim();
      results = results.filter(club =>
        club.name.toLowerCase().includes(searchTerm) ||
        club.courses.some(c => c.toLowerCase().includes(searchTerm))
      );
    }

    setFilteredClubs(results);
  }, [searchQuery, selectedRegion]);

  // 골프장 선택
  const handleClubSelect = (club) => {
    const holeData = golfzonHoles[club.id];

    if (holeData && holeData.courses.length >= 2) {
      // 2코스 이상: 기본 코스 자동 설정 후 확인 화면으로
      setSelectedClub(club);
      // 기본값: 첫 번째 코스 → 두 번째 코스
      setFrontCourse(holeData.courses[0].courseName);
      setBackCourse(holeData.courses[1].courseName);
      setStep('courses');
    } else {
      // 홀 데이터 없는 경우: 기본 파로 선택
      const defaultPars = [4, 4, 3, 5, 4, 4, 3, 4, 5, 4, 4, 3, 5, 4, 4, 3, 4, 5];
      onSelect({
        id: club.id,
        name: club.name,
        type: 'field',
        region: club.region,
        isGolfzon: true,
        holes: defaultPars,
        totalPar: 72,
        totalDistance: club.totalDistance,
      });
      onClose();
    }
  };

  // 전반/후반 스왑
  const handleSwap = () => {
    const temp = frontCourse;
    setFrontCourse(backCourse);
    setBackCourse(temp);
  };

  // 코스 확정
  const handleConfirmCourse = () => {
    if (!selectedClub || !frontCourse || !backCourse) return;
    handleCourseSelect(frontCourse, backCourse);
  };

  // 코스 조합 선택 (27홀 이상)
  const handleCourseSelect = (frontCourse, backCourse) => {
    const holeData = golfzonHoles[selectedClub.id];

    const front = holeData.courses.find(c => c.courseName === frontCourse);
    const back = holeData.courses.find(c => c.courseName === backCourse);

    if (front && back) {
      const pars = [
        ...front.holes.map(h => h.par),
        ...back.holes.map(h => h.par)
      ];

      // 거리 계산
      const frontDistance = front.holes.reduce((sum, h) => sum + (h.frontTee || 0), 0);
      const backDistance = back.holes.reduce((sum, h) => sum + (h.frontTee || 0), 0);

      onSelect({
        id: `${selectedClub.id}_${frontCourse}_${backCourse}`,
        name: `${selectedClub.name}`,
        type: 'field',
        region: selectedClub.region,
        isGolfzon: true,
        courseName: `${frontCourse} + ${backCourse}`,
        holes: pars,
        totalPar: pars.reduce((a, b) => a + b, 0),
        totalDistance: frontDistance + backDistance,
        frontName: frontCourse,
        backName: backCourse,
      });
      onClose();
    }
  };

  // 뒤로가기
  const handleBack = () => {
    setSelectedClub(null);
    setStep('list');
  };

  // 직접입력 저장
  const handleCustomSave = () => {
    if (!customCourseName.trim()) return;

    const defaultPars = [4, 4, 3, 5, 4, 4, 3, 4, 5, 4, 4, 3, 5, 4, 4, 3, 4, 5];
    onSelect({
      id: `custom_${Date.now()}`,
      name: customCourseName.trim(),
      type: 'field',
      isCustom: true,
      holes: defaultPars,
      totalPar: 72,
    });
    onClose();
  };

  // 거리 포맷팅
  const formatDistance = (meters) => {
    if (!meters) return '';
    return `${meters.toLocaleString()}m`;
  };

  // 난이도를 별점으로 변환 (0-10 → ★★★★☆ 형식)
  const renderStars = (difficulty) => {
    if (!difficulty && difficulty !== 0) return '—';
    // 0-10을 0-5로 변환
    const stars = Math.round(difficulty / 2);
    return '★'.repeat(stars) + '☆'.repeat(5 - stars);
  };

  // 난이도 정보 가져오기
  const getDifficultyInfo = (clubId) => {
    return golfzonDifficulty[clubId] || null;
  };

  // 코스 조합 생성 (27홀 이상)
  const getCourseCombinations = () => {
    if (!selectedClub) return [];
    const holeData = golfzonHoles[selectedClub.id];
    if (!holeData) return [];

    const courses = holeData.courses.map(c => c.courseName);
    const combinations = [];

    for (let i = 0; i < courses.length; i++) {
      for (let j = 0; j < courses.length; j++) {
        if (i !== j) {
          combinations.push({
            front: courses[i],
            back: courses[j],
            name: `${courses[i]} + ${courses[j]}`
          });
        }
      }
    }

    return combinations;
  };

  // 코스 선택 화면 (간소화 버전)
  const renderCoursesView = () => {
    if (!selectedClub) return null;
    const holeData = golfzonHoles[selectedClub.id];
    const diffInfo = getDifficultyInfo(selectedClub.id);

    // 현재 선택된 코스의 파/거리 계산
    const front = holeData?.courses.find(c => c.courseName === frontCourse);
    const back = holeData?.courses.find(c => c.courseName === backCourse);
    const frontDist = front?.holes.reduce((sum, h) => sum + (h.frontTee || 0), 0) || 0;
    const backDist = back?.holes.reduce((sum, h) => sum + (h.frontTee || 0), 0) || 0;
    const totalDist = frontDist + backDist;
    const frontPar = front?.holes.reduce((sum, h) => sum + h.par, 0) || 36;
    const backPar = back?.holes.reduce((sum, h) => sum + h.par, 0) || 36;

    // 27홀 이상인 경우 다른 코스 옵션 표시
    const availableCourses = holeData?.courses.map(c => c.courseName) || [];
    const isMultiCourse = availableCourses.length > 2;

    return (
      <>
        <View style={styles.subHeader}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>‹ 뒤로</Text>
          </TouchableOpacity>
          <Text style={styles.subHeaderTitle} numberOfLines={1}>{selectedClub.name}</Text>
          <View style={styles.backButton} />
        </View>

        <ScrollView style={styles.resultsList} showsVerticalScrollIndicator={false}>
          {/* 골프장 정보 카드 */}
          <View style={styles.clubDetailCard}>
            {diffInfo?.logoImage ? (
              <Image
                source={{ uri: diffInfo.logoImage }}
                style={styles.clubDetailLogo}
                resizeMode="contain"
              />
            ) : (
              <View style={[styles.clubDetailLogo, styles.clubLogoPlaceholder]}>
                <Text style={styles.clubLogoText}>⛳</Text>
              </View>
            )}
            <View style={styles.clubDetailInfo}>
              <Text style={styles.clubDetailName}>{selectedClub.name}</Text>
              <Text style={styles.clubDetailMeta}>
                {selectedClub.totalHoles}홀 / {formatDistance(selectedClub.totalDistance)}
              </Text>
              {diffInfo && (
                <View style={styles.difficultyRowDetail}>
                  <Text style={styles.difficultyLabelDetail}>코스 {renderStars(diffInfo.difficultyCc)}</Text>
                  <Text style={styles.difficultyLabelDetail}>그린 {renderStars(diffInfo.difficultyGreen)}</Text>
                </View>
              )}
            </View>
          </View>

          {/* 코스 선택 영역 */}
          <View style={styles.courseSelectSection}>
            <Text style={styles.courseSelectTitle}>코스 순서</Text>

            <View style={styles.courseSelectBox}>
              {/* 전반 */}
              <View style={styles.courseHalfBoxLarge}>
                <Text style={styles.courseHalfLabelLarge}>전반</Text>
                <Text style={styles.courseHalfNameLarge}>{frontCourse}</Text>
                <Text style={styles.courseHalfParLarge}>PAR {frontPar}</Text>
                <Text style={styles.courseHalfDist}>{formatDistance(frontDist)}</Text>
              </View>

              {/* 스왑 버튼 */}
              <TouchableOpacity style={styles.swapButton} onPress={handleSwap}>
                <Text style={styles.swapButtonText}>⇄</Text>
                <Text style={styles.swapButtonLabel}>스왑</Text>
              </TouchableOpacity>

              {/* 후반 */}
              <View style={styles.courseHalfBoxLarge}>
                <Text style={styles.courseHalfLabelLarge}>후반</Text>
                <Text style={styles.courseHalfNameLarge}>{backCourse}</Text>
                <Text style={styles.courseHalfParLarge}>PAR {backPar}</Text>
                <Text style={styles.courseHalfDist}>{formatDistance(backDist)}</Text>
              </View>
            </View>

            {/* 총 정보 */}
            <View style={styles.courseTotalInfo}>
              <Text style={styles.courseTotalText}>
                총 18홀 / {formatDistance(totalDist)} / PAR {frontPar + backPar}
              </Text>
            </View>
          </View>

          {/* 27홀 이상: 다른 코스 선택 옵션 */}
          {isMultiCourse && (
            <View style={styles.otherCoursesSection}>
              <Text style={styles.otherCoursesTitle}>코스 변경</Text>
              <View style={styles.otherCoursesRow}>
                <View style={styles.coursePickerContainer}>
                  <Text style={styles.coursePickerLabel}>전반</Text>
                  <View style={styles.coursePickerButtons}>
                    {availableCourses.filter(c => c !== backCourse).map(course => (
                      <TouchableOpacity
                        key={course}
                        style={[
                          styles.coursePickerBtn,
                          frontCourse === course && styles.coursePickerBtnActive
                        ]}
                        onPress={() => setFrontCourse(course)}
                      >
                        <Text style={[
                          styles.coursePickerBtnText,
                          frontCourse === course && styles.coursePickerBtnTextActive
                        ]}>{course}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
                <View style={styles.coursePickerContainer}>
                  <Text style={styles.coursePickerLabel}>후반</Text>
                  <View style={styles.coursePickerButtons}>
                    {availableCourses.filter(c => c !== frontCourse).map(course => (
                      <TouchableOpacity
                        key={course}
                        style={[
                          styles.coursePickerBtn,
                          backCourse === course && styles.coursePickerBtnActive
                        ]}
                        onPress={() => setBackCourse(course)}
                      >
                        <Text style={[
                          styles.coursePickerBtnText,
                          backCourse === course && styles.coursePickerBtnTextActive
                        ]}>{course}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
            </View>
          )}

          <View style={styles.bottomSpace} />
        </ScrollView>

        {/* 확인 버튼 */}
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmCourse}>
          <Text style={styles.confirmButtonText}>이 코스로 시작</Text>
        </TouchableOpacity>
      </>
    );
  };

  // 메인 목록 화면
  const renderListView = () => {
    return (
      <>
        {/* 지역 탭 */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.regionTabs}
          contentContainerStyle={styles.regionTabsContent}
        >
          {GOLFZON_REGIONS.map(region => (
            <TouchableOpacity
              key={region}
              style={[
                styles.regionTab,
                selectedRegion === region && styles.regionTabActive
              ]}
              onPress={() => setSelectedRegion(region)}
            >
              <Text style={[
                styles.regionTabText,
                selectedRegion === region && styles.regionTabTextActive
              ]}>
                {region}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* 검색바 */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="검색어를 입력해 주세요"
              placeholderTextColor={COLORS.textMuted}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCapitalize="none"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Text style={styles.clearButton}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* 결과 수 */}
        <View style={styles.resultCount}>
          <Text style={styles.resultCountText}>
            {filteredClubs.length}개 골프장
          </Text>
        </View>

        {/* 골프장 목록 */}
        <ScrollView style={styles.resultsList} showsVerticalScrollIndicator={false}>
          {filteredClubs.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>🔍</Text>
              <Text style={styles.emptyText}>검색 결과가 없습니다</Text>
            </View>
          ) : (
            filteredClubs.map(club => {
              const diffInfo = getDifficultyInfo(club.id);
              return (
                <TouchableOpacity
                  key={club.id}
                  style={styles.clubCard}
                  onPress={() => handleClubSelect(club)}
                >
                  <View style={styles.clubCardRow}>
                    {/* 로고 이미지 */}
                    {diffInfo?.logoImage ? (
                      <Image
                        source={{ uri: diffInfo.logoImage }}
                        style={styles.clubLogo}
                        resizeMode="contain"
                      />
                    ) : (
                      <View style={[styles.clubLogo, styles.clubLogoPlaceholder]}>
                        <Text style={styles.clubLogoText}>⛳</Text>
                      </View>
                    )}

                    <View style={styles.clubCardContent}>
                      <View style={styles.clubCardHeader}>
                        <View style={styles.regionBadge}>
                          <Text style={styles.regionBadgeText}>{club.region}</Text>
                        </View>
                        {club.region === '해외' && club.originalRegion && (
                          <View style={styles.subRegionBadge}>
                            <Text style={styles.subRegionBadgeText}>{club.originalRegion}</Text>
                          </View>
                        )}
                      </View>
                      <Text style={styles.clubName} numberOfLines={1}>{club.name}</Text>

                      <View style={styles.clubInfoRow}>
                        <Text style={styles.clubInfoText}>
                          {club.totalHoles}홀 / {formatDistance(club.totalDistance)}
                        </Text>
                      </View>

                      {/* 난이도 표시 */}
                      {diffInfo && (
                        <View style={styles.difficultyRow}>
                          <View style={styles.difficultyItem}>
                            <Text style={styles.difficultyLabel}>코스</Text>
                            <Text style={styles.difficultyStars}>{renderStars(diffInfo.difficultyCc)}</Text>
                          </View>
                          <View style={styles.difficultyItem}>
                            <Text style={styles.difficultyLabel}>그린</Text>
                            <Text style={styles.difficultyStars}>{renderStars(diffInfo.difficultyGreen)}</Text>
                          </View>
                        </View>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          )}

          {/* 직접입력 영역 */}
          <View style={styles.customSection}>
            <Text style={styles.customLabel}>목록에 없는 골프장</Text>
            <View style={styles.customInputRow}>
              <TextInput
                style={styles.customInput}
                placeholder="골프장명 직접 입력"
                placeholderTextColor={COLORS.textMuted}
                value={customCourseName}
                onChangeText={setCustomCourseName}
              />
              <TouchableOpacity
                style={[
                  styles.customSaveBtn,
                  !customCourseName.trim() && styles.customSaveBtnDisabled
                ]}
                onPress={handleCustomSave}
                disabled={!customCourseName.trim()}
              >
                <Text style={styles.customSaveBtnText}>추가</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.bottomSpace} />
        </ScrollView>
      </>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.modalOverlay}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.modalContent}>
          {/* 헤더 */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {step === 'courses' ? '코스 선택' : '골프장 선택'}
            </Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* 단계별 화면 */}
          {step === 'courses' ? renderCoursesView() : renderListView()}
        </View>
      </KeyboardAvoidingView>
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
    maxHeight: '90%',
    minHeight: '80%',
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

  // 지역 탭
  regionTabs: {
    backgroundColor: COLORS.backgroundGray,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
    maxHeight: 56,
  },
  regionTabsContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  regionTab: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.divider,
    marginRight: 8,
  },
  regionTabActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  regionTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  regionTabTextActive: {
    color: COLORS.textWhite,
  },

  // 검색바
  searchSection: {
    padding: 16,
    paddingBottom: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundGray,
    borderRadius: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: COLORS.divider,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  clearButton: {
    fontSize: 14,
    color: COLORS.textMuted,
    padding: 4,
  },

  // 결과 수
  resultCount: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  resultCountText: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },

  // 결과 목록
  resultsList: {
    flex: 1,
    paddingHorizontal: 16,
  },

  // 골프장 카드
  clubCard: {
    backgroundColor: COLORS.backgroundGray,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.divider,
  },
  clubCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clubLogo: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: COLORS.cardBg,
    marginRight: 12,
  },
  clubLogoPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.divider,
  },
  clubLogoText: {
    fontSize: 24,
  },
  clubCardContent: {
    flex: 1,
  },
  clubCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  regionBadge: {
    backgroundColor: COLORS.primary + '20',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginRight: 6,
  },
  regionBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.primary,
  },
  subRegionBadge: {
    backgroundColor: COLORS.info + '20',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    marginRight: 6,
  },
  subRegionBadgeText: {
    fontSize: 10,
    fontWeight: '500',
    color: COLORS.info,
  },
  clubName: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  clubInfoRow: {
    marginBottom: 4,
  },
  clubInfoText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  difficultyRow: {
    flexDirection: 'row',
    gap: 16,
  },
  difficultyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  difficultyLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  difficultyStars: {
    fontSize: 11,
    color: '#F5A623',
    letterSpacing: -1,
  },
  clubCardBody: {
    paddingLeft: 2,
  },
  clubInfo: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  clubCourses: {
    fontSize: 12,
    color: COLORS.textMuted,
  },

  // 서브헤더
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: COLORS.backgroundGray,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  backButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    minWidth: 60,
  },
  backButtonText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '600',
  },
  subHeaderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    flex: 1,
    textAlign: 'center',
  },
  combinationInfo: {
    padding: 16,
    backgroundColor: COLORS.primary + '10',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  combinationLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  combinationDesc: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },

  // 코스 아이템
  courseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundGray,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.divider,
  },
  courseInfo: {
    flex: 1,
  },
  courseName: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  courseMeta: {
    marginBottom: 4,
  },
  courseDetail: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  courseDistance: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '500',
    marginTop: 8,
  },
  // 전반/후반 조합 표시
  courseComboRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  courseHalfBox: {
    flex: 1,
    backgroundColor: COLORS.backgroundGray,
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
  },
  courseHalfLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginBottom: 4,
  },
  courseHalfName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  courseHalfPar: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  courseArrow: {
    fontSize: 20,
    color: COLORS.primary,
    fontWeight: '700',
  },
  selectArrow: {
    fontSize: 24,
    color: COLORS.textMuted,
    marginLeft: 8,
  },

  // 빈 상태
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },

  // 직접입력
  customSection: {
    marginTop: 20,
    padding: 16,
    backgroundColor: COLORS.backgroundGray,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.divider,
    borderStyle: 'dashed',
  },
  customLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 10,
  },
  customInputRow: {
    flexDirection: 'row',
    gap: 10,
  },
  customInput: {
    flex: 1,
    backgroundColor: COLORS.cardBg,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: COLORS.textPrimary,
    borderWidth: 1,
    borderColor: COLORS.divider,
  },
  customSaveBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
  },
  customSaveBtnDisabled: {
    backgroundColor: COLORS.textMuted,
  },
  customSaveBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textWhite,
  },

  bottomSpace: {
    height: 100,
  },

  // 간소화된 코스 선택 화면 스타일
  clubDetailCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundGray,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  clubDetailLogo: {
    width: 70,
    height: 70,
    borderRadius: 10,
    backgroundColor: COLORS.cardBg,
    marginRight: 14,
  },
  clubDetailInfo: {
    flex: 1,
  },
  clubDetailName: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  clubDetailMeta: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 6,
  },
  difficultyRowDetail: {
    flexDirection: 'row',
    gap: 12,
  },
  difficultyLabelDetail: {
    fontSize: 12,
    color: '#F5A623',
  },

  // 코스 선택 박스
  courseSelectSection: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.divider,
  },
  courseSelectTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 16,
  },
  courseSelectBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  courseHalfBoxLarge: {
    flex: 1,
    backgroundColor: COLORS.backgroundGray,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  courseHalfLabelLarge: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginBottom: 4,
  },
  courseHalfNameLarge: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  courseHalfParLarge: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 2,
  },
  courseHalfDist: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  swapButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    ...SHADOWS.medium,
  },
  swapButtonText: {
    fontSize: 24,
    color: COLORS.textWhite,
    fontWeight: '700',
  },
  swapButtonLabel: {
    fontSize: 10,
    color: COLORS.textWhite,
    marginTop: 2,
  },
  courseTotalInfo: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
    alignItems: 'center',
  },
  courseTotalText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },

  // 27홀 이상 코스 변경
  otherCoursesSection: {
    backgroundColor: COLORS.backgroundGray,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  otherCoursesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  otherCoursesRow: {
    gap: 12,
  },
  coursePickerContainer: {
    marginBottom: 8,
  },
  coursePickerLabel: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginBottom: 6,
  },
  coursePickerButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  coursePickerBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.divider,
  },
  coursePickerBtnActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  coursePickerBtnText: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  coursePickerBtnTextActive: {
    color: COLORS.textWhite,
  },

  // 확인 버튼
  confirmButton: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    padding: 18,
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  confirmButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.textWhite,
  },
});
