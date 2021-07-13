export interface ChatDto {
  userResponse: string;
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
