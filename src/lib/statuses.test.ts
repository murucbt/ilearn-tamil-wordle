import { getGuessStatuses, checkIfGivensLettersSoundsSame } from './statuses'

const mockSolutionGetter = jest.fn()

beforeEach(() => {
  jest.mock('./words', () => ({
    ...jest.requireActual('./words'),
    get solution() {
      return mockSolutionGetter()
    },
  }))
})

describe('getGuessStatuses', () => {
  test('guess statuses', () => {
    expect(getGuessStatuses('ABCDE', 'EDCBA')).toEqual([
      'present',
      'present',
      'correct',
      'present',
      'present',
    ])
    expect(getGuessStatuses('ABCDE', 'VWXYZ')).toEqual([
      'absent',
      'absent',
      'absent',
      'absent',
      'absent',
    ])
    expect(getGuessStatuses('ABCDE', 'ABCDE')).toEqual([
      'correct',
      'correct',
      'correct',
      'correct',
      'correct',
    ])

    // https://github.com/cwackerfuss/react-wordle/issues/456
    expect(getGuessStatuses('BOSSY', 'SASSY')).toEqual([
      'absent',
      'absent',
      'correct',
      'correct',
      'correct',
    ])
  })
})

describe('checkIfGivensLettersSoundsSame', () => {
  test('check if givens letters sounds same', () => {
    expect(checkIfGivensLettersSoundsSame('க', 'ச')).toBe(true);
    expect(checkIfGivensLettersSoundsSame('ங்', 'க்')).toBe(true);
    expect(checkIfGivensLettersSoundsSame('ஐ', 'கை')).toBe(true);
    expect(checkIfGivensLettersSoundsSame('தை', 'கை')).toBe(true);
    expect(checkIfGivensLettersSoundsSame('க', 'கை')).toBe(false);
    expect(checkIfGivensLettersSoundsSame('தீ', 'வே')).toBe(false);
    expect(checkIfGivensLettersSoundsSame('தீ', 'க்')).toBe(false);
    expect(checkIfGivensLettersSoundsSame('ஆ', 'ஓ')).toBe(false);
  })
});