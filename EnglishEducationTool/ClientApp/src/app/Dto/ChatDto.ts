export interface ChatDto {
  userResponse: string;
  botResponse: string;
  flaggedTokens: FlaggedToken[];
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
