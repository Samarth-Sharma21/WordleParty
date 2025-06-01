// Comprehensive word list for Wordle game
// Words are categorized by length for different game modes

// Importing a larger dictionary for word validation
// This will be used to check if a word exists in the English language
import {
  WORDS_4_LETTERS,
  WORDS_5_LETTERS,
  WORDS_6_LETTERS,
} from './word-lists';

// Additional common English words for validation
// Based on the dwyl/english-words repository: https://github.com/dwyl/english-words
const ADDITIONAL_WORDS: Record<number, string[]> = {
  4: [
    // Add more 4-letter words here
    'ABLE',
    'ACID',
    'AGED',
    'ALSO',
    'AREA',
    'ARMY',
    'AWAY',
    'BABY',
    'BACK',
    'BALL',
    'BAND',
    'BANK',
    'BASE',
    'BATH',
    'BEAR',
    'BEAT',
    'BEEN',
    'BEER',
    'BELL',
    'BELT',
    // ... more words
  ],
  5: [
    // Add more 5-letter words here
    'ABOUT',
    'ABOVE',
    'ABUSE',
    'ACTOR',
    'ADAPT',
    'ADMIT',
    'ADOPT',
    'ADULT',
    'AFTER',
    'AGAIN',
    'AGENT',
    'AGREE',
    'AHEAD',
    'ALARM',
    'ALBUM',
    'ALERT',
    'ALIKE',
    'ALIVE',
    'ALLOW',
    'ALONE',
    // ... more words
  ],
  6: [
    // Add more 6-letter words here
    'ABROAD',
    'ACCEPT',
    'ACCESS',
    'ACROSS',
    'ACTING',
    'ACTION',
    'ACTIVE',
    'ACTUAL',
    'ADVICE',
    'ADVISE',
    'AFFECT',
    'AFFORD',
    'AFRAID',
    'AGENCY',
    'AGENDA',
    'ALMOST',
    'ALWAYS',
    'AMOUNT',
    'ANIMAL',
    'ANNUAL',
    // ... more words
  ],
};

// Get random word by length
export const getRandomWord = (length: number): string => {
  let wordList: string[];

  switch (length) {
    case 4:
      wordList = WORDS_4_LETTERS;
      break;
    case 5:
      wordList = WORDS_5_LETTERS;
      break;
    case 6:
      wordList = WORDS_6_LETTERS;
      break;
    default:
      wordList = WORDS_5_LETTERS;
  }

  return wordList[Math.floor(Math.random() * wordList.length)];
};

// Check if a word is valid (exists in our word lists or additional dictionary)
export const isValidWord = (word: string): boolean => {
  if (!word || word.length < 4 || word.length > 6) {
    return false;
  }

  const upperWord = word.toUpperCase();
  const length = word.length;

  // First check in our game word lists
  switch (length) {
    case 4:
      if (WORDS_4_LETTERS.includes(upperWord)) return true;
      break;
    case 5:
      if (WORDS_5_LETTERS.includes(upperWord)) return true;
      break;
    case 6:
      if (WORDS_6_LETTERS.includes(upperWord)) return true;
      break;
    default:
      return false;
  }

  // If not found in game word lists, check additional dictionary
  return ADDITIONAL_WORDS[length]?.includes(upperWord) || false;
};

// Get all words for a specific length
export const getWordsByLength = (length: number): string[] => {
  switch (length) {
    case 4:
      return WORDS_4_LETTERS;
    case 5:
      return WORDS_5_LETTERS;
    case 6:
      return WORDS_6_LETTERS;
    default:
      return WORDS_5_LETTERS;
  }
};

// Create a separate file called word-lists.ts with the original word lists
export { WORDS_4_LETTERS, WORDS_5_LETTERS, WORDS_6_LETTERS };
