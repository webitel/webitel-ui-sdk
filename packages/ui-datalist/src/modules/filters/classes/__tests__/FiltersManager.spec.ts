import { beforeEach, describe, expect, it } from 'vitest';
import { createFiltersManager, IFiltersManager } from '../FiltersManager';

describe('FiltersManager', () => {
	let filtersManager: IFiltersManager;

	beforeEach(() => {
		filtersManager = createFiltersManager();
	});

	it('should be successfully created', () => {
		expect(filtersManager).toBeDefined();
	});

	it('should be able to add a filter', () => {
		filtersManager.addFilter({
			name: 'test',
			value: 'test',
		});
		expect(filtersManager.getFilter('test')).toBeDefined();
	});

	it('should be able to update a filter', () => {
		filtersManager.addFilter({
			name: 'test',
			value: 'test',
		});
		filtersManager.updateFilter({
			name: 'test',
			value: 'test2',
		});
		expect(filtersManager.getFilter('test').value).toBe('test2');
	});

	it('should be able to getAllValues', () => {
		filtersManager.addFilter({
			name: 'test',
			value: 'test',
		});
		expect(filtersManager.getAllValues()).toEqual({
			test: 'test',
		});
	});

	it('should be able to getAllValues with exclude parameter', () => {
		filtersManager.addFilter({
			name: 'test',
			value: 'test',
		});
		filtersManager.addFilter({
			name: 'test2',
			value: 'test2',
		});
		expect(
			filtersManager.getAllValues({
				exclude: [
					'test2',
				],
			}),
		).toEqual({
			test: 'test',
		});
	});
});
