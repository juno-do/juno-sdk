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
  bodyMarkdown?: string;
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
export type Sublist = {
  title: string;
  elements: Element[];
}
export type ListTypeReturn = {
  subLists:Sublist[];
  total: number;
  page: number;
  nextPage?: string| number;
  hasNextPage?: boolean;
  pageSize: number;
};

export type FilterOptions = {
  name: string;
  value: string;
  backgroundColor?: string;
};
export type Filter = {
  name: string;
  principal: boolean;
  type: "static" | "dynamic";
  multiple: boolean;
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
      authorizationUrl: string;
      authorizationMethod: "header" | "body";
      bodyFormat: "json" | "form";
      scopeSeparator?: string;
      tokenUrl?: string;
      tokenParams?: {
        grantType: string;
      };
      scopes?: string[];
      authorizationParams?: {
        responseType: string;
        accessType: string;
        prompt: string;
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
