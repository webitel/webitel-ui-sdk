const mapLocale = (dataList, { $t, $tc }) => dataList.map((item) => ({
    ...item,
    text: typeof item.locale === 'string' ? $t(item.locale) : $tc(...item.locale),
  }));

export default mapLocale;
