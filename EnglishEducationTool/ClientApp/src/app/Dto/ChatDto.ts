export interface ChatDto {
  userResponse: string;
  language?: string;
  sound?: File;
}

export interface FlaggedToken {
  offset: number;
  token: string;
  type: string;
  suggestions: Suggestion[];
}

export interface Suggestion {
  suggestionSuggestion: string;
  score: number;
}
