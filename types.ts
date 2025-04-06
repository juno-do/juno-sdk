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
export type VisualAction = {
  type: "custom" | "link" | "callback";
  url?: string | undefined;
  callbackId?: string | undefined;
  customActionId?: string | undefined;
};
export type VisualIndicator = {
  iconUrl: string;
  text: string;
  value: string;
  tooltip: string;
  action: VisualAction;
  id: string;
  actionType: "callback" | "select" | "date";
  actionOptions: {
    id: string;
    name: string;
    label: string;
    icon?: string | undefined;
  }[];
  variant: "ghost" | "outline";
  colorHex: string;
  backgroundColorHex: string;
  borderColorHex: string;
};

export type TagsType = {
  id: string;
  name: string;
  colorHex?: string | undefined;
};
type Breadcrumb = {
  id: string;
  name: string;
  url: string;
  label?: string | undefined;
};
export type Attachment = {
  id: string;
  name: string;
  filename: string;
  size: number;
  mimeType: string;
  content: string;
  contentId: string;
  externalUrl?: string | undefined;
};

export type Element = {
  id: string;
  groupId?: string | undefined;
  icon?: string | undefined;
  title: string;
  titleForTask?: string | undefined;
  subTitle?: string | undefined;
  highlight?: string | undefined;
  origin?: string | undefined;
  dateTime?: string | undefined;
  principalVisualIndicator?: VisualIndicator | undefined;
  visualIndicatorsInTop?: VisualIndicator[] | undefined;
  breadcrumb?: Breadcrumb[] | undefined;
  visualIndicatorsInBottom?: VisualIndicator[] | undefined;
  itemUrl?: string | undefined;
  attachments?: Attachment[] | undefined;
  customActions?:
    | {
        id: string;
        name: string;
        label: string;
        icon?: string | undefined;
        inputs: {
          id: string;
          name: string;
          label: string;
          type: string;
          required: boolean;
          default?: string | undefined;
        }[];
      }[]
    | undefined;
  feeds?:
    | {
        title: string;
        elements: ActivityItem[];
      }[]
    | undefined;
  subItems?:
    | {
        title: string;
        badge: {
          text: string;
          colorHex: string;
        };
        elements: Element[];
      }[]
    | undefined;
  tags: TagsType[];
};

export type ListElement = Element & {
  snippetText?: string;
  itemType: string;
};

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
  filter: string;
  name: string;
  value: string;
  backgroundColor?: string;
};

export type FilterSubItem = {
  title: string;
  name: string;
  multiple: boolean;
  options: FilterOptions[];
};
export type Filter = {
  name: string;
  title: string;
  in_display_section?: boolean;
  principal: boolean;
  type: "static" | "dynamic";
  multiple: boolean;
  options: FilterOptions[];
  subItems?: FilterSubItem[];
  useSubItems?: boolean;
};

export type ViewOptions = {
  toogleOptions: {
    label: string;
    value?: boolean | undefined;
    defaultValue?: boolean | undefined;
  }[];
  selectOptions: {
    label: string;
    value: string;
  }[];
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
  viewOptions: ViewOptions;
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

export type FilterOptionsSelected = {
  name: string;
  filters: { name: string; values: string[] }[];
};
