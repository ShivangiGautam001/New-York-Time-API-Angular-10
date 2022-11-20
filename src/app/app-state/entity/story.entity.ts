export class IStoryResponse {
  // id?: any;
  // createdBy?: string;
  // task?: any;
  // assignee?: string;
  // status?: string;

  copyright?: string;
  last_updated?: string;
  num_results?: number;
  results?: Story[];
  section?: string;
  status?: string;
}

export class Story {
  abstract?: string;
  byline?: string;
  created_date?: string;
  des_facet?: [];
  geo_facet?: [];
  item_type?: string;
  kicker?: string;
  material_type_facet?: string;
  multimedia?: [];
  org_facet?: [];
  per_facet?: [];
  published_date?: string;
  section?: string;
  short_url?: string;
  subsection?: string;
  title?: string;
  updated_date?: string;
  uri?: string;
  url?: string;
}
