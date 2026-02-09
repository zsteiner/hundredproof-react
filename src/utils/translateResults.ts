import { convertCups } from './convertCups';
import { convertTeaspoons } from './convertTeaspoons';

type TranslateResultsParams = {
  useCups: boolean;
  amount: number;
};

export function translateResults({ useCups, amount }: TranslateResultsParams) {
  return useCups ? convertCups(amount) : convertTeaspoons(amount);
}
