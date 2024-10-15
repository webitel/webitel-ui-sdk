<template>
  <div class="permissions-tab-role-popup">
    <wt-icon-btn
      icon="plus"
      @click="add"
    />

    <wt-popup
      :shown="shown"
      overflow
      size="sm"
      @close="close"
    >
      <template #title>
        {{ `${t('reusable.new')} ${t('objects.grantee', 1).toLowerCase()}` }}
      </template>
      <template #main>
        <permissions-role-select
          v-model="grantee"
          :clearable="false"
          :placeholder="t('object.role', 1)"
          :search-method="getAvailableGrantees"
        />
      </template>
      <template #actions>
        <wt-button @click="save">
          {{ t('objects.add') }}
        </wt-button>
        <wt-button
          color="secondary"
          @click="close"
        >
          {{ t('objects.close') }}
        </wt-button>
      </template>
    </wt-popup>
  </div>
</template>

<script setup>
import { ref, useAttrs } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import RolesAPI from '../../../../api/clients/roles/roles.js';
import getNamespacedState from '../../../../store/helpers/getNamespacedState.js';
import PermissionsRoleSelect from './permissions-role-select.vue';

const props = defineProps({
  namespace: {
    type: String,
    required: true,
  },
});

const attrs = useAttrs();
const store = useStore();
const { t } = useI18n();
const router = useRouter();
const route = useRoute();

const grantee = ref(null);

const existingGranteesList = computed(() => getNamespacedState(store.state, props.namespace).dataList);

const shown = computed(() => !!route.params.permissionId);

const add = () => router.push({
  ...route,
  params: { ...route.params, permissionId: 'new' },
});

const close = () => {
  const { permissionId, ...params } = route.params;

  return router.push({
    ...route,
    params,
  });
};

const loadGrantees = (params) => {
  const fields = ['name', 'id', 'user'];
  return RolesAPI.getExtendedRoles({
    ...params,
    fields,
  });
};

// filter already existing roles
const getAvailableGrantees = async (params) => {
  const { items, ...rest } = await loadGrantees(params);
  return {
    items: items.filter(
      (role) => !existingGranteesList.value.some((usedRoles) => role.id === usedRoles.grantee.id),
    ),
    ...rest,
  };
};

const save = async (payload = grantee.value) => {
  await store.dispatch(`${props.namespace}/ADD_ROLE_PERMISSIONS`, payload);
  return close();
};

</script>

<style lang="scss" scoped>
</style>
