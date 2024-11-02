export interface ComplimentCheckOption {
  id: number;
  type: 'active' | 'inactive';
  label: string;
}

export const CHECK_COMPLIMENT_OPTIONS: ComplimentCheckOption[] = [
  {
    id: 0,
    type: 'active',
    label: '네, 함께 진행하고 있어요',
  },
  {
    id: 1,
    type: 'inactive',
    label: '아니요, 진행하고 있지 않아요',
  },
];
