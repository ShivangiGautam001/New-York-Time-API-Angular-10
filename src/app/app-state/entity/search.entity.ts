export class ISearchResponse {
  copyright?: string;
  response?: IResponse;
  status?: string;
}

export class IResponse {
  docs?: ISearch[];
  meta?: any;
}

export class ISearch {
  web_url?: string;
  snippet?: string;
  print_page?: number;
  print_section?: string;
  source?: string;
  multimedia?: [];
  rank?: number;
  subtype?: string;
  caption?: string;
  credit?: string;
  type?: string;
  url?: string;
  height?: number;
  width?: number;
  legacy?: object;
  crop_name?: string;
  headline?: any;
  main?: string;
  kicker?: string;
  content_kicker?: string;
  print_headline?: string;
  name?: string;
  seo?: string;
  sub?: string;
  keywords?: [];
  value?: string;
  major?: string;
  pub_date?: string;
  document_type?: string;
  news_desk?: string;
  section_name?: string;
  byline?: any;
  original?: string;
  person?: [];
  firstname?: string;
  middlename?: string;
  lastname?: string;
  qualifier?: string;
  title?: string;
  role?: string;
  organization?: string;
  type_of_material?: string;
  _id?: string;
  word_count?: number;
  uri?: string;
}
