export type WtSearchBarSearchModeOption<ModeType> = {
  /**
   * @description
   * localized name of the search mode
   */
  text: string;
  /**
   * @description
   * unique identifier of the search mode
   */
  value: ModeType | string;
};
