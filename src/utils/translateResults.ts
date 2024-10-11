import convertCups from './convertCups';
import convertTeaspoons from './convertTeaspoons';

export default function translateResults(useCups: boolean, amount: number) {
  return useCups ? convertCups(amount) : convertTeaspoons(amount);
}
