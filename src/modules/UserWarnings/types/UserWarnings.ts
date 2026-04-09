interface UserWarningsMapConfig {
	id: string;
	type: 'info' | 'warning' | 'error';
	localeKey: string;
	getDays: (warningData: number) => number;
}

interface MappedUserWarningsType {
	type: string;
	localeKey: string;
	days: number;
}

export type { MappedUserWarningsType, UserWarningsMapConfig };
