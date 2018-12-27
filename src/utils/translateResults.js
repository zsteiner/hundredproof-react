import convertCups from './convertCups';
import convertTeaspoons from './convertTeaspoons';

export default function translateResults(useCups, amount) {
  return useCups ? convertCups(amount) : convertTeaspoons(amount);
}
