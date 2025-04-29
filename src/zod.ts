import { z } from 'zod'

// Values

const AliasValue = z.custom<`{${string}}`>((val) =>
	/^\{.*\}$/.test(val as string),
)

const NumberValue = z.number()

const BooleanValue = z.boolean()

const BaseColorValue = z.object({
	alpha: NumberValue.gte(0).lte(1).optional(),
	hex: z
		.string()
		.regex(/^#[0-9a-f]{6}$/i)
		.optional(),
})

const NoneKeyword = z.literal('none')

const ColorSpaceValue = z.discriminatedUnion('colorSpace', [
	z.object({
		colorSpace: z.literal('srgb'),
		components: z.tuple([
			z.union([NumberValue.gte(0).lte(1), NoneKeyword]),
			z.union([NumberValue.gte(0).lte(1), NoneKeyword]),
			z.union([NumberValue.gte(0).lte(1), NoneKeyword]),
		]),
	}),
	z.object({
		colorSpace: z.literal('srgb-linear'),
		components: z.tuple([
			z.union([NumberValue.gte(0).lte(1), NoneKeyword]),
			z.union([NumberValue.gte(0).lte(1), NoneKeyword]),
			z.union([NumberValue.gte(0).lte(1), NoneKeyword]),
		]),
	}),
	z.object({
		colorSpace: z.literal('hsl'),
		components: z.tuple([
			z.union([NumberValue.gte(0).lt(360), NoneKeyword]),
			z.union([NumberValue.gte(0).lte(100), NoneKeyword]),
			z.union([NumberValue.gte(0).lte(100), NoneKeyword]),
		]),
	}),
	z.object({
		colorSpace: z.literal('hwb'),
		components: z.tuple([
			z.union([NumberValue.gte(0).lt(360), NoneKeyword]),
			z.union([NumberValue.gte(0).lte(100), NoneKeyword]),
			z.union([NumberValue.gte(0).lte(100), NoneKeyword]),
		]),
	}),
	z.object({
		colorSpace: z.literal('lab'),
		components: z.tuple([
			z.union([NumberValue.gte(0).lte(100), NoneKeyword]),
			z.union([
				NumberValue.gte(Number.NEGATIVE_INFINITY).lte(Number.POSITIVE_INFINITY),
				NoneKeyword,
			]),
			z.union([
				NumberValue.gte(Number.NEGATIVE_INFINITY).lte(Number.POSITIVE_INFINITY),
				NoneKeyword,
			]),
		]),
	}),
	z.object({
		colorSpace: z.literal('lch'),
		components: z.tuple([
			z.union([NumberValue.gte(0).lte(100), NoneKeyword]),
			z.union([NumberValue.gte(0).lte(Number.POSITIVE_INFINITY), NoneKeyword]),
			z.union([NumberValue.gte(0).lt(360), NoneKeyword]),
		]),
	}),
	z.object({
		colorSpace: z.literal('oklab'),
		components: z.tuple([
			z.union([NumberValue.gte(0).lte(1), NoneKeyword]),
			z.union([
				NumberValue.gte(Number.NEGATIVE_INFINITY).lte(Number.POSITIVE_INFINITY),
				NoneKeyword,
			]),
			z.union([
				NumberValue.gte(Number.NEGATIVE_INFINITY).lte(Number.POSITIVE_INFINITY),
				NoneKeyword,
			]),
		]),
	}),
	z.object({
		colorSpace: z.literal('oklch'),
		components: z.tuple([
			z.union([NumberValue.gte(0).lte(1), NoneKeyword]),
			z.union([NumberValue.gte(0).lte(Number.POSITIVE_INFINITY), NoneKeyword]),
			z.union([NumberValue.gte(0).lt(360), NoneKeyword]),
		]),
	}),
	z.object({
		colorSpace: z.literal('display-p3'),
		components: z.tuple([
			z.union([NumberValue.gte(0).lte(1), NoneKeyword]),
			z.union([NumberValue.gte(0).lte(1), NoneKeyword]),
			z.union([NumberValue.gte(0).lte(1), NoneKeyword]),
		]),
	}),
	z.object({
		colorSpace: z.literal('a98-rgb'),
		components: z.tuple([
			z.union([NumberValue.gte(0).lte(1), NoneKeyword]),
			z.union([NumberValue.gte(0).lte(1), NoneKeyword]),
			z.union([NumberValue.gte(0).lte(1), NoneKeyword]),
		]),
	}),
	z.object({
		colorSpace: z.literal('prophoto-rgb'),
		components: z.tuple([
			z.union([NumberValue.gte(0).lte(1), NoneKeyword]),
			z.union([NumberValue.gte(0).lte(1), NoneKeyword]),
			z.union([NumberValue.gte(0).lte(1), NoneKeyword]),
		]),
	}),
	z.object({
		colorSpace: z.literal('rec2020'),
		components: z.tuple([
			z.union([NumberValue.gte(0).lte(1), NoneKeyword]),
			z.union([NumberValue.gte(0).lte(1), NoneKeyword]),
			z.union([NumberValue.gte(0).lte(1), NoneKeyword]),
		]),
	}),
	z.object({
		colorSpace: z.literal('xyz-d65'),
		components: z.tuple([
			z.union([NumberValue.gte(0).lte(1), NoneKeyword]),
			z.union([NumberValue.gte(0).lte(1), NoneKeyword]),
			z.union([NumberValue.gte(0).lte(1), NoneKeyword]),
		]),
	}),
	z.object({
		colorSpace: z.literal('xyz-d50'),
		components: z.tuple([
			z.union([NumberValue.gte(0).lte(1), NoneKeyword]),
			z.union([NumberValue.gte(0).lte(1), NoneKeyword]),
			z.union([NumberValue.gte(0).lte(1), NoneKeyword]),
		]),
	}),
])

const ColorValue = z.intersection(ColorSpaceValue, BaseColorValue)

const DimensionValue = z.object({
	value: NumberValue,
	unit: z.enum(['px', 'rem']),
})

const FontFamilyValue = z.union([z.string(), z.array(z.string())])

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

const DurationValue = z.object({
	value: NumberValue,
	unit: z.enum(['ms', 's']),
})

const CubicBezierValue = z.tuple([
	NumberValue,
	NumberValue,
	NumberValue,
	NumberValue,
])

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

const BorderValue = z.object({
	color: z.union([ColorValue, AliasValue]),
	width: z.union([DimensionValue, AliasValue]),
	style: z.union([StrokeStyleValue, AliasValue]),
})

const TransitionValue = z.object({
	duration: z.union([DurationValue, AliasValue]),
	delay: z.union([DurationValue, AliasValue]),
	timingFunction: z.union([CubicBezierValue, AliasValue]),
})

const SingleShadowValue = z.object({
	color: ColorValue,
	offsetX: DimensionValue,
	offsetY: DimensionValue,
	blur: DimensionValue,
	spread: DimensionValue,
	inset: BooleanValue.optional().default(false),
})

const ShadowValue = z.union([SingleShadowValue, z.array(SingleShadowValue)])

const GradientValue = z.array(
	z.object({
		color: z.union([ColorValue, AliasValue]),
		position: z.union([NumberValue.gte(0).lte(1), AliasValue]),
	}),
)

const TypographyValue = z.object({
	fontFamily: z.union([FontFamilyValue, AliasValue]),
	fontSize: z.union([DimensionValue, AliasValue]),
	fontWeight: z.union([FontWeightValue, AliasValue]),
	letterSpacing: z.union([DimensionValue, AliasValue]),
	lineHeight: z.union([NumberValue, AliasValue]),
})

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

export function createSchema<
	Extensions extends z.AnyZodObject | z.ZodOptional<z.AnyZodObject>,
>({ extensionSchema }: { extensionSchema?: Extensions } = {}) {
	const BaseToken = extensionSchema
		? z.object({
				$description: z.string().optional(),
				$extensions: extensionSchema,
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

	const NestedDesignTokens: z.ZodType<any> = z.lazy(() =>
		z.union([DesignToken, z.record(NestedDesignTokens)]),
	)

	const DesignTokenTree = z.record(NestedDesignTokens)

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
