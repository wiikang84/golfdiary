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
} from 'react-native';
import { COLORS, SHADOWS } from '../theme/premium';
import {
  GOLF_CLUBS,
  SCREEN_COURSES,
  REGIONS,
  REGION_GROUPS,
  REGION_CATEGORIES,
  SCREEN_PROVIDERS,
  MEMBERSHIP_TYPES,
  searchClubs,
  getClubCombinations,
  getCombinationHoles,
  searchScreenCourses,
  getClubById,
  getRegionsByGroup,
  getClubCountByGroup,
} from '../data/golfCourses';

const isWeb = Platform.OS === 'web';

// 코스 타입 필터 옵션
const COURSE_TYPES = [
  { value: 'all', label: '전체' },
  { value: 'field', label: '필드' },
  { value: 'screen', label: '스크린' },
];

export default function CourseSelector({ visible, onClose, onSelect, roundType }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedRegionGroup, setSelectedRegionGroup] = useState('전체');
  const [selectedRegion, setSelectedRegion] = useState('전체');
  const [selectedProvider, setSelectedProvider] = useState('전체');
  const [selectedMembership, setSelectedMembership] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // 2단계 선택을 위한 상태
  const [selectedClub, setSelectedClub] = useState(null);
  const [step, setStep] = useState('list'); // 'list' | 'combinations' | 'custom'

  // 결과 목록
  const [fieldClubs, setFieldClubs] = useState([]);
  const [screenCourses, setScreenCourses] = useState([]);

  // 직접입력 상태
  const [customCourseName, setCustomCourseName] = useState('');
  const [customCourseType, setCustomCourseType] = useState('field'); // 'field' | 'screen'

  // 초기 로드 시 설정
  useEffect(() => {
    if (visible) {
      // 스크린/필드 상관없이 모든 골프장 검색 가능하도록 'all'로 설정
      setSelectedType('all');
      setSearchQuery('');
      setSelectedRegionGroup('전체');
      setSelectedRegion('전체');
      setSelectedProvider('전체');
      setSelectedMembership('all');
      setSelectedClub(null);
      setStep('list');
      setCustomCourseName('');
      setCustomCourseType(roundType === 'screen' ? 'screen' : 'field');
    }
  }, [visible, roundType]);

  // 권역 변경 시 세부지역 초기화
  useEffect(() => {
    setSelectedRegion('전체');
  }, [selectedRegionGroup]);

  // 검색 실행
  useEffect(() => {
    // 필드 골프장 검색
    if (selectedType === 'all' || selectedType === 'field') {
      const clubs = searchClubs(searchQuery, selectedRegion, selectedRegionGroup, selectedMembership);
      setFieldClubs(clubs);
    } else {
      setFieldClubs([]);
    }

    // 스크린 코스 검색
    if (selectedType === 'all' || selectedType === 'screen') {
      const provider = selectedProvider === '전체' ? null : selectedProvider;
      const courses = searchScreenCourses(searchQuery, provider);
      setScreenCourses(courses);
    } else {
      setScreenCourses([]);
    }
  }, [searchQuery, selectedType, selectedRegion, selectedRegionGroup, selectedProvider, selectedMembership]);

  // 필드 골프장 선택 (코스 조합 보기)
  const handleClubSelect = (club) => {
    const combinations = getClubCombinations(club.id);
    if (combinations.length === 1) {
      // 18홀 골프장인 경우 바로 선택
      handleCombinationSelect(combinations[0]);
    } else if (combinations.length > 1) {
      // 27홀/36홀 골프장인 경우 코스 조합 선택 화면으로
      setSelectedClub(club);
      setStep('combinations');
    } else {
      // 코스 조합 정보가 없는 골프장 - 기본 파 정보로 선택
      onSelect({
        id: club.id,
        clubId: club.id,
        name: club.name,
        type: 'field',
        region: club.region,
        city: club.city,
        membership: club.membership,
        holes: [4, 4, 3, 5, 4, 4, 3, 4, 5, 4, 4, 3, 5, 4, 4, 3, 4, 5], // 기본 파
        totalPar: 72,
      });
      onClose();
    }
  };

  // 코스 조합 선택
  const handleCombinationSelect = (combination) => {
    const holeInfo = getCombinationHoles(combination.id);
    if (holeInfo) {
      const club = getClubById(combination.clubId);
      onSelect({
        id: combination.id,
        clubId: combination.clubId,
        name: club ? `${club.name} (${holeInfo.name})` : holeInfo.name,
        type: 'field',
        region: club?.region || '',
        city: club?.city || '',
        membership: club?.membership || '',
        holes: holeInfo.holes,
        totalPar: holeInfo.totalPar,
        frontName: holeInfo.frontName,
        backName: holeInfo.backName,
      });
      onClose();
    }
  };

  // 스크린 코스 선택
  const handleScreenSelect = (course) => {
    onSelect({
      id: course.id,
      name: course.name,
      type: 'screen',
      provider: course.provider,
      holes: course.holes,
      totalPar: course.totalPar,
    });
    onClose();
  };

  // 뒤로가기
  const handleBack = () => {
    setSelectedClub(null);
    setStep('list');
    setCustomCourseName('');
  };

  // 직접입력 화면으로 이동
  const handleCustomInput = () => {
    setStep('custom');
    setCustomCourseName('');
    setCustomCourseType(selectedType === 'screen' ? 'screen' : 'field');
  };

  // 직접입력 저장
  const handleCustomSave = () => {
    if (!customCourseName.trim()) {
      return;
    }

    const defaultPars = [4, 4, 3, 5, 4, 4, 3, 4, 5, 4, 4, 3, 5, 4, 4, 3, 4, 5];

    onSelect({
      id: `custom_${Date.now()}`,
      name: customCourseName.trim(),
      type: customCourseType,
      isCustom: true,
      holes: defaultPars,
      totalPar: 72,
      region: customCourseType === 'field' ? '해외/기타' : '',
      provider: customCourseType === 'screen' ? '기타' : '',
    });
    onClose();
  };

  // 현재 권역에 해당하는 세부 지역 목록
  const availableRegions = selectedRegionGroup === '전체'
    ? REGIONS
    : ['전체', ...getRegionsByGroup(selectedRegionGroup)];

  // 골프장 아이템 렌더링
  const renderClubItem = (club) => {
    const holesLabel = club.totalHoles === 18 ? '18홀' :
                       club.totalHoles === 27 ? '27홀' :
                       club.totalHoles === 36 ? '36홀' :
                       club.totalHoles === 45 ? '45홀' :
                       club.totalHoles === 72 ? '72홀' :
                       `${club.totalHoles}홀`;

    const membershipLabel = club.membership === 'member' ? '회원제' :
                            club.membership === 'public' ? '대중제' :
                            club.membership === 'military' ? '군골프장' : '';

    const membershipColor = club.membership === 'member' ? COLORS.gold :
                            club.membership === 'public' ? COLORS.success : COLORS.textMuted;

    return (
      <TouchableOpacity
        key={club.id}
        style={styles.courseItem}
        onPress={() => handleClubSelect(club)}
      >
        <View style={styles.courseInfo}>
          <View style={styles.courseHeader}>
            <Text style={styles.courseName} numberOfLines={1}>{club.name}</Text>
            <View style={[styles.typeBadge, { backgroundColor: COLORS.primary + '20' }]}>
              <Text style={[styles.typeText, { color: COLORS.primary }]}>필드</Text>
            </View>
          </View>
          <View style={styles.courseMeta}>
            <Text style={styles.courseRegion}>{club.region} {club.city}</Text>
            <Text style={[styles.courseMembership, { color: membershipColor }]}>{membershipLabel}</Text>
            <Text style={styles.courseHoles}>{holesLabel}</Text>
          </View>
        </View>
        <Text style={styles.selectArrow}>›</Text>
      </TouchableOpacity>
    );
  };

  // 스크린 코스 아이템 렌더링
  const renderScreenItem = (course) => {
    return (
      <TouchableOpacity
        key={course.id}
        style={styles.courseItem}
        onPress={() => handleScreenSelect(course)}
      >
        <View style={styles.courseInfo}>
          <View style={styles.courseHeader}>
            <Text style={styles.courseName} numberOfLines={1}>{course.name}</Text>
            <View style={[styles.typeBadge, { backgroundColor: COLORS.info + '20' }]}>
              <Text style={[styles.typeText, { color: COLORS.info }]}>스크린</Text>
            </View>
          </View>
          <View style={styles.courseMeta}>
            <Text style={styles.courseProvider}>{course.provider}</Text>
            <Text style={styles.coursePar}>PAR {course.totalPar}</Text>
          </View>
        </View>
        <Text style={styles.selectArrow}>›</Text>
      </TouchableOpacity>
    );
  };

  // 코스 조합 아이템 렌더링
  const renderCombinationItem = (combination) => {
    const holeInfo = getCombinationHoles(combination.id);
    if (!holeInfo) return null;

    return (
      <TouchableOpacity
        key={combination.id}
        style={styles.courseItem}
        onPress={() => handleCombinationSelect(combination)}
      >
        <View style={styles.courseInfo}>
          <View style={styles.courseHeader}>
            <Text style={styles.courseName}>{holeInfo.name}</Text>
          </View>
          <View style={styles.courseMeta}>
            <Text style={styles.courseRegion}>
              전반 {holeInfo.frontName} + 후반 {holeInfo.backName}
            </Text>
            <Text style={styles.coursePar}>PAR {holeInfo.totalPar}</Text>
          </View>
        </View>
        <Text style={styles.selectArrow}>›</Text>
      </TouchableOpacity>
    );
  };

  // 코스 조합 선택 화면
  const renderCombinationsView = () => {
    if (!selectedClub) return null;
    const combinations = getClubCombinations(selectedClub.id);

    return (
      <>
        {/* 헤더 - 뒤로가기 */}
        <View style={styles.subHeader}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>‹ 뒤로</Text>
          </TouchableOpacity>
          <Text style={styles.subHeaderTitle} numberOfLines={1}>{selectedClub.name}</Text>
          <View style={styles.backButton} />
        </View>

        <View style={styles.combinationInfo}>
          <Text style={styles.combinationLabel}>코스 조합을 선택하세요</Text>
          <Text style={styles.combinationDesc}>
            {selectedClub.totalHoles}홀 골프장 - {combinations.length}가지 조합
          </Text>
        </View>

        <ScrollView style={styles.resultsList} showsVerticalScrollIndicator={false}>
          {combinations.map(renderCombinationItem)}
          <View style={styles.bottomSpace} />
        </ScrollView>
      </>
    );
  };

  // 직접입력 화면
  const renderCustomInputView = () => {
    return (
      <>
        {/* 헤더 - 뒤로가기 */}
        <View style={styles.subHeader}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>‹ 뒤로</Text>
          </TouchableOpacity>
          <Text style={styles.subHeaderTitle}>골프장 직접입력</Text>
          <View style={styles.backButton} />
        </View>

        <View style={styles.customInputSection}>
          <Text style={styles.customInputLabel}>🏌️ 골프장/코스 이름</Text>
          <TextInput
            style={styles.customInput}
            placeholder="예: 하와이 카할라 골프장"
            placeholderTextColor={COLORS.textMuted}
            value={customCourseName}
            onChangeText={setCustomCourseName}
            maxLength={50}
            autoFocus
          />

          <Text style={styles.customInputLabel}>타입 선택</Text>
          <View style={styles.customTypeRow}>
            <TouchableOpacity
              style={[
                styles.customTypeBtn,
                customCourseType === 'field' && styles.customTypeBtnActive
              ]}
              onPress={() => setCustomCourseType('field')}
            >
              <Text style={styles.customTypeEmoji}>⛳</Text>
              <Text style={[
                styles.customTypeText,
                customCourseType === 'field' && styles.customTypeTextActive
              ]}>필드</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.customTypeBtn,
                customCourseType === 'screen' && styles.customTypeBtnActiveScreen
              ]}
              onPress={() => setCustomCourseType('screen')}
            >
              <Text style={styles.customTypeEmoji}>🖥️</Text>
              <Text style={[
                styles.customTypeText,
                customCourseType === 'screen' && styles.customTypeTextActive
              ]}>스크린</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.customHelpText}>
            ※ 해외 골프장, 미등록 골프장 등을 자유롭게 입력하세요.{'\n'}
            ※ PAR 정보는 기본값(72)이 적용됩니다.
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.customSaveButton,
            !customCourseName.trim() && styles.customSaveButtonDisabled
          ]}
          onPress={handleCustomSave}
          disabled={!customCourseName.trim()}
        >
          <Text style={styles.customSaveButtonText}>저장하기</Text>
        </TouchableOpacity>
      </>
    );
  };

  // 메인 목록 화면
  const renderListView = () => {
    const totalResults = fieldClubs.length + screenCourses.length;

    return (
      <>
        {/* 검색바 */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="골프장 검색..."
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
          <TouchableOpacity
            style={[styles.filterToggle, showFilters && styles.filterToggleActive]}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Text style={styles.filterIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>

        {/* 필터 */}
        {showFilters && (
          <ScrollView style={styles.filterScroll} nestedScrollEnabled>
            <View style={styles.filterSection}>
              {/* 타입 필터 */}
              <View style={styles.filterRow}>
                <Text style={styles.filterLabel}>타입</Text>
                <View style={styles.filterChips}>
                  {COURSE_TYPES.map(type => (
                    <TouchableOpacity
                      key={type.value}
                      style={[
                        styles.filterChip,
                        selectedType === type.value && styles.filterChipActive
                      ]}
                      onPress={() => setSelectedType(type.value)}
                    >
                      <Text style={[
                        styles.filterChipText,
                        selectedType === type.value && styles.filterChipTextActive
                      ]}>
                        {type.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* 권역 필터 (필드 선택시만) */}
              {(selectedType === 'all' || selectedType === 'field') && (
                <>
                  <View style={styles.filterRow}>
                    <Text style={styles.filterLabel}>권역</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                      <View style={styles.filterChips}>
                        {REGION_GROUPS.map(group => (
                          <TouchableOpacity
                            key={group}
                            style={[
                              styles.filterChip,
                              selectedRegionGroup === group && styles.filterChipActive
                            ]}
                            onPress={() => setSelectedRegionGroup(group)}
                          >
                            <Text style={[
                              styles.filterChipText,
                              selectedRegionGroup === group && styles.filterChipTextActive
                            ]}>
                              {group}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </ScrollView>
                  </View>

                  {/* 세부 지역 필터 */}
                  <View style={styles.filterRow}>
                    <Text style={styles.filterLabel}>지역</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                      <View style={styles.filterChips}>
                        {availableRegions.map(region => (
                          <TouchableOpacity
                            key={region}
                            style={[
                              styles.filterChip,
                              selectedRegion === region && styles.filterChipActive
                            ]}
                            onPress={() => setSelectedRegion(region)}
                          >
                            <Text style={[
                              styles.filterChipText,
                              selectedRegion === region && styles.filterChipTextActive
                            ]}>
                              {region}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </ScrollView>
                  </View>

                  {/* 회원제/대중제 필터 */}
                  <View style={styles.filterRow}>
                    <Text style={styles.filterLabel}>운영형태</Text>
                    <View style={styles.filterChips}>
                      {MEMBERSHIP_TYPES.map(type => (
                        <TouchableOpacity
                          key={type.value}
                          style={[
                            styles.filterChip,
                            selectedMembership === type.value && styles.filterChipActive
                          ]}
                          onPress={() => setSelectedMembership(type.value)}
                        >
                          <Text style={[
                            styles.filterChipText,
                            selectedMembership === type.value && styles.filterChipTextActive
                          ]}>
                            {type.label}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                </>
              )}

              {/* 스크린 제공업체 필터 (스크린 선택시만) */}
              {(selectedType === 'all' || selectedType === 'screen') && (
                <View style={styles.filterRow}>
                  <Text style={styles.filterLabel}>스크린 제공업체</Text>
                  <View style={styles.filterChips}>
                    <TouchableOpacity
                      style={[
                        styles.filterChip,
                        selectedProvider === '전체' && styles.filterChipActive
                      ]}
                      onPress={() => setSelectedProvider('전체')}
                    >
                      <Text style={[
                        styles.filterChipText,
                        selectedProvider === '전체' && styles.filterChipTextActive
                      ]}>
                        전체
                      </Text>
                    </TouchableOpacity>
                    {SCREEN_PROVIDERS.map(provider => (
                      <TouchableOpacity
                        key={provider}
                        style={[
                          styles.filterChip,
                          selectedProvider === provider && styles.filterChipActive
                        ]}
                        onPress={() => setSelectedProvider(provider)}
                      >
                        <Text style={[
                          styles.filterChipText,
                          selectedProvider === provider && styles.filterChipTextActive
                        ]}>
                          {provider}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
            </View>
          </ScrollView>
        )}

        {/* 결과 목록 */}
        <ScrollView style={styles.resultsList} showsVerticalScrollIndicator={false}>
          {totalResults === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>🔍</Text>
              <Text style={styles.emptyText}>검색 결과가 없습니다</Text>
              <Text style={styles.emptySubText}>다른 검색어나 필터를 선택해보세요</Text>
            </View>
          ) : (
            <>
              {/* 필드 골프장 섹션 */}
              {fieldClubs.length > 0 && (
                <>
                  <Text style={styles.sectionTitle}>
                    필드 골프장 ({fieldClubs.length}개)
                  </Text>
                  {fieldClubs.map(renderClubItem)}
                </>
              )}

              {/* 스크린 코스 섹션 */}
              {screenCourses.length > 0 && (
                <>
                  <Text style={styles.sectionTitle}>
                    스크린 골프 ({screenCourses.length}개)
                  </Text>
                  {screenCourses.map(renderScreenItem)}
                </>
              )}
            </>
          )}
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
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* 헤더 */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {step === 'combinations' ? '코스 조합 선택' :
               step === 'custom' ? '직접 입력' : '골프장 선택'}
            </Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* 단계별 화면 렌더링 */}
          {step === 'combinations' ? renderCombinationsView() :
           step === 'custom' ? renderCustomInputView() : renderListView()}

          {/* 직접 입력 버튼 */}
          {step === 'list' && (
            <TouchableOpacity
              style={styles.customButton}
              onPress={handleCustomInput}
            >
              <Text style={styles.customButtonIcon}>✏️</Text>
              <Text style={styles.customButtonText}>목록에 없음 - 직접 입력</Text>
            </TouchableOpacity>
          )}
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
    maxHeight: '90%',
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
  searchSection: {
    flexDirection: 'row',
    padding: 16,
    gap: 10,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundGray,
    borderRadius: 12,
    paddingHorizontal: 14,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  clearButton: {
    fontSize: 14,
    color: COLORS.textMuted,
    padding: 4,
  },
  filterToggle: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: COLORS.backgroundGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterToggleActive: {
    backgroundColor: COLORS.primary + '20',
  },
  filterIcon: {
    fontSize: 20,
  },
  filterScroll: {
    maxHeight: 220,
  },
  filterSection: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  filterRow: {
    marginBottom: 12,
  },
  filterLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  filterChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.backgroundGray,
  },
  filterChipActive: {
    backgroundColor: COLORS.primary,
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  filterChipTextActive: {
    color: COLORS.textWhite,
  },
  resultsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginTop: 16,
    marginBottom: 10,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  courseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundGray,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  courseInfo: {
    flex: 1,
  },
  courseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  courseName: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
    flex: 1,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  typeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  courseMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 10,
    flexWrap: 'wrap',
  },
  courseRegion: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  courseMembership: {
    fontSize: 12,
    fontWeight: '500',
  },
  courseHoles: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  courseProvider: {
    fontSize: 12,
    color: COLORS.info,
    fontWeight: '500',
  },
  coursePar: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  selectArrow: {
    fontSize: 24,
    color: COLORS.textMuted,
    marginLeft: 8,
  },
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
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  emptySubText: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginTop: 4,
  },
  bottomSpace: {
    height: 20,
  },
  customButton: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: COLORS.backgroundGray,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: COLORS.divider,
    borderStyle: 'dashed',
  },
  customButtonIcon: {
    fontSize: 16,
  },
  customButtonText: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  // 직접입력 화면 스타일
  customInputSection: {
    padding: 20,
  },
  customInputLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 10,
    marginTop: 16,
  },
  customInput: {
    backgroundColor: COLORS.backgroundGray,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  customTypeRow: {
    flexDirection: 'row',
    gap: 12,
  },
  customTypeBtn: {
    flex: 1,
    backgroundColor: COLORS.backgroundGray,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  customTypeBtnActive: {
    backgroundColor: COLORS.primary + '15',
    borderColor: COLORS.primary,
  },
  customTypeBtnActiveScreen: {
    backgroundColor: COLORS.info + '15',
    borderColor: COLORS.info,
  },
  customTypeEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  customTypeText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  customTypeTextActive: {
    color: COLORS.textPrimary,
  },
  customHelpText: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginTop: 20,
    lineHeight: 20,
  },
  customSaveButton: {
    backgroundColor: COLORS.primary,
    margin: 16,
    padding: 18,
    borderRadius: 14,
    alignItems: 'center',
  },
  customSaveButtonDisabled: {
    backgroundColor: COLORS.textMuted,
  },
  customSaveButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.textWhite,
  },
});
