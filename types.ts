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

export type FilterOptions = {
  name: string;
  value: string;
  backgroundColor?: string;
};
export type Filter = {
  name: string;
  type: "static" | "dynamic";
  options: FilterOptions[];
};

export type Manifest = {
  $schema: string;
  $version: string;
  name: string;
  title: string;
  description: string;
  icon: string;
  author: string;
  domains: string[];
  auth: {
    type: "oauth2" | "basic";
    oauth2?: {
      needRefreshToken?: boolean;
      refreshToken?: {
        url: string;
      };
      callback?: {
        url: string;
      };
    };
  };
  loadersLists: {
    name: string;
    returnType: string;
    title: string;
    filters: Filter[];
  }[];
  loadersItems: {
    name: string;
  }[];
  categories: string[];
  keywords: string[];
  secrets: string[];
};
