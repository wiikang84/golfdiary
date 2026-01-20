import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  TextInput,
  Share,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';
import { COLORS, SHADOWS } from '../theme/premium';
import {
  loadUserProfile,
  saveUserProfile,
  calculateLevel,
  getLevelTitle,
  exportAllData,
  importAllData,
  loadPractices,
  loadScreenRounds,
  loadFieldRounds,
} from '../utils/storage';

export default function SettingsScreen() {
  const [nickname, setNickname] = useState('골퍼');
  const [levelInfo, setLevelInfo] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [tempNickname, setTempNickname] = useState('');
  const [journey, setJourney] = useState(null);
  const [guideModalVisible, setGuideModalVisible] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const profile = await loadUserProfile();
    const level = await calculateLevel();
    setNickname(profile.nickname || '골퍼');
    setLevelInfo(level);

    // 골프 여정 데이터 로드
    const practices = await loadPractices();
    const screenRounds = await loadScreenRounds();
    const fieldRounds = await loadFieldRounds();

    const allRecords = [
      ...practices.map(p => ({ ...p, type: 'practice' })),
      ...screenRounds.map(r => ({ ...r, type: 'screen' })),
      ...fieldRounds.map(r => ({ ...r, type: 'field' })),
    ].sort((a, b) => a.id - b.id);

    if (allRecords.length > 0) {
      const firstRecord = allRecords[0];
      const lastRecord = allRecords[allRecords.length - 1];
      setJourney({
        firstDate: firstRecord.date,
        firstType: firstRecord.type,
        totalDays: Math.ceil((Date.now() - firstRecord.id) / (1000 * 60 * 60 * 24)),
        totalRecords: allRecords.length,
        practiceCount: practices.length,
        screenCount: screenRounds.length,
        fieldCount: fieldRounds.length,
      });
    }
  };

  const handleEditProfile = () => {
    setTempNickname(nickname);
    setEditModalVisible(true);
  };

  const handleSaveProfile = async () => {
    if (tempNickname.trim().length === 0) {
      Alert.alert('알림', '닉네임을 입력해주세요.');
      return;
    }
    if (tempNickname.trim().length > 10) {
      Alert.alert('알림', '닉네임은 10자 이내로 입력해주세요.');
      return;
    }
    await saveUserProfile({ nickname: tempNickname.trim() });
    setNickname(tempNickname.trim());
    setEditModalVisible(false);
    Alert.alert('저장 완료', '닉네임이 변경되었습니다.');
  };

  // 데이터 백업 (JSON 파일 공유)
  const handleBackup = async () => {
    try {
      const data = await exportAllData();
      const fileName = `golf-diary-backup-${new Date().toISOString().slice(0, 10)}.json`;
      const filePath = `${FileSystem.cacheDirectory}${fileName}`;

      await FileSystem.writeAsStringAsync(filePath, JSON.stringify(data, null, 2));

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(filePath, {
          mimeType: 'application/json',
          dialogTitle: 'Golf Diary 백업 파일',
        });
      } else {
        Alert.alert('오류', '공유 기능을 사용할 수 없습니다.');
      }
    } catch (error) {
      console.error('백업 실패:', error);
      Alert.alert('오류', '백업 중 오류가 발생했습니다.');
    }
  };

  // 데이터 복원
  const handleRestore = async () => {
    Alert.alert(
      '데이터 복원',
      '백업 파일에서 데이터를 복원하시겠습니까?\n기존 데이터가 덮어씌워집니다.',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '파일 선택',
          onPress: async () => {
            try {
              const result = await DocumentPicker.getDocumentAsync({
                type: 'application/json',
                copyToCacheDirectory: true,
              });

              if (result.canceled) return;

              const fileContent = await FileSystem.readAsStringAsync(result.assets[0].uri);
              const backupData = JSON.parse(fileContent);

              const importResult = await importAllData(backupData);
              if (importResult.success) {
                Alert.alert('완료', '데이터가 복원되었습니다.\n앱을 다시 시작해주세요.');
                loadData();
              } else {
                Alert.alert('오류', importResult.error || '복원에 실패했습니다.');
              }
            } catch (error) {
              console.error('복원 실패:', error);
              Alert.alert('오류', '파일을 읽는 중 오류가 발생했습니다.');
            }
          },
        },
      ]
    );
  };

  const handleComingSoon = () => {
    Alert.alert('준비 중', '곧 추가될 기능입니다!');
  };

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>설정</Text>
        <Text style={styles.headerSub}>앱 설정 및 정보</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* 프로필 섹션 */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>🏌️</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{nickname}</Text>
            <Text style={styles.profileLevel}>
              LV. {levelInfo?.level || 1} {getLevelTitle(levelInfo?.level || 1)}
            </Text>
          </View>
          <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
            <Text style={styles.editButtonText}>수정</Text>
          </TouchableOpacity>
        </View>

        {/* 메뉴 섹션 */}
        <Text style={styles.sectionTitle}>데이터 관리</Text>
        <View style={styles.menuCard}>
          <TouchableOpacity style={styles.menuItem} onPress={handleBackup}>
            <View style={[styles.menuIcon, { backgroundColor: COLORS.info + '20' }]}>
              <Text style={styles.menuIconText}>💾</Text>
            </View>
            <View style={styles.menuText}>
              <Text style={styles.menuTitle}>데이터 백업</Text>
              <Text style={styles.menuDesc}>카카오톡/이메일로 백업 파일 전송</Text>
            </View>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          <TouchableOpacity style={styles.menuItem} onPress={handleRestore}>
            <View style={[styles.menuIcon, { backgroundColor: COLORS.primary + '20' }]}>
              <Text style={styles.menuIconText}>📥</Text>
            </View>
            <View style={styles.menuText}>
              <Text style={styles.menuTitle}>데이터 복원</Text>
              <Text style={styles.menuDesc}>백업 파일에서 복원하기</Text>
            </View>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          <TouchableOpacity style={styles.menuItem} onPress={() => setGuideModalVisible(true)}>
            <View style={[styles.menuIcon, { backgroundColor: COLORS.gold + '20' }]}>
              <Text style={styles.menuIconText}>📖</Text>
            </View>
            <View style={styles.menuText}>
              <Text style={styles.menuTitle}>백업/복원 가이드</Text>
              <Text style={styles.menuDesc}>휴대폰 교체 시 데이터 이전 방법</Text>
            </View>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* 나의 골프 여정 */}
        <Text style={styles.sectionTitle}>나의 골프 여정</Text>
        <View style={styles.journeyCard}>
          {journey ? (
            <>
              <View style={styles.journeyHeader}>
                <Text style={styles.journeyEmoji}>⛳</Text>
                <Text style={styles.journeyTitle}>Golf Diary와 함께한 여정</Text>
              </View>
              <View style={styles.journeyStats}>
                <View style={styles.journeyStat}>
                  <Text style={styles.journeyStatValue}>{journey.totalDays}</Text>
                  <Text style={styles.journeyStatLabel}>일째</Text>
                </View>
                <View style={styles.journeyDivider} />
                <View style={styles.journeyStat}>
                  <Text style={styles.journeyStatValue}>{journey.totalRecords}</Text>
                  <Text style={styles.journeyStatLabel}>총 기록</Text>
                </View>
              </View>
              <View style={styles.journeyDetails}>
                <View style={styles.journeyDetail}>
                  <Text style={styles.journeyDetailIcon}>🎯</Text>
                  <Text style={styles.journeyDetailText}>연습 {journey.practiceCount}회</Text>
                </View>
                <View style={styles.journeyDetail}>
                  <Text style={styles.journeyDetailIcon}>🖥️</Text>
                  <Text style={styles.journeyDetailText}>스크린 {journey.screenCount}회</Text>
                </View>
                <View style={styles.journeyDetail}>
                  <Text style={styles.journeyDetailIcon}>🌿</Text>
                  <Text style={styles.journeyDetailText}>필드 {journey.fieldCount}회</Text>
                </View>
              </View>
              <Text style={styles.journeyFirstRecord}>
                첫 기록: {journey.firstDate}
              </Text>
            </>
          ) : (
            <View style={styles.journeyEmpty}>
              <Text style={styles.journeyEmptyIcon}>🏌️</Text>
              <Text style={styles.journeyEmptyText}>아직 기록이 없어요</Text>
              <Text style={styles.journeyEmptySubText}>첫 기록을 추가하고 여정을 시작하세요!</Text>
            </View>
          )}
        </View>

        {/* 앱 정보 */}
        <View style={styles.appInfoCard}>
          <Text style={styles.appName}>⛳ Golf Diary</Text>
          <Text style={styles.appVersion}>버전 1.3.0</Text>
          <Text style={styles.appDev}>Made by 빛나아빠</Text>
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>

      {/* 닉네임 수정 모달 */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>닉네임 변경</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="닉네임 입력 (최대 10자)"
              placeholderTextColor={COLORS.textMuted}
              value={tempNickname}
              onChangeText={setTempNickname}
              maxLength={10}
              autoFocus
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={styles.modalButtonTextCancel}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonSave]}
                onPress={handleSaveProfile}
              >
                <Text style={styles.modalButtonTextSave}>저장</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* 백업/복원 가이드 모달 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={guideModalVisible}
        onRequestClose={() => setGuideModalVisible(false)}
      >
        <View style={styles.guideModalOverlay}>
          <View style={styles.guideModalContent}>
            <View style={styles.guideHeader}>
              <Text style={styles.guideTitle}>📱 휴대폰 교체 시 데이터 이전 방법</Text>
              <TouchableOpacity onPress={() => setGuideModalVisible(false)}>
                <Text style={styles.guideCloseBtn}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.guideBody} showsVerticalScrollIndicator={false}>
              {/* 백업 가이드 */}
              <View style={styles.guideSection}>
                <Text style={styles.guideSectionTitle}>💾 STEP 1. 기존 폰에서 백업하기</Text>
                <View style={styles.guideStep}>
                  <Text style={styles.guideStepNum}>1</Text>
                  <Text style={styles.guideStepText}>설정 → "데이터 백업" 버튼을 누릅니다</Text>
                </View>
                <View style={styles.guideStep}>
                  <Text style={styles.guideStepNum}>2</Text>
                  <Text style={styles.guideStepText}>공유 화면에서 "카카오톡"을 선택합니다</Text>
                </View>
                <View style={styles.guideStep}>
                  <Text style={styles.guideStepNum}>3</Text>
                  <Text style={styles.guideStepText}>"나에게 보내기" 또는 "나와의 채팅"을 선택합니다</Text>
                </View>
                <View style={styles.guideStep}>
                  <Text style={styles.guideStepNum}>4</Text>
                  <Text style={styles.guideStepText}>백업 파일이 카카오톡으로 전송됩니다!</Text>
                </View>
              </View>

              {/* 복원 가이드 */}
              <View style={styles.guideSection}>
                <Text style={styles.guideSectionTitle}>📥 STEP 2. 새 폰에서 복원하기</Text>
                <View style={styles.guideStep}>
                  <Text style={styles.guideStepNum}>1</Text>
                  <Text style={styles.guideStepText}>새 폰에 Golf Diary 앱을 설치합니다</Text>
                </View>
                <View style={styles.guideStep}>
                  <Text style={styles.guideStepNum}>2</Text>
                  <Text style={styles.guideStepText}>카카오톡에서 백업 파일을 찾아 다운로드합니다</Text>
                </View>
                <View style={styles.guideStep}>
                  <Text style={styles.guideStepNum}>3</Text>
                  <Text style={styles.guideStepText}>Golf Diary 앱 → 설정 → "데이터 복원"을 누릅니다</Text>
                </View>
                <View style={styles.guideStep}>
                  <Text style={styles.guideStepNum}>4</Text>
                  <Text style={styles.guideStepText}>다운로드한 백업 파일을 선택하면 완료!</Text>
                </View>
              </View>

              {/* 팁 */}
              <View style={styles.guideTipBox}>
                <Text style={styles.guideTipTitle}>💡 꿀팁</Text>
                <Text style={styles.guideTipText}>• 이메일로 자신에게 보내도 됩니다</Text>
                <Text style={styles.guideTipText}>• Google 드라이브에 저장해도 됩니다</Text>
                <Text style={styles.guideTipText}>• 백업 파일은 작아서 전송이 빠릅니다</Text>
                <Text style={styles.guideTipText}>• 정기적으로 백업하면 안전합니다!</Text>
              </View>

              <View style={{ height: 20 }} />
            </ScrollView>

            <TouchableOpacity
              style={styles.guideCloseButton}
              onPress={() => setGuideModalVisible(false)}
            >
              <Text style={styles.guideCloseButtonText}>확인</Text>
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
    backgroundColor: COLORS.textPrimary,
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
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: -8,
  },
  profileCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 32,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  profileLevel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.backgroundGray,
    borderRadius: 8,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginTop: 28,
    marginBottom: 12,
    marginLeft: 4,
  },
  menuCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    ...SHADOWS.small,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  menuDivider: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginLeft: 72,
  },
  menuIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIconText: {
    fontSize: 22,
  },
  menuText: {
    flex: 1,
    marginLeft: 14,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
  menuDesc: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  menuArrow: {
    fontSize: 24,
    color: COLORS.textMuted,
  },
  journeyCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 20,
    ...SHADOWS.small,
  },
  journeyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  journeyEmoji: {
    fontSize: 28,
    marginRight: 10,
  },
  journeyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  journeyStats: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary + '10',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  journeyStat: {
    flex: 1,
    alignItems: 'center',
  },
  journeyStatValue: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.primary,
  },
  journeyStatLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  journeyDivider: {
    width: 1,
    backgroundColor: COLORS.divider,
  },
  journeyDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  journeyDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  journeyDetailIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  journeyDetailText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  journeyFirstRecord: {
    fontSize: 13,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
  journeyEmpty: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  journeyEmptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  journeyEmptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  journeyEmptySubText: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginTop: 4,
  },
  appInfoCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    padding: 24,
    marginTop: 28,
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  appName: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textWhite,
  },
  appVersion: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 8,
  },
  appDev: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 4,
  },
  bottomSpace: {
    height: 40,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    padding: 24,
    width: '85%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalInput: {
    backgroundColor: COLORS.backgroundGray,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: COLORS.textPrimary,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalButtonCancel: {
    backgroundColor: COLORS.backgroundGray,
  },
  modalButtonSave: {
    backgroundColor: COLORS.primary,
  },
  modalButtonTextCancel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  modalButtonTextSave: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textWhite,
  },
  // 가이드 모달 스타일
  guideModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  guideModalContent: {
    backgroundColor: COLORS.cardBg,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '85%',
  },
  guideHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  guideTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
    flex: 1,
  },
  guideCloseBtn: {
    fontSize: 20,
    color: COLORS.textMuted,
    padding: 4,
  },
  guideBody: {
    padding: 20,
  },
  guideSection: {
    marginBottom: 24,
  },
  guideSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 16,
  },
  guideStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  guideStepNum: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    color: COLORS.textWhite,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 24,
    marginRight: 12,
    overflow: 'hidden',
  },
  guideStepText: {
    flex: 1,
    fontSize: 15,
    color: COLORS.textPrimary,
    lineHeight: 22,
  },
  guideTipBox: {
    backgroundColor: COLORS.gold + '15',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.gold,
  },
  guideTipTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 10,
  },
  guideTipText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  guideCloseButton: {
    backgroundColor: COLORS.primary,
    margin: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  guideCloseButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textWhite,
  },
});
