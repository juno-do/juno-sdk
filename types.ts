export type ActivityItem = {
  id: string;
  icon?: string;
  snippet: string;
  subTitle?: string;
  time: string;
};

export type Element = {
  id: string;
  icon?: string;
  groupId: string;
  body: string;
  snippet: string;
  bodyHtml?: string;
  boydMarkdown?: string;
  title: string;
  subTitle?: string;
  highlight?: string;
  origin: string;
  date: string;
  feeds?: {
    title: string;
    elements: ActivityItem[];
  }[];
  subItems?: {
    title: string;
    elements: Element[];
  }[];
  tags: {
    id: string;
    name: string;
    colorHex?: string;
  }[];
};

export type ListTypeReturn = {
  elements: Element[];
  total: number;
  page: number;
  pageSize: number;
};
