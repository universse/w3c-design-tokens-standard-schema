import { z } from 'zod/v4'

// Values

const AliasValue = z.templateLiteral(['{', z.string(), '}'])

export type AliasValue = z.infer<typeof AliasValue>

const NumberValue = z.number()

export type NumberValue = z.infer<typeof NumberValue>

const BooleanValue = z.boolean()

export type BooleanValue = z.infer<typeof BooleanValue>

const BaseColorValue = z.object({
	alpha: NumberValue.gte(0).lte(1).optional(),
	hex: z
		.string()
		.regex(/^#[0-9a-f]{6}$/i)
		.optional(),
})

const NoneKeyword = z.literal('none')

const ColorValue = z.discriminatedUnion('colorSpace', [
	BaseColorValue.extend({
		colorSpace: z.literal('srgb'),
		components: z.tuple([
			z.union([NumberValue.gte(0).lte(1), NoneKeyword]),
			z.union([NumberValue.gte(0).lte(1), NoneKeyword]),
			z.union([NumberValue.gte(0).lte(1), NoneKeyword]),
		]),
	}),
	BaseColorValue.extend({
		colorSpace: z.literal('srgb-linear'),
		components: z.tuple([
			z.union([NumberValue.gte(0).lte(1), NoneKeyword]),
			z.union([NumberValue.gte(0).lte(1), NoneKeyword]),
			z.union([NumberValue.gte(0).lte(1), NoneKeyword]),
		]),
	}),
	BaseColorValue.extend({
		colorSpace: z.literal('hsl'),
		components: z.tuple([
			z.union([NumberValue.gte(0).lt(360), NoneKeyword]),
			z.union([NumberValue.gte(0).lte(100), NoneKeyword]),
			z.union([NumberValue.gte(0).lte(100), NoneKeyword]),
		]),
	}),
	BaseColorValue.extend({
		colorSpace: z.literal('hwb'),
		components: z.tuple([
			z.union([NumberValue.gte(0).lt(360), NoneKeyword]),
			z.union([NumberValue.gte(0).lte(100), NoneKeyword]),
			z.union([NumberValue.gte(0).lte(100), NoneKeyword]),
		]),
	}),
	BaseColorValue.extend({
		colorSpace: z.literal('lab'),
		components: z.tuple([
			z.union([NumberValue.gte(0).lte(100), NoneKeyword]),
			z.union([
				NumberValue.gte(Number.MIN_VALUE).lte(Number.MAX_VALUE),
				NoneKeyword,
			]),
			z.union([
				NumberValue.gte(Number.MIN_VALUE).lte(Number.MAX_VALUE),
				NoneKeyword,
			]),
		]),
	}),
	BaseColorValue.extend({
		colorSpace: z.literal('lch'),
		components: z.tuple([
			z.union([NumberValue.gte(0).lte(100), NoneKeyword]),
			z.union([NumberValue.gte(0).lte(Number.MAX_VALUE), NoneKeyword]),
			z.union([NumberValue.gte(0).lt(360), NoneKeyword]),
		]),
	}),
	BaseColorValue.extend({
		colorSpace: z.literal('oklab'),
		components: z.tuple([
			z.union([NumberValue.gte(0).lte(1), NoneKeyword]),
			z.union([
				NumberValue.gte(Number.MIN_VALUE).lte(Number.MAX_VALUE),
				NoneKeyword,
			]),
			z.union([
				NumberValue.gte(Number.MIN_VALUE).lte(Number.MAX_VALUE),
				NoneKeyword,
			]),
		]),
	}),
	BaseColorValue.extend({
		colorSpace: z.literal('oklch'),
		components: z.tuple([
			z.union([NumberValue.gte(0).lte(1), NoneKeyword]),
			z.union([NumberValue.gte(0).lte(Number.MAX_VALUE), NoneKeyword]),
			z.union([NumberValue.gte(0).lt(360), NoneKeyword]),
		]),
	}),
	BaseColorValue.extend({
		colorSpace: z.literal('display-p3'),
		components: z.tuple([
			z.union([NumberValue.gte(0).lte(1), NoneKeyword]),
			z.union([NumberValue.gte(0).lte(1), NoneKeyword]),
			z.union([NumberValue.gte(0).lte(1), NoneKeyword]),
		]),
	}),
	BaseColorValue.extend({
		colorSpace: z.literal('a98-rgb'),
		components: z.tuple([
			z.union([NumberValue.gte(0).lte(1), NoneKeyword]),
			z.union([NumberValue.gte(0).lte(1), NoneKeyword]),
			z.union([NumberValue.gte(0).lte(1), NoneKeyword]),
		]),
	}),
	BaseColorValue.extend({
		colorSpace: z.literal('prophoto-rgb'),
		components: z.tuple([
			z.union([NumberValue.gte(0).lte(1), NoneKeyword]),
			z.union([NumberValue.gte(0).lte(1), NoneKeyword]),
			z.union([NumberValue.gte(0).lte(1), NoneKeyword]),
		]),
	}),
	BaseColorValue.extend({
		colorSpace: z.literal('rec2020'),
		components: z.tuple([
			z.union([NumberValue.gte(0).lte(1), NoneKeyword]),
			z.union([NumberValue.gte(0).lte(1), NoneKeyword]),
			z.union([NumberValue.gte(0).lte(1), NoneKeyword]),
		]),
	}),
	BaseColorValue.extend({
		colorSpace: z.literal('xyz-d65'),
		components: z.tuple([
			z.union([NumberValue.gte(0).lte(1), NoneKeyword]),
			z.union([NumberValue.gte(0).lte(1), NoneKeyword]),
			z.union([NumberValue.gte(0).lte(1), NoneKeyword]),
		]),
	}),
	BaseColorValue.extend({
		colorSpace: z.literal('xyz-d50'),
		components: z.tuple([
			z.union([NumberValue.gte(0).lte(1), NoneKeyword]),
			z.union([NumberValue.gte(0).lte(1), NoneKeyword]),
			z.union([NumberValue.gte(0).lte(1), NoneKeyword]),
		]),
	}),
])

export type ColorValue = z.infer<typeof ColorValue>

const DimensionValue = z.object({
	value: NumberValue,
	unit: z.enum(['px', 'rem']),
})

export type DimensionValue = z.infer<typeof DimensionValue>

const FontFamilyValue = z.union([z.string(), z.array(z.string())])

export type FontFamilyValue = z.infer<typeof FontFamilyValue>

const FontWeightValue = z.union([
	NumberValue.gte(1).lte(1000),
	z.enum([
		'thin',
		'hairline',
		'extra-light',
		'ultra-light',
		'light',
		'normal',
		'regular',
		'book',
		'medium',
		'semi-bold',
		'demi-bold',
		'bold',
		'extra-bold',
		'ultra-bold',
		'black',
		'heavy',
		'extra-black',
		'ultra-black',
	]),
])

export type FontWeightValue = z.infer<typeof FontWeightValue>

const DurationValue = z.object({
	value: NumberValue,
	unit: z.enum(['ms', 's']),
})

export type DurationValue = z.infer<typeof DurationValue>

const CubicBezierValue = z.tuple([
	NumberValue,
	NumberValue,
	NumberValue,
	NumberValue,
])

export type CubicBezierValue = z.infer<typeof CubicBezierValue>

const StrokeStyleValue = z.union([
	z.enum([
		'solid',
		'dashed',
		'dotted',
		'double',
		'groove',
		'ridge',
		'outset',
		'inset',
	]),
	z.object({
		dasharray: z.array(DimensionValue),
		linecap: z.enum(['round', 'butt', 'square']),
	}),
])

export type StrokeStyleValue = z.infer<typeof StrokeStyleValue>

const BorderValue = z.object({
	color: z.union([ColorValue, AliasValue]),
	width: z.union([DimensionValue, AliasValue]),
	style: z.union([StrokeStyleValue, AliasValue]),
})

export type BorderValue = z.infer<typeof BorderValue>

const TransitionValue = z.object({
	duration: z.union([DurationValue, AliasValue]),
	delay: z.union([DurationValue, AliasValue]),
	timingFunction: z.union([CubicBezierValue, AliasValue]),
})

export type TransitionValue = z.infer<typeof TransitionValue>

const SingleShadowValue = z.object({
	color: ColorValue,
	offsetX: DimensionValue,
	offsetY: DimensionValue,
	blur: DimensionValue,
	spread: DimensionValue,
	inset: BooleanValue.optional().default(false),
})

export type SingleShadowValue = z.infer<typeof SingleShadowValue>

const ShadowValue = z.union([SingleShadowValue, z.array(SingleShadowValue)])

export type ShadowValue = z.infer<typeof ShadowValue>

const GradientValue = z.array(
	z.object({
		color: z.union([ColorValue, AliasValue]),
		position: z.union([NumberValue.gte(0).lte(1), AliasValue]),
	}),
)

export type GradientValue = z.infer<typeof GradientValue>

const TypographyValue = z.object({
	fontFamily: z.union([FontFamilyValue, AliasValue]),
	fontSize: z.union([DimensionValue, AliasValue]),
	fontWeight: z.union([FontWeightValue, AliasValue]),
	letterSpacing: z.union([DimensionValue, AliasValue]),
	lineHeight: z.union([NumberValue, AliasValue]),
})

export type TypographyValue = z.infer<typeof TypographyValue>

// Types

const ColorType = z.literal('color')
const DimensionType = z.literal('dimension')
const FontFamilyType = z.literal('fontFamily')
const FontWeightType = z.literal('fontWeight')
const DurationType = z.literal('duration')
const CubicBezierType = z.literal('cubicBezier')
const NumberType = z.literal('number')
const StrokeStyleType = z.literal('strokeStyle')
const BorderType = z.literal('border')
const TransitionType = z.literal('transition')
const ShadowType = z.literal('shadow')
const GradientType = z.literal('gradient')
const TypographyType = z.literal('typography')

export function createSchema({
	extensionsSchema,
}: { extensionsSchema?: z.ZodObject | z.ZodOptional<z.ZodObject> } = {}) {
	const BaseToken = extensionsSchema
		? z.object({
				$description: z.string().optional(),
				$extensions: extensionsSchema,
				$deprecated: z.union([z.string(), z.boolean()]).optional(),
			})
		: z.object({
				$description: z.string().optional(),
				$deprecated: z.union([z.string(), z.boolean()]).optional(),
			})

	const AliasToken = BaseToken.extend({
		$type: z
			.union([
				ColorType,
				DimensionType,
				FontFamilyType,
				FontWeightType,
				DurationType,
				CubicBezierType,
				NumberType,
				StrokeStyleType,
				BorderType,
				TransitionType,
				ShadowType,
				GradientType,
				TypographyType,
			])
			.optional(),
		$value: AliasValue,
	})

	const ColorToken = BaseToken.extend({
		$type: ColorType,
		$value: ColorValue,
	})

	const DimensionToken = BaseToken.extend({
		$type: DimensionType,
		$value: DimensionValue,
	})

	const FontFamilyToken = BaseToken.extend({
		$type: FontFamilyType,
		$value: FontFamilyValue,
	})

	const FontWeightToken = BaseToken.extend({
		$type: FontWeightType,
		$value: FontWeightValue,
	})

	const DurationToken = BaseToken.extend({
		$type: DurationType,
		$value: DurationValue,
	})

	const CubicBezierToken = BaseToken.extend({
		$type: CubicBezierType,
		$value: CubicBezierValue,
	})

	const NumberToken = BaseToken.extend({
		$type: NumberType,
		$value: NumberValue,
	})

	const StrokeStyleToken = BaseToken.extend({
		$type: StrokeStyleType,
		$value: StrokeStyleValue,
	})

	const BorderToken = BaseToken.extend({
		$type: BorderType,
		$value: BorderValue,
	})

	const TransitionToken = BaseToken.extend({
		$type: TransitionType,
		$value: TransitionValue,
	})

	const ShadowToken = BaseToken.extend({
		$type: ShadowType,
		$value: ShadowValue,
	})

	const GradientToken = BaseToken.extend({
		$type: GradientType,
		$value: GradientValue,
	})

	const TypographyToken = BaseToken.extend({
		$type: TypographyType,
		$value: TypographyValue,
	})

	const DesignToken = z.union([
		ColorToken,
		DimensionToken,
		FontFamilyToken,
		FontWeightToken,
		DurationToken,
		CubicBezierToken,
		NumberToken,
		StrokeStyleToken,
		BorderToken,
		TransitionToken,
		ShadowToken,
		GradientToken,
		TypographyToken,
		AliasToken,
	])

	const NestedDesignTokens: z.ZodType = z.lazy(() =>
		z.union([DesignToken, z.record(z.string(), NestedDesignTokens)]),
	)

	const DesignTokenTree = z.record(z.string(), NestedDesignTokens)

	return {
		AliasToken,
		ColorToken,
		DimensionToken,
		FontFamilyToken,
		FontWeightToken,
		DurationToken,
		CubicBezierToken,
		NumberToken,
		StrokeStyleToken,
		BorderToken,
		TransitionToken,
		ShadowToken,
		GradientToken,
		TypographyToken,
		DesignToken,
		DesignTokenTree,
	}
}

export type Schema = {
	[K in keyof ReturnType<typeof createSchema>]: z.infer<
		ReturnType<typeof createSchema>[K]
	>
}
