import typography from './typography';
import shadow from './shadow';



const colorScheme = {
  light: {
    ...typography.light,
    ...shadow.light,
  },
  dark: {
    ...typography.dark,
    ...shadow.dark,
  },
}

export default colorScheme
