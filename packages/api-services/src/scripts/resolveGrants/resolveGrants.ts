import { AccessMode } from '../../enums/AccessMode/AccessMode';

export interface ResolveGrantsParams {
	/** [Claude] what the row has for this rule now */
	have: {
		rule: string;
	};
	ruleName: string;
	mode:
		| {
				id: number;
		  }
		| number;
}

/*
 [Claude] what to send for a rule, by what the row has and what is picked
 has | patch | got
-----+-------+-----
   - |  w    | w
   w |  w    | -
   - |  ww   | ww
   w |  ww   | ww
  ww |  ww   | w
  ww |  w    | -
*/
export const resolveGrants = ({
	have,
	ruleName,
	mode,
}: ResolveGrantsParams): string | null => {
	switch (typeof mode === 'number' ? mode : mode?.id) {
		case AccessMode.Forbidden:
			return ruleName;
		case AccessMode.Allow:
			return have.rule || ruleName;
		case AccessMode.Manage:
			return `${ruleName}${ruleName}`;
		default:
			return null;
	}
};
