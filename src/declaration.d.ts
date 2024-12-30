declare module '*.scss' {
  const classes: Record<string, string>;
  export default classes;
}

declare module '*.css' {
  const classes: Record<string, string>;
  export default classes;
}

declare module "@webitel/styleguide/fonts" {
  const content: string;
  export default content;
}
