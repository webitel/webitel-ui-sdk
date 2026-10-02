import { describe, expect, it } from 'vitest';

import { isContactCentreSide } from '../isContactCentreSide';
import { bot, client, operator } from './fixtures';

describe('isContactCentreSide', () => {
	it('puts operators and bots on the contact-centre side', () => {
		expect(isContactCentreSide(operator)).toBe(true);
		expect(isContactCentreSide(bot)).toBe(true);
	});

	it('puts clients and unknown senders on the client side', () => {
		expect(isContactCentreSide(client)).toBe(false);
		expect(isContactCentreSide(undefined)).toBe(false);
		expect(
			isContactCentreSide({
				id: 'x',
			}),
		).toBe(false);
	});
});
