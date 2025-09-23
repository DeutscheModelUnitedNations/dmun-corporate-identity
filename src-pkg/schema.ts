import { z } from 'zod/v4';
import { zodToJsonSchema } from 'zod-to-json-schema';

export const schema = z.object({
	shades: z.record(
		z.string(),
		z.object({
			primary: z.string(),
			secondary: z.string(),
			accent: z.string(),
			info: z.string(),
			success: z.string(),
			warning: z.string(),
			error: z.string()
		})
	),
	themes: z.record(
		z.string(),
		z.object({
			preferences: z.object({
				name: z.string().optional(),
				default: z.boolean().optional(),
				prefersdark: z.boolean().optional(),
				'color-scheme': z.string().optional()
			}),
			colors: z.object({
				'base-100': z.string(),
				'base-200': z.string(),
				'base-300': z.string(),
				'base-content': z.string().optional(),
				primary: z.string(),
				'primary-content': z.string(),
				secondary: z.string(),
				'secondary-content': z.string(),
				accent: z.string(),
				'accent-content': z.string(),
				neutral: z.string(),
				'neutral-content': z.string(),
				info: z.string(),
				'info-content': z.string(),
				success: z.string(),
				'success-content': z.string(),
				warning: z.string(),
				'warning-content': z.string(),
				error: z.string(),
				'error-content': z.string()
			}),
			visuals: z.object({
				'radius-selector': z.string().optional(),
				'radius-field': z.string().optional(),
				'radius-box': z.string().optional(),
				'size-selector': z.string().optional(),
				'size-field': z.string().optional(),
				border: z.string().optional(),
				depth: z.coerce.string().optional(),
				noise: z.coerce.string().optional()
			})
		})
	)
});

console.log(JSON.stringify(z.toJSONSchema(schema), null, 2));
