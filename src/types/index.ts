export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Topic {
  id: string;
  slug: string;
  name: string;
  description: string;
}

export interface Problem {
  id: string;
  topicSlug: string;
  name: string;
  difficulty: Difficulty;
  leetcodeUrl: string;
}

export interface ProgressState {
  completedProblems: Record<string, boolean>;
  notes: Record<string, string>;
}
