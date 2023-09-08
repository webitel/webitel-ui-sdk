/* [WTEL-3791] */
/* Check value is an integer or has n* decimal places */
import { helpers } from '@vuelidate/validators';

const decimalValidator = (count) => helpers.withParams(
    { count },
    (value) => value % 1 == 0 || value.toString().split('.')[1].length <= count);

export default decimalValidator;
