### [Icon sprites naming convention:](#icons-naming-convention)

App-specific icons are highly recommended to be named with the prefix corresponding to this application.


The reason is: when you see an icon usage, you will be able to distinguish `svg` location:
in this app, or library - and update it, if needed.
*For example, if you want to move this icon from app to library, you just need to remove `icon-prefix` prop
from all icon usages (and, of course, rename the icon file)*


#### Icon prefix corresponding to application:
* **Webitel UI:** no prefix
* **Admin:** `adm-`
* **Workspace:** `ws-`
* **Supervisor:** `sv-`
* **History:** `hs-`
* **Webitel CC UI:** `cc-`
