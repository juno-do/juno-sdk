
export type Body = {
  bodyHtml?: string;
  bodyMarkdown?: string;
};

export type ActivityItem = {
  id: string;
  type: "message" | "event";
  icon?: string;
  subTitle?: string;
  dateTime?: string;
} & Body;

export type Icon = {
  url: string;
  text?: string;
};

export type Element = {
  id: string;
  groupId?: string;
  icon?: string;
  title: string;
  subTitle?: string;
  highlight?: string;
  origin?: string;
  dateTime?: string;
  principalIcon?:Icon,
  infoIcons?: Icon[],
  itemUrl?: string;
  actions?: {
    id: string;
    name: string;
    icon?: string;
  }[];
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

export type ListElement = Element &{
  snippetText?: string;
  itemType: string;
}

export type DetailElement = Element & Body;
export type Sublist = {
  title: string;
  elements: ListElement[];
};
export type ListTypeReturn = {
  subLists: Sublist[];
  total: number;
  page: number;
  nextPage?: string | number;
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
      bodyFormat?: "json" | "form";
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

export type UserIntegration = {
  id: string;
  authorId: string;
  token: string;
  integration: string;
  email: string;
  name: string;
  picture: string;
};
export type userIntegrationPayload = {
  email: string;
  picture: string;
  name: string;
  token: string;
};

export type requestParams = {
  name: string;
  type: string;
  value?: string | undefined;
};
