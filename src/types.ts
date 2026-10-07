export type MissionId = 'mission1' | 'mission2' | 'mission3' | 'mission4' | 'mission5';

export type MissionStatus = 'not-started' | 'in-progress' | 'complete';

export interface UserProgress {
  mission1: MissionStatus;
  mission2: MissionStatus;
  mission3: MissionStatus;
  mission4: MissionStatus;
  mission5: MissionStatus;
}

export interface SDLCStage {
  id: string;
  name: string;
  icon: string;
  whatHappens: string;
  example: string;
  possibleEvidence: string[];
}

export interface EvidenceCard {
  id: string;
  label: string;
  icon: string;
  correctStageId: string;
  hint: string;
}

export interface ProjectScenario {
  id: string;
  title: string;
  description: string;
  characteristics: string[];
  options: {
    id: string;
    label: string;
    model: string;
    isCorrect: boolean;
    justification: string;
  }[];
}

export interface BacklogItem {
  id: string;
  title: string;
  points?: number;
  priority: number;
  category?: string;
}

export interface UserStoryComponent {
  id: string;
  type: 'role' | 'action' | 'benefit';
  text: string;
}

export interface ScrumRoleCard {
  id: string;
  responsibility: string;
  correctRole: 'po' | 'sm' | 'dev';
  explanation: string;
}

export interface RiskItem {
  id: string;
  title: string;
  description: string;
  correctProbability: 'Low' | 'Medium' | 'High';
  correctImpact: 'Low' | 'Medium' | 'High';
  correctStrategy: 'Avoid' | 'Reduce' | 'Accept' | 'Transfer';
  explanation: string;
}
