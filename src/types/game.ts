export type AppStage =
  | 'name_gate'
  | 'access_denied'
  | 'access_granted'
  | 'welcome_screen'
  | 'box_opening'
  | 'dare_revealed'
  | 'completion';

export interface GameState {
  stage: AppStage;
  enteredName: string;
  isUnlocked: boolean;
  isBoxOpened: boolean;
  isDareRevealed: boolean;
  isDareCompleted: boolean;
  soundEnabled: boolean;
}
