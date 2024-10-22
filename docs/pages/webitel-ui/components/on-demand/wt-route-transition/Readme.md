# WtRouteTransition
Компонент для "плавного роутингу"


## Приклад використання

```vue
// the-crm-workspace.vue

<template>
  <main class="object-wrap">
    <section class="object">
      <wt-app-header>
        <wt-notifications-bar />
        <wt-navigation-bar
          :current-app="currentApp"
          :nav="nav"
          :dark-mode="darkMode"
        />
        <a :href="startPageHref">
          <wt-logo
            :dark-mode="darkMode"
          />
        </a>
        <wt-dark-mode-switcher />
        <wt-app-navigator
          :apps="apps"
          :current-app="currentApp"
          :dark-mode="darkMode"
        />
        <wt-header-actions
          :build-info="{ release, build }"
          :user="userinfo"
          @logout="logoutUser"
          @settings="settings"
        />
      </wt-app-header>
      <div class="object-content-wrap">
        <WtRouteTransition/>
      </div>
    </section>
  </main>
</template>

<script setup>
  import WtRouteTransition
    from '@webitel/ui-sdk/src/components/on-demand/wt-route-transition/wt-route-transition.vue'
    ...
</script>
```
