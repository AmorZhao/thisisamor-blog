import type { Config } from "tailwindcss";
import * as palette from "./styles/colors";
/** @type {import('tailwindcss').Config} */

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ['selector', '[data-theme*="dark"]'],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			grey: {
  				50: palette.grey50,
  				100: palette.grey100,
  				150: palette.grey150,
  				200: palette.grey200,
  				300: palette.grey300,
  				350: palette.grey350,
  				500: palette.grey500,
  				600: palette.grey600,
  				650: palette.grey650,
  				700: palette.grey700,
  				800: palette.grey800,
  				850: palette.grey850,
  				900: palette.grey900,
  				950: palette.grey950
  			},
  			blue: {
  				100: palette.blue100,
  				400: palette.blue400,
  				500: palette.blue500
  			},
  			y2k: {
  				'light-bg': palette.y2kLightBg,
  				'light-text': palette.y2kLightText,
  				'light-blue': palette.y2kLightBlue,
  				'light-grey': palette.y2kLightGrey,
  				'dark-bg': palette.y2kDarkBg,
  				'dark-text': palette.y2kDarkText,
  				'dark-blue': palette.y2kDarkBlue,
  				'dark-grey': palette.y2kDarkGrey,
  				'dark-cyan': palette.y2kDarkCyan,
  				'dark-panel': palette.y2kDarkPanel
  			},
  			win95: {
  				face: palette.win95Face,
  				highlight: palette.win95Highlight,
  				shadow: palette.win95Shadow,
  				'shadow-dark': palette.win95ShadowDark
  			}
  		},
  		fontFamily: {
  			'noto': [
  				'Lora',
  				'Noto_Serif_SC',
  				'serif'
  			],
  			'noto-medium': [
  				'Lora-Medium',
  				'Noto_Serif_SC-Medium',
  				'serif'
  			],
  			'noto-semibold': [
  				'Lora-SemiBold',
  				'Noto_Serif_SC-SemiBold',
  				'serif'
  			],
  			'noto-bold': [
  				'Lora-Bold',
  				'Noto_Serif_SC-Bold',
  				'serif-bold'
  			],
  			'noto-light': [
  				'Noto_Serif_SC-Light',
  				'serif-light'
  			]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
