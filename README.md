# Ground Rule

## 기술 스택

- 프레임워크: React
- 언어: TypeScript
- 패키지 매니저: NPM
- 개발환경 설정 툴: Vite
- CSS 프레임워크: Emotion
- 전역 상태 관리: Zustand
- 통신: Axios, React-query
- PWA: Service Worker, Manifest
- 테스트: Jest, Sentry
- UI 문서화: Storybook
- 웹 성능 최적화: Lighthouse
- 번들 사이즈 분석: vite-bundle-visualizer
- 코드 품질 관리: ESLint, Prettier

<br/>

## 배포

- AWS + Docker

<br/>

## Git Conventions

### Branch 생성

- **브랜치명**
  : **DD-이슈번호 (Jira Ticket Number**)
      ex) DD-11

```
브랜치 생성 및 이동
git checkout -b 브랜치명
```

- 브랜치 종류
  ### | **branch 종류**
  - `main`: 배포 브랜치
  - `develop`: 개발 브랜치
  - `DD-이슈번호`: 세부 개발 브랜치

<br/>

### Commit 규칙

- Commit 메세지
  **`DD-이슈번호`** **`GitMoji(✨, 🐛 등)`** **`Type`: `작업 내용`**
- ex) **DD-23** ✨ **[Feat]** 검색 결과 필터링 기능 추가
- **깃모지 (Gitmoji)** : 커밋 메시지를 위한 이모지 가이드로, <br/>**시각적인 강조**를 통해 **가독성** 높은 커밋 메시지를 작성할 수 있다.
  **→ Label의 이모지를 참고하여 삽입!**

```tsx
git add .
git commit -m "DD-(이슈번호) Gitmoji [Type] 작업 내용"
git push origin 현재 작업 브랜치명
```

| Type       | 의미                                                                                 |
| ---------- | ------------------------------------------------------------------------------------ |
| `Feat`     | 새로운 기능 추가                                                                     |
| `Design`   | 사용자 UI 및 CSS 파일 추가 · 수정                                                    |
| `Chore`    | 패키지 매니저 수정, 그 외 기타 수정 ex) .gitignore                                   |
| `Fix`      | 버그 수정                                                                            |
| `Style`    | 코드의 구조,형식 개선 (코드 formatting, 세미콜론 누락, 코드 자체의 변경이 없는 경우) |
| `Docs`     | 문서 수정                                                                            |
| `Refactor` | 코드 리팩토링                                                                        |
| `Test`     | 테스트 코드, 리팩토링 테스트 코드 추가                                               |
| `Comment`  | comment 필요한 주석 추가 및 변경                                                     |
| `File`     | 파일 또는 폴더명 수정, 이동, 삭제 등의 작업만 수행한 경우                            |
| `!HOTFIX`  | 급하게 치명적인 버그를 고쳐야 하는 경우                                              |

<br/>

### Pull Request 규칙

```
  자주 커밋하고 PR은 300자가 넘지 않도록 주의! (자주 PR)
```

- **develop 브랜치**로 PR 날리기
- PR 제목은 commit 메세지랑 똑같이
  - 제목: **[Feat]** 핵심적인 부분만 간략하게
  - 내용: 간결하게 리스트 방식으로
- merge는 reviewer가 해주기
  : 코드 관련 수정사항, 질문 등 코멘트 남기기

<br/>

### 팀원 리뷰 후 Merge

→ PR 리뷰 시에는 해당 브랜치로 checkout 한 후 확인

→ Approve 이후 Merge 진행
