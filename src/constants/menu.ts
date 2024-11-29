import { MenuItem } from '@/types/constants/MenuItem';

export const MENU: MenuItem[] = [
  {
    id: 'my',
    title: '나의 꿀단지',
    tab: [
      { id: 0, subTitle: '나의 꿀단지 Main', path: '/' },
      { id: 1, subTitle: '그룹 관리', path: '/group/management' },
      { id: 2, subTitle: '프로필 수정', path: '/profile/update' },
      { id: 3, subTitle: '서비스 이용 약관', path: '/setting/terms' },
    ],
  },
  {
    id: 'intro',
    title: '서비스 소개',
    tab: [
      {
        id: 3,
        subTitle: `'꿀단지'가 뭐예요?`,
        path: 'https://www.notion.so/465162159795401992a62e5cc0c00309',
      },
      {
        id: 4,
        subTitle: '어떻게 사용하나요?',
        path: 'https://www.notion.so/98c911aa99fd473dbff2e80517f2faa2',
      },
    ],
  },
];
