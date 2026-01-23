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
import * as FileSystem from 'expo-file-system/legacy';
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
  const [restoreModalVisible, setRestoreModalVisible] = useState(false);
  const [restoreText, setRestoreText] = useState('');

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

  // 데이터 백업 (자동 분기: 글자 수에 따라 카카오톡/파일 선택)
  const handleBackup = async () => {
    try {
      const data = await exportAllData();
      const jsonString = JSON.stringify(data, null, 2);

      const practiceCount = data.data?.practices?.length || 0;
      const screenCount = data.data?.screenRounds?.length || 0;
      const fieldCount = data.data?.fieldRounds?.length || 0;
      const totalCount = practiceCount + screenCount + fieldCount;

      // 글자 수 체크 (카카오톡 제한: 약 7만자, 안전하게 5만자로 설정)
      const MAX_KAKAO_LENGTH = 50000;

      if (jsonString.length <= MAX_KAKAO_LENGTH) {
        // 10,000자 이하: 카카오톡으로 바로 전송
        await Share.share({
          message: jsonString,
          title: `골프다이어리 백업`,
        });
      } else {
        // 10,000자 초과: 파일로 저장 후 안내
        Alert.alert(
          '📁 기록이 많습니다!',
          `총 ${totalCount}개의 기록이 있어서\n파일로 백업합니다.\n\n[확인]을 누르면 공유 화면이 나옵니다.\n\n👉 카카오톡 → 나와의 채팅\n👉 또는 삼성노트, 메모장 앱 추천!`,
          [
            { text: '취소', style: 'cancel' },
            { text: '확인', onPress: () => saveAndShareFile(jsonString, practiceCount, screenCount, fieldCount) }
          ]
        );
      }
    } catch (error) {
      console.error('백업 실패:', error);
      Alert.alert('백업 오류', '백업 중 오류가 발생했습니다.');
    }
  };

  // 파일 저장 후 공유
  const saveAndShareFile = async (jsonString, practiceCount, screenCount, fieldCount) => {
    try {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const day = now.getDate();
      const fileName = `골프다이어리_백업_${year}년${month}월${day}일.txt`;
      const filePath = `${FileSystem.documentDirectory}${fileName}`;

      const existingFile = await FileSystem.getInfoAsync(filePath);
      if (existingFile.exists) {
        await FileSystem.deleteAsync(filePath);
      }

      await FileSystem.writeAsStringAsync(filePath, jsonString);

      const fileInfo = await FileSystem.getInfoAsync(filePath);
      if (!fileInfo.exists) {
        Alert.alert('오류', '백업 파일 생성에 실패했습니다.');
        return;
      }

      const isAvailable = await Sharing.isAvailableAsync();
      if (isAvailable) {
        await Sharing.shareAsync(filePath, {
          mimeType: 'text/plain',
          dialogTitle: `골프다이어리 백업 (연습${practiceCount}, 스크린${screenCount}, 필드${fieldCount})`,
          UTI: 'public.plain-text',
        });
      } else {
        Alert.alert('오류', '파일 공유 기능을 사용할 수 없습니다.');
      }
    } catch (error) {
      console.error('파일 저장 실패:', error);
      Alert.alert('백업 오류', '파일 저장 중 오류가 발생했습니다.');
    }
  };

  // 데이터 복원 (복사-붙여넣기 방식)
  const handleRestore = () => {
    setRestoreText('');
    setRestoreModalVisible(true);
  };

  // 파일에서 불러오기
  const handleRestoreFromFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'text/plain',
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        return;
      }

      const file = result.assets[0];
      const fileContent = await FileSystem.readAsStringAsync(file.uri);

      // JSON 파싱 시도
      const backupData = JSON.parse(fileContent);

      // 데이터 유효성 검사
      if (!backupData.data && !backupData.practices) {
        Alert.alert('오류', '올바른 백업 데이터가 아닙니다.');
        return;
      }

      const importResult = await importAllData(backupData);
      if (importResult.success) {
        setRestoreModalVisible(false);
        Alert.alert('완료', '데이터가 복원되었습니다.\n앱을 다시 시작해주세요.');
        loadData();
      } else {
        Alert.alert('오류', importResult.error || '복원에 실패했습니다.');
      }
    } catch (error) {
      console.error('파일 복원 실패:', error);
      Alert.alert('오류', '파일을 읽을 수 없거나 데이터 형식이 올바르지 않습니다.');
    }
  };

  // 복원 실행 (복사-붙여넣기 방식)
  const executeRestore = async () => {
    if (!restoreText.trim()) {
      Alert.alert('알림', '백업 데이터를 붙여넣기 해주세요.');
      return;
    }

    try {
      const backupData = JSON.parse(restoreText.trim());

      // 데이터 유효성 검사
      if (!backupData.data && !backupData.practices) {
        Alert.alert('오류', '올바른 백업 데이터가 아닙니다.');
        return;
      }

      const importResult = await importAllData(backupData);
      if (importResult.success) {
        setRestoreModalVisible(false);
        setRestoreText('');
        Alert.alert('완료', '데이터가 복원되었습니다.\n앱을 다시 시작해주세요.');
        loadData();
      } else {
        Alert.alert('오류', importResult.error || '복원에 실패했습니다.');
      }
    } catch (error) {
      console.error('복원 실패:', error);
      Alert.alert('오류', '데이터 형식이 올바르지 않습니다.\n백업 내용을 정확히 복사했는지 확인해주세요.');
    }
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
          <Text style={styles.appVersion}>버전 1.4.3</Text>
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

      {/* 백업/복원 가이드 모달 (상세 버전) */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={guideModalVisible}
        onRequestClose={() => setGuideModalVisible(false)}
      >
        <View style={styles.guideModalOverlay}>
          <View style={styles.guideModalContent}>
            <View style={styles.guideHeader}>
              <Text style={styles.guideTitle}>📱 백업/복원 사용법</Text>
              <TouchableOpacity onPress={() => setGuideModalVisible(false)}>
                <Text style={styles.guideCloseBtn}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.guideBody} showsVerticalScrollIndicator={false}>
              {/* 백업 가이드 */}
              <View style={styles.guideSection}>
                <Text style={styles.guideSectionTitle}>💾 백업하기</Text>
                <Text style={styles.guideNote}>버튼 하나로 자동 백업!</Text>
                <View style={styles.guideStep}>
                  <Text style={styles.guideStepNum}>1</Text>
                  <Text style={styles.guideStepText}>Golf Diary 앱에서{'\n'}설정 → <Text style={styles.guideBold}>"데이터 백업"</Text> 버튼을 누르세요</Text>
                </View>
                <View style={styles.guideStep}>
                  <Text style={styles.guideStepNum}>2</Text>
                  <Text style={styles.guideStepText}>공유 화면이 나타나면{'\n'}<Text style={styles.guideBold}>카카오톡 아이콘</Text>을 찾아서 누르세요</Text>
                </View>
                <View style={styles.guideStep}>
                  <Text style={styles.guideStepNum}>3</Text>
                  <Text style={styles.guideStepText}>보낼 상대 선택 화면에서{'\n'}<Text style={styles.guideBold}>"나와의 채팅"</Text>을 선택하세요</Text>
                </View>
                <View style={styles.guideStep}>
                  <Text style={styles.guideStepNum}>4</Text>
                  <Text style={styles.guideStepText}><Text style={styles.guideBold}>"확인"</Text> 또는 <Text style={styles.guideBold}>"보내기"</Text> 버튼을 누르세요</Text>
                </View>
                <View style={styles.guideStep}>
                  <Text style={styles.guideStepNum}>5</Text>
                  <Text style={styles.guideStepText}>카카오톡 나와의 채팅에 백업이 저장됩니다! ✅</Text>
                </View>
              </View>

              {/* 기록이 많을 때 안내 */}
              <View style={styles.guideTipBox}>
                <Text style={styles.guideTipTitle}>📁 기록이 많을 때</Text>
                <Text style={styles.guideTipText}>기록이 많으면 자동으로 파일로 백업됩니다.</Text>
                <Text style={styles.guideTipText}>"기록이 많습니다" 팝업이 나오면</Text>
                <Text style={styles.guideTipText}><Text style={styles.guideBold}>[확인]</Text> → <Text style={styles.guideBold}>카카오톡</Text> → <Text style={styles.guideBold}>나와의 채팅</Text></Text>
                <Text style={styles.guideTipText}></Text>
                <Text style={styles.guideTipText}>💡 <Text style={styles.guideBold}>삼성노트</Text> 또는 <Text style={styles.guideBold}>메모장 앱</Text>에</Text>
                <Text style={styles.guideTipText}>저장하는 것도 추천해요!</Text>
              </View>

              {/* 복원 가이드 - 파일 선택 */}
              <View style={styles.guideSection}>
                <Text style={styles.guideSectionTitle}>📂 복원하기 - 파일에서 불러오기 (추천)</Text>
                <Text style={styles.guideNote}>가장 쉽고 안전한 방법!</Text>
                <View style={styles.guideStep}>
                  <Text style={styles.guideStepNum}>1</Text>
                  <Text style={styles.guideStepText}>카카오톡에서 받은 백업 파일을{'\n'}<Text style={styles.guideBold}>휴대폰에 저장</Text>하세요{'\n'}(파일을 길게 누르면 저장 메뉴가 나와요)</Text>
                </View>
                <View style={styles.guideStep}>
                  <Text style={styles.guideStepNum}>2</Text>
                  <Text style={styles.guideStepText}>Golf Diary 앱에서{'\n'}설정 → <Text style={styles.guideBold}>"데이터 복원"</Text>을 누르세요</Text>
                </View>
                <View style={styles.guideStep}>
                  <Text style={styles.guideStepNum}>3</Text>
                  <Text style={styles.guideStepText}><Text style={styles.guideBold}>"파일에서 불러오기"</Text> 버튼을 누르세요</Text>
                </View>
                <View style={styles.guideStep}>
                  <Text style={styles.guideStepNum}>4</Text>
                  <Text style={styles.guideStepText}>저장했던 <Text style={styles.guideBold}>골프다이어리_백업_날짜.txt</Text> 파일을 선택하세요</Text>
                </View>
                <View style={styles.guideStep}>
                  <Text style={styles.guideStepNum}>5</Text>
                  <Text style={styles.guideStepText}><Text style={styles.guideBold}>"복원 완료"</Text> 메시지가 나오면 성공!</Text>
                </View>
              </View>

              {/* 복원 가이드 - 복사 붙여넣기 */}
              <View style={styles.guideSection}>
                <Text style={styles.guideSectionTitle}>📋 복원하기 - 복사 붙여넣기</Text>
                <Text style={styles.guideNote}>카카오톡 간편 백업을 사용한 경우</Text>
                <View style={styles.guideStep}>
                  <Text style={styles.guideStepNum}>1</Text>
                  <Text style={styles.guideStepText}>카카오톡 → <Text style={styles.guideBold}>나와의 채팅</Text>을 열어주세요</Text>
                </View>
                <View style={styles.guideStep}>
                  <Text style={styles.guideStepNum}>2</Text>
                  <Text style={styles.guideStepText}>백업했던 메시지를 <Text style={styles.guideBold}>길게 눌러서</Text>{'\n'}나온 메뉴에서 <Text style={styles.guideBold}>"복사"</Text>를 선택하세요</Text>
                </View>
                <View style={styles.guideStep}>
                  <Text style={styles.guideStepNum}>3</Text>
                  <Text style={styles.guideStepText}>Golf Diary 앱 → 설정 → <Text style={styles.guideBold}>"데이터 복원"</Text></Text>
                </View>
                <View style={styles.guideStep}>
                  <Text style={styles.guideStepNum}>4</Text>
                  <Text style={styles.guideStepText}>입력창을 <Text style={styles.guideBold}>길게 눌러서 "붙여넣기"</Text> 하세요</Text>
                </View>
                <View style={styles.guideStep}>
                  <Text style={styles.guideStepNum}>5</Text>
                  <Text style={styles.guideStepText}><Text style={styles.guideBold}>"붙여넣기로 복원"</Text> 버튼을 누르세요</Text>
                </View>
              </View>

              {/* 주의사항 */}
              <View style={styles.guideWarningBox}>
                <Text style={styles.guideWarningTitle}>⚠️ 주의사항</Text>
                <Text style={styles.guideWarningText}>• 복원하면 현재 데이터가 백업 데이터로 바뀝니다</Text>
                <Text style={styles.guideWarningText}>• 복원 전에 현재 데이터도 백업해두세요!</Text>
                <Text style={styles.guideWarningText}>• 복원 후 앱을 껐다 다시 켜주세요</Text>
              </View>

              {/* 팁 */}
              <View style={styles.guideTipBox}>
                <Text style={styles.guideTipTitle}>💡 꿀팁</Text>
                <Text style={styles.guideTipText}>• 중요한 기록은 <Text style={styles.guideBold}>매달 1번씩</Text> 백업하세요</Text>
                <Text style={styles.guideTipText}>• 휴대폰 바꾸기 전에 <Text style={styles.guideBold}>꼭 백업</Text>하세요</Text>
                <Text style={styles.guideTipText}>• 백업은 <Text style={styles.guideBold}>이메일</Text>로도 보낼 수 있어요</Text>
                <Text style={styles.guideTipText}>• 기록이 많아도 <Text style={styles.guideBold}>자동으로</Text> 처리됩니다!</Text>
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

      {/* 데이터 복원 모달 (2가지 선택) */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={restoreModalVisible}
        onRequestClose={() => setRestoreModalVisible(false)}
      >
        <View style={styles.restoreModalOverlay}>
          <View style={styles.restoreModalContent}>
            <View style={styles.restoreHeader}>
              <Text style={styles.restoreTitle}>📥 데이터 복원</Text>
              <TouchableOpacity onPress={() => setRestoreModalVisible(false)}>
                <Text style={styles.restoreCloseBtn}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* 방법 1: 파일에서 불러오기 (추천) */}
            <TouchableOpacity
              style={styles.restoreMethodCard}
              onPress={handleRestoreFromFile}
            >
              <View style={styles.restoreMethodIcon}>
                <Text style={styles.restoreMethodIconText}>📂</Text>
              </View>
              <View style={styles.restoreMethodInfo}>
                <Text style={styles.restoreMethodTitle}>파일에서 불러오기 (추천)</Text>
                <Text style={styles.restoreMethodDesc}>백업 파일을 직접 선택해서 복원</Text>
              </View>
              <Text style={styles.restoreMethodArrow}>›</Text>
            </TouchableOpacity>

            {/* 구분선 */}
            <View style={styles.restoreMethodDivider}>
              <View style={styles.restoreMethodDividerLine} />
              <Text style={styles.restoreMethodDividerText}>또는</Text>
              <View style={styles.restoreMethodDividerLine} />
            </View>

            {/* 방법 2: 복사-붙여넣기 */}
            <Text style={styles.restoreDesc}>
              카카오톡에서 백업 내용을 복사한 후 붙여넣기
            </Text>

            <TextInput
              style={styles.restoreInput}
              placeholder={'백업 데이터를 여기에 붙여넣기...'}
              placeholderTextColor={COLORS.textMuted}
              value={restoreText}
              onChangeText={setRestoreText}
              multiline={true}
              textAlignVertical="top"
            />

            <View style={styles.restoreButtons}>
              <TouchableOpacity
                style={[styles.restoreButton, styles.restoreButtonCancel]}
                onPress={() => {
                  setRestoreModalVisible(false);
                  setRestoreText('');
                }}
              >
                <Text style={styles.restoreButtonTextCancel}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.restoreButton, styles.restoreButtonConfirm]}
                onPress={executeRestore}
              >
                <Text style={styles.restoreButtonTextConfirm}>붙여넣기로 복원</Text>
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
  // 복원 모달 스타일
  restoreModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  restoreModalContent: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    padding: 20,
    width: '100%',
    maxHeight: '80%',
  },
  restoreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  restoreTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  restoreCloseBtn: {
    fontSize: 20,
    color: COLORS.textMuted,
    padding: 4,
  },
  restoreDesc: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  restoreInput: {
    backgroundColor: COLORS.backgroundGray,
    borderRadius: 12,
    padding: 16,
    fontSize: 13,
    color: COLORS.textPrimary,
    minHeight: 200,
    maxHeight: 300,
    borderWidth: 1,
    borderColor: COLORS.divider,
    fontFamily: 'monospace',
  },
  restoreButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  restoreButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  restoreButtonCancel: {
    backgroundColor: COLORS.backgroundGray,
  },
  restoreButtonConfirm: {
    backgroundColor: COLORS.primary,
  },
  restoreButtonTextCancel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  restoreButtonTextConfirm: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textWhite,
  },
  // 복원 방법 선택 카드 스타일
  restoreMethodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary + '10',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: COLORS.primary,
    marginBottom: 16,
  },
  restoreMethodIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  restoreMethodIconText: {
    fontSize: 22,
  },
  restoreMethodInfo: {
    flex: 1,
    marginLeft: 14,
  },
  restoreMethodTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
  },
  restoreMethodDesc: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  restoreMethodArrow: {
    fontSize: 24,
    color: COLORS.primary,
  },
  restoreMethodDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  restoreMethodDividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.divider,
  },
  restoreMethodDividerText: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginHorizontal: 12,
  },
  // 백업 모달 스타일
  backupModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  backupModalContent: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    padding: 20,
    width: '100%',
  },
  backupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  backupTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  backupCloseBtn: {
    fontSize: 20,
    color: COLORS.textMuted,
    padding: 4,
  },
  backupSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 16,
  },
  backupMethodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE500' + '15',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#FEE500',
    marginBottom: 12,
  },
  backupMethodCardFile: {
    backgroundColor: COLORS.primary + '10',
    borderColor: COLORS.primary,
  },
  backupMethodIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backupMethodIconText: {
    fontSize: 24,
  },
  backupMethodInfo: {
    flex: 1,
    marginLeft: 14,
  },
  backupMethodTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backupMethodTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#B8860B',
  },
  backupMethodBadge: {
    backgroundColor: '#FEE500' + '40',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 8,
  },
  backupMethodBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#B8860B',
  },
  backupMethodDesc: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 4,
    lineHeight: 18,
  },
  backupMethodArrow: {
    fontSize: 24,
    color: '#B8860B',
  },
  backupCancelButton: {
    backgroundColor: COLORS.backgroundGray,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 4,
  },
  backupCancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  // 가이드 추가 스타일
  guideNote: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginBottom: 12,
    fontStyle: 'italic',
  },
  guideBold: {
    fontWeight: '700',
    color: COLORS.primary,
  },
  guideWarningBox: {
    backgroundColor: '#FF6B6B' + '15',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B6B',
    marginBottom: 16,
  },
  guideWarningTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FF6B6B',
    marginBottom: 10,
  },
  guideWarningText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
});
