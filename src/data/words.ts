// Comprehensive word list for Wordle game
// Words are categorized by length for different game modes

// Dictionary API URL
const DICTIONARY_API_BASE = 'https://api.dictionaryapi.dev/api/v2/entries/en';

// Function to fetch word definition from the API
export const getWordDefinition = async (word: string): Promise<string> => {
  try {
    const response = await fetch(
      `${DICTIONARY_API_BASE}/${word.toLowerCase()}`
    );
    if (!response.ok) {
      return 'No definition available';
    }
    const data = await response.json();
    if (data && data[0] && data[0].meanings && data[0].meanings[0]) {
      const firstMeaning = data[0].meanings[0];
      if (firstMeaning.definitions && firstMeaning.definitions[0]) {
        return firstMeaning.definitions[0].definition;
      }
    }
    return 'No definition available';
  } catch (error) {
    console.error('Error fetching word definition:', error);
    return 'No definition available';
  }
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

// Check if a word is valid (exists in our word lists)
export const isValidWord = (word: string): boolean => {
  if (!word) return false;

  const upperWord = word.toUpperCase();
  const length = word.length;

  switch (length) {
    case 4:
      return WORDS_4_LETTERS.includes(upperWord);
    case 5:
      return WORDS_5_LETTERS.includes(upperWord);
    case 6:
      return WORDS_6_LETTERS.includes(upperWord);
    default:
      return false;
  }
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

// Export word lists
export {
  WORDS_4_LETTERS,
  WORDS_5_LETTERS,
  WORDS_6_LETTERS,
} from './word-lists';
