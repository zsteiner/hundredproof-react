import convertCups from './convertCups';
import convertTeaspoons from './convertTeaspoons';

type TranslateResultsParams = {
  useCups: boolean;
  amount: number;
};

export default function translateResults({
  useCups,
  amount,
}: TranslateResultsParams) {
  return useCups ? convertCups(amount) : convertTeaspoons(amount);
}
