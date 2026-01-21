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
      // 2코스 이상: 코스 조합 선택 화면으로 (18홀도 순서 선택 가능)
      setSelectedClub(club);
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

  // 코스 선택 화면 (27홀 이상)
  const renderCoursesView = () => {
    if (!selectedClub) return null;
    const combinations = getCourseCombinations();
    const holeData = golfzonHoles[selectedClub.id];

    return (
      <>
        <View style={styles.subHeader}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>‹ 뒤로</Text>
          </TouchableOpacity>
          <Text style={styles.subHeaderTitle} numberOfLines={1}>{selectedClub.name}</Text>
          <View style={styles.backButton} />
        </View>

        <View style={styles.combinationInfo}>
          <Text style={styles.combinationLabel}>코스 순서를 선택하세요</Text>
          <Text style={styles.combinationDesc}>
            코스: {selectedClub.courses.join(' / ')} ({selectedClub.totalHoles}홀 중 18홀 선택)
          </Text>
        </View>

        <ScrollView style={styles.resultsList} showsVerticalScrollIndicator={false}>
          {combinations.map((combo, idx) => {
            // 조합별 거리 계산
            const front = holeData?.courses.find(c => c.courseName === combo.front);
            const back = holeData?.courses.find(c => c.courseName === combo.back);
            const frontDist = front?.holes.reduce((sum, h) => sum + (h.frontTee || 0), 0) || 0;
            const backDist = back?.holes.reduce((sum, h) => sum + (h.frontTee || 0), 0) || 0;
            const totalDist = frontDist + backDist;

            // 파 계산
            const frontPar = front?.holes.reduce((sum, h) => sum + h.par, 0) || 36;
            const backPar = back?.holes.reduce((sum, h) => sum + h.par, 0) || 36;

            return (
              <TouchableOpacity
                key={idx}
                style={styles.courseItem}
                onPress={() => handleCourseSelect(combo.front, combo.back)}
              >
                <View style={styles.courseInfo}>
                  {/* 전반/후반 표시 */}
                  <View style={styles.courseComboRow}>
                    <View style={styles.courseHalfBox}>
                      <Text style={styles.courseHalfLabel}>전반</Text>
                      <Text style={styles.courseHalfName}>{combo.front}</Text>
                      <Text style={styles.courseHalfPar}>PAR {frontPar}</Text>
                    </View>
                    <Text style={styles.courseArrow}>→</Text>
                    <View style={styles.courseHalfBox}>
                      <Text style={styles.courseHalfLabel}>후반</Text>
                      <Text style={styles.courseHalfName}>{combo.back}</Text>
                      <Text style={styles.courseHalfPar}>PAR {backPar}</Text>
                    </View>
                  </View>
                  <Text style={styles.courseDistance}>
                    18홀 / {formatDistance(totalDist)} / PAR {frontPar + backPar}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
          <View style={styles.bottomSpace} />
        </ScrollView>
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
    height: 30,
  },
});
