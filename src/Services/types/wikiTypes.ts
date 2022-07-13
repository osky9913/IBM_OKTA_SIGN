export type WikiValuesResponse = {
  text: string;
  year: number;
};

export type WikiResponse = {
  selected: WikiValuesResponse[];
  holidays: WikiValuesResponse[];
  events: WikiValuesResponse[];
  deaths: WikiValuesResponse[];
  births: WikiValuesResponse[];
};

export const initialStateWikiResponse: WikiResponse = {
  selected: [],
  holidays: [],
  events: [],
  deaths: [],
  births: [],
};
