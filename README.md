# W3C Design Tokens Standard Schema

A TypeScript library that provides [Standard Schema](https://standardschema.dev) for [W3C Design Tokens](https://tr.designtokens.org/format).

## Installation

```bash
npm install w3c-design-tokens-standard-schema @standard-schema/spec zod
# or
yarn add w3c-design-tokens-standard-schema @standard-schema/spec zod
# or
pnpm add w3c-design-tokens-standard-schema @standard-schema/spec zod
```

## Usage

```typescript
import { createSchema } from 'w3c-design-tokens-standard-schema/zod'
import type { StandardSchemaV1 } from '@standard-schema/spec'
import { z } from 'zod'

// example implementation of validate function
async function validate<T extends StandardSchemaV1>(
	schema: T,
	input: any,
): Promise<StandardSchemaV1.InferOutput<T>> {
	let result = schema['~standard'].validate(input)
	if (result instanceof Promise) result = await result

	if (result.issues) {
		throw new Error(JSON.stringify(result.issues, null, 2))
	}

	return result.value
}

const schema = createSchema()

// or with $extensions
const schema = createSchema({
  extensionSchema: z.object({
    "org.example.tool-a": z.number(),
    "org.example.tool-b": z.object({
      "turn-up-to-11": z.boolean(),
    }),
  }).optional(),
})

const colorToken = {
  $type: 'color',
  $value: {
    colorSpace: 'srgb',
    components: [0, 0, 0],
    alpha: 1,
    hex: '#000000',
  },
}

const validatedColorToken = await validate(schema.ColorToken, colorToken)


const aliasToken = {
  $type: 'alias',
  $value: '{color.black}',
}

const validatedAliasToken = await validate(schema.AliasToken, aliasToken)

// or validate any tokens
const validatedDesignToken = await validate(schema.DesignToken, colorToken)
const validatedDesignToken = await validate(schema.DesignToken, aliasToken)
```

## License

MIT
