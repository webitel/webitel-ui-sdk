import { bold, red } from '../console-colors';

interface ValidationError {
	message: string;
	details?: string[];
}

/** A collection of validation errors, each with full contextual detail. */
export class ValidationErrorCollector {
	readonly fileLabel: string;
	readonly errors: ValidationError[] = [];

	constructor(fileLabel: string) {
		this.fileLabel = fileLabel;
	}

	add(message: string, details?: string[]): void {
		this.errors.push({
			message,
			details,
		});
	}

	get hasErrors(): boolean {
		return this.errors.length > 0;
	}

	/** Print all collected errors to the console with full detail, grouped and numbered. */
	report(): void {
		console.error(
			red(
				bold(
					`\nПеревірку не пройдено для ${this.fileLabel}: знайдено помилок - ${this.errors.length}:\n`,
				),
			),
		);
		this.errors.forEach((err, i) => {
			console.error(red(`${i + 1}) ${err.message}`));
			if (err.details) {
				for (const line of err.details) {
					console.error(red(`   ${line}`));
				}
			}
			console.error('');
		});
	}
}
