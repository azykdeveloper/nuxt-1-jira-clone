export enum EnumStatus {
  'todo' = 'todo',
  'in-progress' = 'in-progress',
  'produced' = 'produced',
  'done' = 'done',
}

export interface ISidebarItem {
  icon: string;
  label: string;
  to: string;
}

export interface IBaseField {
  $createdAt: string;
  $id: string;
}

export interface IComment extends IBaseField {
  text: string;
}

export interface IDeal extends IBaseField {
  name: string;
  description: string;
  status: EnumStatus;
  commments: IComment[];
}

export interface IDealForm {
  name: string;
  description: string;
  status: string;
  userId: string;
}

export interface IStatuses {
  id: EnumStatus;
  name: string;
  items: IDeal[];
}