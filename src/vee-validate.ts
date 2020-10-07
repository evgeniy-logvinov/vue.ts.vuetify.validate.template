import {
  extend,
  localize,
} from 'vee-validate';
import ru from 'vee-validate/dist/locale/ru.json';
import * as rules from 'vee-validate/dist/rules';

localize('ru', ru);

// with typescript
Object.entries(rules).forEach(([rule, validation]) => {
  extend(rule, {
    ...validation,
  });
});
