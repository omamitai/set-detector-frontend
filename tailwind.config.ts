
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'sans': ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
				'poppins': ['Poppins', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				set: {
					purple: '#5856D6',  // Deep purple
					lavender: '#C7C2F9', // Secondary pastel lavender
					green: '#30D158',   // Vivid green 
					red: '#FF453A',    // Bold red
					dark: '#1C1C1E',    // Dark navy
					gray: '#636366',    // Soft gray
					light: '#F8FAFC',   // Light background
					yellow: '#FFD60A',  // Bright yellow for accents
					blue: '#0A84FF',    // Bright blue for accents
					'purple-gradient': 'linear-gradient(135deg, #5856D6, #7A78E2)',
					'green-gradient': 'linear-gradient(135deg, #30D158, #4FE076)',
					'red-gradient': 'linear-gradient(135deg, #FF453A, #FF6B63)'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'2xl': '1.5rem',
				'3xl': '2rem',
			},
			scale: {
				'95': '0.95',
				'102': '1.02',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'fade-out': {
					'0%': { opacity: '1' },
					'100%': { opacity: '0' }
				},
				'slide-in-up': {
					'0%': { transform: 'translateY(10%)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'slide-in-down': {
					'0%': { transform: 'translateY(-10%)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'scan-line': {
					'0%': { transform: 'translateY(0%)', opacity: '0.3' },
					'50%': { opacity: '0.7' },
					'100%': { transform: 'translateY(100%)', opacity: '0.3' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'bounce-subtle': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-3px)' }
				},
				'pulse': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.05)' }
				},
				'rotate-subtle': {
					'0%': { transform: 'rotate(0deg)' },
					'25%': { transform: 'rotate(3deg)' },
					'75%': { transform: 'rotate(-3deg)' },
					'100%': { transform: 'rotate(0deg)' }
				},
				'shimmer': {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-8px)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'fade-out': 'fade-out 0.3s ease-out',
				'slide-in-up': 'slide-in-up 0.4s ease-out',
				'slide-in-down': 'slide-in-down 0.4s ease-out',
				'scan-line': 'scan-line 2s linear infinite',
				'scale-in': 'scale-in 0.3s ease-out',
				'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
				'pulse': 'pulse 2s ease-in-out infinite',
				'rotate-subtle': 'rotate-subtle 3s ease-in-out infinite',
				'shimmer': 'shimmer 3s linear infinite',
				'float': 'float 4s ease-in-out infinite'
			},
			backgroundImage: {
				'set-gradient': 'linear-gradient(135deg, rgba(88, 86, 214, 0.5), rgba(48, 209, 88, 0.5), rgba(255, 69, 58, 0.5))',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
