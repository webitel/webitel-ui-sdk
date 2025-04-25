import deepCopy from 'deep-copy';
import { ContactsApiFactory } from 'webitel-sdk';

import {
  getDefaultGetListResponse,
  getDefaultGetParams,
  getDefaultInstance,
  getDefaultOpenAPIConfig,
} from '../../defaults/index.js';
import applyTransform, {
  camelToSnake,
  merge,
  notify,
  sanitize,
  snakeToCamel,
} from '../../transformers/index.js';
import ContactsSearchMode from './enums/ContactsSearchMode.js';

const instance = getDefaultInstance();
const configuration = getDefaultOpenAPIConfig();

const contactService = new ContactsApiFactory(configuration, '', instance);

const formatAccessMode = (item) => ({
  ...item,
  access: {
    edit: item.mode.includes('w'),
    delete: item.mode.includes('d'),
  },
});

const getList = async (params) => {
  const fieldsToSend = [
    'page',
    'size',
    'q',
    'sort',
    'fields',
    'id',
    'qin',
    'notIdGroup',
    'group',
    'owner',
    'label',
    'user',
  ];

  if (!params.fields) {
    params.fields = [
      'id',
      'etag',
      'name',
      'managers',
      'labels',
      'about',
      'variables',
      'timezones',
      'phones',
      'emails',
      'imclients',
    ];
  }

  const listResponseHandler = (items) =>
    items?.map((item) => ({
      ...item,
      name: item.name.commonName,
      managers: item.managers ? [...item.managers.data] : [],
      labels: item.labels ? [...item.labels.data] : [],
      groups: getGroupsFromResponse(item),
      variables: item.variables ? [...item.variables.data] : [],
      timezones: item.timezones ? [...item.timezones.data] : [],
      phones: item.phones ? [...item.phones.data] : [],
      emails: item.emails ? [...item.emails.data] : [],
    }));

  let changedParams;

  if (params?.search) {
    changedParams = { ...params, q: params.search };
  } else if (params?.q && params?.qin) {
    changedParams = { ...params };
  } else {
    let searchValue = '';
    let searchKey = '';

    if (params[ContactsSearchMode.NAME]) {
      searchValue = params[ContactsSearchMode.NAME];
      searchKey = ContactsSearchMode.NAME;
    } else if (params[ContactsSearchMode.LABELS]) {
      searchValue = params[ContactsSearchMode.LABELS];
      searchKey = ContactsSearchMode.LABELS;
    } else if (params[ContactsSearchMode.ABOUT]) {
      searchValue = params[ContactsSearchMode.ABOUT];
      searchKey = ContactsSearchMode.ABOUT;
    } else if (params[ContactsSearchMode.VARIABLES]) {
      searchValue = params[ContactsSearchMode.VARIABLES];
      searchKey = ContactsSearchMode.VARIABLES;
    } else if (params[ContactsSearchMode.DESTINATION]) {
      searchValue = params[ContactsSearchMode.DESTINATION];
      searchKey = 'emails,phones,imclients{user{name}}';
    }

    // This code needed for adding starToSearch method to applyTransform while searchKey !== SearchMode.VARIABLES because '*' in variables search mode brokes backend logic.
    // if (searchKey !== ContactsSearchMode.VARIABLES) {
    //   transformations.push(starToSearch('q')); WTEL-4265
    // }

    changedParams = {
      ...params,
      q: searchValue || '',
      qin: searchKey || '',
    };

    if (params.parentId) {
      changedParams.groupId = [params.parentId];
    }

    if(params.hasOwnProperty('hasUser')) {
      changedParams.user = params.hasUser;
    }
  }

  const transformations = [
    sanitize(fieldsToSend),
    merge(getDefaultGetParams()),
    camelToSnake(),
  ];

  const { page, size, q, sort, fields, id, qin, mode, group, not_id_group, owner, label, user } =
    applyTransform(changedParams, transformations);

  try {
    const response = await contactService.searchContacts(
      page,
      size,
      q,
      sort || '+name',
      ['mode', ...fields],
      id,
      qin,
      mode,
      not_id_group,
      group,
      owner,
      label,
      user,
    );

    const { items, next } = applyTransform(
      { ...response.data, items: response.data.data || [] },
      [snakeToCamel(['custom']), merge(getDefaultGetListResponse())],
    );

    return {
      items: applyTransform(items, [
        (items) => items?.map((item) => formatAccessMode(item)),
        listResponseHandler,
      ]),
      next,
    };
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const get = async ({ itemId: id }) => {
  const fields = [
    'name',
    'about',
    'labels',
    'groups',
    'etag',
    'mode',
    'managers',
    'timezones',
    'variables',
    'phones',
    'emails',
    'imclients',
    'user',
    'custom',
  ];

  const defaultObject = {};
  const itemResponseHandler = (item) => {
    return {
      ...item,
      name: item.name.commonName,
      labels: item.labels ? [...item.labels.data] : [],
      groups: getGroupsFromResponse(item),
      managers: item.managers ? [...item.managers.data] : [],
      timezones: item.timezones ? [...item.timezones.data] : [],
      variables: item.variables ? [...item.variables.data] : [],
      phones: item.phones ? [...item.phones.data] : [],
      emails: item.emails ? [...item.emails.data] : [],
    };
  };
  try {
    const response = await contactService.locateContact(id, fields);
    return applyTransform(response.data, [
      snakeToCamel(['custom']),
      merge(defaultObject),
      itemResponseHandler,
      formatAccessMode,
    ]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const fieldsToSend = [
  'name',
  'labels',
  'about',
  'managers',
  'timezones',
  'groups',
  'custom',
];

const sanitizeManagers = (itemInstance) => {
  // handle many managers and even no managers field cases
  const managers = (itemInstance.managers || []).filter(
    ({ user } = {}) => user.id,
  );
  return { ...itemInstance, managers };
};

const sanitizeTimezones = (itemInstance) => {
  // handle many timezones and even no timezones field cases
  const timezones = (itemInstance.timezones || []).filter(
    ({ timezone } = {}) => timezone.id,
  );
  return { ...itemInstance, timezones };
};

const sanitizeGroups = (itemInstance) => {
  // handle many groups and even no groups field cases
  const groups = (itemInstance.groups || []).map((item) => ({ group: item }));
  return { ...itemInstance, groups };
};

const preRequestHandler = (item) => {
  const copy = deepCopy(item);
  copy.name = {
    commonName: copy.name,
  };
  return copy;
};

const getGroupsFromResponse = (item) => {
  return item.groups ? [...item.groups.data.map((el) => el.group)] : [];
};

const add = async ({ itemInstance }) => {
  const item = applyTransform(itemInstance, [
    preRequestHandler,
    sanitizeManagers,
    sanitizeTimezones,
    sanitizeGroups,
    sanitize(fieldsToSend),
    camelToSnake(['custom']),
  ]);
  try {
    const response = await contactService.createContact(item);
    return applyTransform(response.data, [snakeToCamel(['custom'])]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const update = async ({ itemInstance }) => {
  const { etag } = itemInstance;
  const item = applyTransform(itemInstance, [
    preRequestHandler,
    sanitizeManagers,
    sanitizeTimezones,
    sanitizeGroups,
    sanitize(fieldsToSend),
    camelToSnake(['custom']),
  ]);
  try {
    const response = await contactService.updateContact(etag, item);
    return applyTransform(response.data, [snakeToCamel(['custom'])]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const deleteContact = async ({ id }) => {
  try {
    const response = await contactService.deleteContact(id);
    return applyTransform(response.data, []);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const getContactsLookup = (params) =>
  getList({
    ...params,
    fields: params.fields || ['id', 'name'],
  });

const ContactsAPI = {
  getList,
  get,
  add,
  update,
  delete: deleteContact,
  getLookup: getContactsLookup,
};

export default ContactsAPI;
