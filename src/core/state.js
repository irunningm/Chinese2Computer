// 状态：全站唯一的“当前进度”记录（当前在哪一卷、筛选了什么、翻开了哪张卡）
import { CASE_STUDIES } from '../data/cases.js';
import { COMPOSER_PRESETS } from '../data/prompts.js';
import { STACK_COMPASS_SCENARIOS } from '../data/techstacks.js';

// ==================== Global State ====================
export const state = {
  activeTab: 'arch', // 'arch' | 'dict' | 'stacks' | 'cases' | 'prompts'
  theme: 'day',
  mobileSimulator: false,

  // Tab 01: Architecture Sub-modes ('nodes' | 'flow' | 'clinic')
  archSubMode: 'nodes',
  activeFlowStep: 1,
  activeQuizIndex: 0,
  quizAnswers: {},

  // Tab 02: Dictionary
  dictCategory: 'all',
  dictSearch: '',

  // Tab 03: Tech Stacks & Best Practices ('carriers' | 'compass' | 'roadmap')
  stacksSubMode: 'carriers',
  selectedCompassId: STACK_COMPASS_SCENARIOS[0].id,
  activeRoadmapIndex: 0,

  // Tab 04: Case Studies
  activeCaseId: CASE_STUDIES[0].id,
  activeSlideIndex: 0,
  promptCompareMode: 'master',
  honglouGroupFilter: 'all',
  flippedCards: {}, // 按人物唯一 id 记录翻转状态
  songBookFilter: 'all',
  songSearchQuery: '夜市',
  activeCorpusPoetId: 'liuzongyuan',
  corpusCustomNotes: {},

  // Tab 05: Prompts ('templates' | 'composer')
  promptsSubMode: 'templates',
  composer: {
    carrierId: 'web-app',
    projectName: COMPOSER_PRESETS[0].projectName,
    projectType: COMPOSER_PRESETS[0].projectType,
    coreFeatures: COMPOSER_PRESETS[0].coreFeatures,
    visualStyle: COMPOSER_PRESETS[0].visualStyle
  }
};

