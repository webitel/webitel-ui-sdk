interface UserWarningsMapConfig {
	id: string;
	type: 'info' | 'warning' | 'error';
	localeKey: string;
	getDays: (warningData: number) => number;
}

interface MappedUserWarningsType {
	type: 'info' | 'warning' | 'error';
	localeKey: string;
	days: number;
}

type WarningRaw = {
	id: string;
	details: string;
	warningData: object;
};

export type { MappedUserWarningsType, UserWarningsMapConfig, WarningRaw };
