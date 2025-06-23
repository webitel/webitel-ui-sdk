import {RegleSchemaResult} from "@regle/schemas";

export const useCardSaveAction = <CardEntity>({
    validate,
    saveItem,
                                  }: {
    validate?: () => Promise<RegleSchemaResult<CardEntity>>;
    saveItem: (data: CardEntity) => Promise<unknown /* coz doesnt matter */>;
}) => {
    const save = async () => {
        const { valid, data } = await validate();
        if (!valid) return;

        return saveItem(data);
    };

    return {
        save,
    };
};