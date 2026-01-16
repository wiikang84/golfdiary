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
} from 'react-native';
import { COLORS, SHADOWS } from '../theme/premium';
import { loadUserProfile, saveUserProfile, calculateLevel, getLevelTitle } from '../utils/storage';
import { saveOCRConfig, loadOCRConfig } from '../utils/ocrService';

export default function SettingsScreen() {
  const [nickname, setNickname] = useState('골퍼');
  const [levelInfo, setLevelInfo] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [tempNickname, setTempNickname] = useState('');

  // OCR 설정 상태
  const [ocrModalVisible, setOcrModalVisible] = useState(false);
  const [ocrConfig, setOcrConfig] = useState({ apiKey: '' });
  const [tempOcrConfig, setTempOcrConfig] = useState({ apiKey: '' });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const profile = await loadUserProfile();
    const level = await calculateLevel();
    setNickname(profile.nickname || '골퍼');
    setLevelInfo(level);

    // OCR 설정 불러오기
    const savedOcrConfig = await loadOCRConfig();
    if (savedOcrConfig) {
      setOcrConfig(savedOcrConfig);
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

  const handleComingSoon = () => {
    Alert.alert('준비 중', '곧 추가될 기능입니다!');
  };

  // OCR 설정 편집
  const handleEditOCR = () => {
    setTempOcrConfig(ocrConfig);
    setOcrModalVisible(true);
  };

  // OCR 설정 저장
  const handleSaveOCR = async () => {
    if (!tempOcrConfig.apiKey.trim()) {
      Alert.alert('알림', 'Google API 키를 입력해주세요.');
      return;
    }
    const success = await saveOCRConfig(tempOcrConfig);
    if (success) {
      setOcrConfig(tempOcrConfig);
      setOcrModalVisible(false);
      Alert.alert('저장 완료', 'OCR API 설정이 저장되었습니다.');
    } else {
      Alert.alert('오류', '설정 저장에 실패했습니다.');
    }
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

        {/* OCR 설정 섹션 */}
        <Text style={styles.sectionTitle}>스코어카드 인식 (OCR)</Text>
        <View style={styles.menuCard}>
          <TouchableOpacity style={styles.menuItem} onPress={handleEditOCR}>
            <View style={[styles.menuIcon, { backgroundColor: '#4285F4' + '20' }]}>
              <Text style={styles.menuIconText}>📸</Text>
            </View>
            <View style={styles.menuText}>
              <Text style={styles.menuTitle}>Google Vision OCR 설정</Text>
              <Text style={styles.menuDesc}>
                {ocrConfig.apiKey ? '설정 완료 (월 1,000건 무료)' : 'API 키 설정 필요'}
              </Text>
            </View>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* 메뉴 섹션 */}
        <Text style={styles.sectionTitle}>데이터 관리</Text>
        <View style={styles.menuCard}>
          <TouchableOpacity style={styles.menuItem} onPress={handleComingSoon}>
            <View style={[styles.menuIcon, { backgroundColor: COLORS.info + '20' }]}>
              <Text style={styles.menuIconText}>💾</Text>
            </View>
            <View style={styles.menuText}>
              <Text style={styles.menuTitle}>데이터 백업</Text>
              <Text style={styles.menuDesc}>클라우드에 백업하기</Text>
            </View>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          <TouchableOpacity style={styles.menuItem} onPress={handleComingSoon}>
            <View style={[styles.menuIcon, { backgroundColor: COLORS.primary + '20' }]}>
              <Text style={styles.menuIconText}>📥</Text>
            </View>
            <View style={styles.menuText}>
              <Text style={styles.menuTitle}>데이터 복원</Text>
              <Text style={styles.menuDesc}>백업에서 복원하기</Text>
            </View>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          <TouchableOpacity style={styles.menuItem} onPress={handleComingSoon}>
            <View style={[styles.menuIcon, { backgroundColor: COLORS.gold + '20' }]}>
              <Text style={styles.menuIconText}>📤</Text>
            </View>
            <View style={styles.menuText}>
              <Text style={styles.menuTitle}>CSV 내보내기</Text>
              <Text style={styles.menuDesc}>엑셀 파일로 저장</Text>
            </View>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* 개발 로드맵 */}
        <Text style={styles.sectionTitle}>개발 로드맵</Text>
        <View style={styles.roadmapCard}>
          <View style={styles.roadmapItem}>
            <View style={[styles.roadmapCheck, styles.roadmapCheckDone]}>
              <Text style={styles.roadmapCheckText}>✓</Text>
            </View>
            <Text style={styles.roadmapText}>기본 기록 기능</Text>
          </View>
          <View style={styles.roadmapItem}>
            <View style={styles.roadmapCheck}>
              <Text style={styles.roadmapCheckText}>-</Text>
            </View>
            <Text style={styles.roadmapTextPending}>이미지 첨부</Text>
          </View>
          <View style={styles.roadmapItem}>
            <View style={styles.roadmapCheck}>
              <Text style={styles.roadmapCheckText}>-</Text>
            </View>
            <Text style={styles.roadmapTextPending}>장비 관리</Text>
          </View>
          <View style={styles.roadmapItem}>
            <View style={styles.roadmapCheck}>
              <Text style={styles.roadmapCheckText}>-</Text>
            </View>
            <Text style={styles.roadmapTextPending}>목표 설정</Text>
          </View>
          <View style={styles.roadmapItem}>
            <View style={styles.roadmapCheck}>
              <Text style={styles.roadmapCheckText}>-</Text>
            </View>
            <Text style={styles.roadmapTextPending}>클라우드 백업</Text>
          </View>
        </View>

        {/* 앱 정보 */}
        <View style={styles.appInfoCard}>
          <Text style={styles.appName}>⛳ Golf Diary</Text>
          <Text style={styles.appVersion}>버전 1.0.0</Text>
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

      {/* OCR 설정 모달 */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={ocrModalVisible}
        onRequestClose={() => setOcrModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Google Vision OCR 설정</Text>
            <Text style={styles.ocrHelpText}>
              Google Cloud Console에서 Vision API를 활성화하고{'\n'}
              API 키를 생성하여 입력해주세요.{'\n'}
              (월 1,000건 무료)
            </Text>
            <Text style={styles.inputLabelSmall}>Google API Key</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="AIza..."
              placeholderTextColor={COLORS.textMuted}
              value={tempOcrConfig.apiKey}
              onChangeText={(text) => setTempOcrConfig({ ...tempOcrConfig, apiKey: text })}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={() => setOcrModalVisible(false)}
              >
                <Text style={styles.modalButtonTextCancel}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonSave]}
                onPress={handleSaveOCR}
              >
                <Text style={styles.modalButtonTextSave}>저장</Text>
              </TouchableOpacity>
            </View>
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
  roadmapCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 20,
    ...SHADOWS.small,
  },
  roadmapItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  roadmapCheck: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.backgroundGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  roadmapCheckDone: {
    backgroundColor: COLORS.primary,
  },
  roadmapCheckText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textWhite,
  },
  roadmapText: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
  roadmapTextPending: {
    fontSize: 15,
    color: COLORS.textMuted,
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
  ocrHelpText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  inputLabelSmall: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
});
