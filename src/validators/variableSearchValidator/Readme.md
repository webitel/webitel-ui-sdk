Validator for variable search string
```javascript
import variableSearchValidator from '@webitel/ui-sdk/src/validators/variableSearchValidator/variableSearchValidator';

console.log(isValidKeyValuePair("height=100")); // true
console.log(isValidKeyValuePair("1 1=2 2")); // true
console.log(isValidKeyValuePair("you height=5 feet 5½ inches (166 cm)")); // true
console.log(isValidKeyValuePair("expected_output=valid_number")); // true
console.log(isValidKeyValuePair("height= 100")); // false
console.log(isValidKeyValuePair("height =100")); // false
console.log(isValidKeyValuePair("height = 100")); // false
```
