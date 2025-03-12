import {EngineCreatePresetQueryRequest, EnginePresetQuery, PresetQueryServiceApiFactory} from 'webitel-sdk';
import {getDefaultGetListResponse, getDefaultGetParams, getDefaultInstance, getDefaultOpenAPIConfig} from '../../../../../api/defaults/index';
import applyTransform, {
    camelToSnake,
    merge,
    notify,
    snakeToCamel,
    starToSearch,
    skipIf,
} from '../../../../../api/transformers/index';

const instance = getDefaultInstance();
const configuration = getDefaultOpenAPIConfig();

const service = PresetQueryServiceApiFactory(configuration, '', instance);

type GetPresetListRequestConfig = {
    transformers: {
        useStarToSearch?: boolean,
    },
};

const getPresetList = async (params, config: GetPresetListRequestConfig) => {

    const useStarToSearch = config?.transformers?.useStarToSearch ?? true;

    const {
        page,
        size,
        search,
        sort,
        fields,
        presetNamespace,
        id,
    } = applyTransform(params, [
        merge(getDefaultGetParams()),
        (params) => useStarToSearch ? starToSearch('search')(params) : params,
    ]);

    try {
        const response = await service.searchPresetQuery(
            page,
            size,
            search,
            sort,
            fields || ['id', 'name', 'preset', 'description'],
            id,
        );
        const {items, next} = applyTransform(response.data, [
            snakeToCamel(),
            merge(getDefaultGetListResponse()),
        ]);
        return {
            items: applyTransform(items, [
                (items) => items.filter(({preset}) => preset.namespace === presetNamespace),
            ]),
            next,
        };
    } catch (err) {
        throw applyTransform(err, [
            notify,
        ]);
    }
};

const addPreset = async ({preset, namespace}: {
    preset: EngineCreatePresetQueryRequest,
    namespace: string
}): Promise<EnginePresetQuery> => {
    const item = applyTransform(preset, [
        camelToSnake(),
        (item) => {
            item.preset.namespace = namespace;
            return item;
        },
    ]);
    try {
        const response = await service.createPresetQuery(item);
        return applyTransform(response.data, [
            snakeToCamel(),
        ]);
    } catch (err) {
        throw applyTransform(err, [
            skipIf(notify, (err) => err.status === 409),
        ]);
    }
};

const updatePreset = async ({item: itemInstance, id}) => {
    const item = applyTransform(itemInstance, [
        camelToSnake(),
    ]);
    try {
        const response = await service.updatePresetQuery(id, item);
        return applyTransform(response.data, [
            snakeToCamel(),
        ]);
    } catch (err) {
        throw applyTransform(err, [
            skipIf(notify, (err) => err.status === 409),
        ]);
    }
};

const deletePreset = async ({id}) => {
    try {
        const response = await service.deletePresetQuery(id);
        return applyTransform(response.data, [
        ]);
    } catch (err) {
        throw applyTransform(err, [
            notify,
        ]);
    }
};

const PresetQueryAPI = {
    getList: getPresetList,
    add: addPreset,
    update: updatePreset,
    delete: deletePreset,
};

export {
    getPresetList,
    addPreset,
    updatePreset,
    deletePreset,
};

export default PresetQueryAPI;
