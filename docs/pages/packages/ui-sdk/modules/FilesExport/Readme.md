# `FilesExport` Module v2

>[!IMPORTANT]
> Це документація по версії v2 – яка через composable. 
>
> Версія через mixin – @deprecated!

## TLDR Usage

```js
// import
import { useFilesExport } from '@webitel/ui-sdk/modules/FilesExport';

// usage
const { exportFiles: downloadZip } = useFilesExport({
  getFileURL: (item) => `webitel.example.com/download?fileId=${item.id}`,
  fetch: (/* { page } */) => {
    const items = selected.value.length ? selected.value : dataList.value;
    return { items }; 
  },
  filename: `screenshots-callId-${callId.value}`,
});

downloadZip();
```

## Ще приклади використання `fetch`

### use @webitel/api-services/api fn

```js
import { FilesServiceAPI } from '@webitel/api-services/api';

useFilesExport({
    //...
    fetch: FilesAPI.getDownloadFilesList,
});
```

### using filtersManager from @webitel/ui-datalist

```js
useFilesExport({
    //...
    fetch: ({ page }) => {
        const params = {
            page,
            ...filtersManager.getAllValues(),
        };
        return FilesAPI.getDownloadFilesList(params);
    },
});
```