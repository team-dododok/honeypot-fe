export interface SubMenuItem {
  id: number;
  subTitle: string;
  path: string;
}

export interface MenuItem {
  id: string;
  title: string;
  tab?: SubMenuItem[];
  path?: string;
}
