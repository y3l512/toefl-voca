# 🚀 Vercel 배포 및 Firebase DB 영구 무료 연동 가이드

본 단어장 앱은 **Vercel**을 통해 무료로 배포하고, **Google Firebase Firestore**를 연동하여 컴퓨터와 핸드폰 어디서든 접속만 하면 **자동으로 DB에 연동**되도록 설계되었습니다.

> ✨ **장점**: 기존 Supabase와 달리 **미접속 시 일시정지(Pause)되는 일이 없으며, 365일 24시간 항시 가동되는 영구 무료 클라우드**입니다.

---

## 1단계: Firebase 설정 완료 상태 (설정 불필요)

이미 `firebase-config.js`에 발급받으신 Firebase 설정이 기본 내장되어 있습니다:
- **프로젝트 ID**: `toefl-5be18`
- **데이터베이스**: Google Cloud Firestore (asia-northeast3 서울)
- **동기화 컬렉션**: `voca_sync/main`

컴퓨터나 핸드폰 등 어떤 기기에서 접속하더라도 **로그인이나 추가 설정 없이 자동으로 연결**됩니다.

---

## 2단계: Vercel로 원클릭 배포하기

### 방법 A: Vercel CLI로 바로 배포하기 (터미널)
터미널에서 아래 명령어를 입력하여 즉시 배포할 수 있습니다:

```bash
npx vercel --prod
```

### 방법 B: GitHub 연동 배포
1. 코드를 GitHub 저장소(Repository)에 push 합니다.
2. [Vercel Dashboard](https://vercel.com/dashboard)에서 **Add New Project** -> GitHub 저장소를 선택하고 **Deploy**를 누릅니다.

---

## 3단계: 기기 간 실시간 동기화 확인

1. 배포된 Vercel URL(또는 `http://localhost:8099`)로 PC와 스마트폰에서 접속합니다.
2. 상단 뱃지가 `🔥 Firebase 연결됨`으로 표시됩니다.
3. PC에서 찜하기(별표)를 누르거나 암기 완료 처리를 하면, 스마트폰 화면에서도 **새로고침 없이 실시간으로 동기화**됩니다! 🎉
