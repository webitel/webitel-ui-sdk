/* [WTEL-3791] */
/* Check value is an integer or has 2 decimal places */

const decimalValidator = (value) => value % 1 == 0 || value.toString().split('.')[1].length <= 2;

export default decimalValidator;
