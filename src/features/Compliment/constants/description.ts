export interface ComplimentWayDescription {
  id: number;
  title: string;
  description: string;
  content: string;
}

export const COMPLIMENT_WAY_DESCRIPTION: ComplimentWayDescription[] = [
  {
    id: 1,
    title: '행동에 대한 칭찬',
    description: '노력과 행동을 발견하고, 이를 칭찬해요.',
    content: `예시 ) ‘봉봉이’가 기능명세서를 작성할 때,\n우리가 이해하기 쉬운 방법은 무엇인지\n계속 물어보며 진행하는 점이 좋았어.`,
  },
  {
    id: 2,
    title: '결과에 대한 칭찬',
    description: '결과물 및 성과를 발견하고, 이를 칭찬해요.',
    content: `예시 ) ‘봉봉이’가 꼼꼼한 기능명세서를\n작성해서 덕분에 오류 없는 개발이 가능했어.`,
  },
];
