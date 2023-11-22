Validator for variable search string
```js
import variableSearchValidator from '@webitel/ui-sdk/src/validators/variableSearchValidator/variableSearchValidator';

isValidKeyValuePair("height=100"); // true
isValidKeyValuePair("1 1=2 2"); // true
isValidKeyValuePair("you height=5 feet 5½ inches (166 cm)"); // true
isValidKeyValuePair("expected_output=valid_number")); // true
isValidKeyValuePair("height= 100"); // false
isValidKeyValuePair("height =100"); // false
isValidKeyValuePair("height = 100"); // false
isValidKeyValuePair("height=5 feet 5½ inches (166 cm), age=1231, fin=123231"); // false
```
