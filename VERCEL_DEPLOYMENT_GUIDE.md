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

### 방법 B: GitHub 연동 (집 컴퓨터 & 다른 PC에서 함께 관리 + 자동 배포)

1. **GitHub에 새 저장소(Repository) 만들기**
   - https://github.com/new 에 접속해 빈 저장소(예: `toefl-vocacards`)를 생성합니다 (README 체크 해제).
2. **현재 컴퓨터에서 GitHub로 업로드**
   ```bash
   git remote add origin https://github.com/<본인아이디>/<저장소이름>.git
   git push -u origin main
   ```
3. **집 컴퓨터에서 가져와서 작업하기**
   - 처음 한 번만 복제(clone):
     ```bash
     git clone https://github.com/<본인아이디>/<저장소이름>.git
     ```
   - 작업 시작 전 최신 코드 받기:
     ```bash
     git pull
     ```
   - 수정 후 올리기:
     ```bash
     git add .
     git commit -m "단어장 업데이트"
     git push
     ```
4. **Vercel과 GitHub 연결 (선택)**
   - [Vercel 프로젝트 설정 -> Git](https://vercel.com/dashboard)에서 위 GitHub 저장소를 연결해 두면, 어느 컴퓨터에서든 `git push`만 하면 **Vercel 사이트가 자동으로 재배포**됩니다.

---

## 3단계: 기기 간 실시간 동기화 확인

1. 배포된 Vercel URL(또는 `http://localhost:8099`)로 PC와 스마트폰에서 접속합니다.
2. 상단 뱃지가 `🔥 Firebase 연결됨`으로 표시됩니다.
3. PC에서 찜하기(별표)를 누르거나 암기 완료 처리를 하면, 스마트폰 화면에서도 **새로고침 없이 실시간으로 동기화**됩니다! 🎉
