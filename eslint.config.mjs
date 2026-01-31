import { dirname } from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"
import prettier from "eslint-plugin-prettier"
import tailwindcss from "eslint-plugin-tailwindcss"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
	baseDirectory: __dirname,
})

const eslintConfig = [
	...compat.extends("next/core-web-vitals", "next/typescript"),
	...compat.extends("prettier"),
	{
		plugins: {
			prettier: prettier,
			tailwindcss: tailwindcss,
		},
		rules: {
			"prettier/prettier": "error",
			"tailwindcss/classnames-order": "warn",
			"tailwindcss/no-custom-classname": "off",
		},
	},
]

export default eslintConfig
