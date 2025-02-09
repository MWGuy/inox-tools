import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import vercel from '@astrojs/vercel/serverless';
import starWarp from '@inox-tools/star-warp';
import starlightLinksValidator from 'starlight-links-validator';

process.env.ASTRO_PROJECT_ROOT = new URL('../', import.meta.url).toString();

const SITE =
	process.env.VERCEL_ENV !== 'production' && process.env.VERCEL_URL
		? `https://${process.env.VERCEL_URL}`
		: 'https://inox-tools.fryuni.dev';

// https://astro.build/config
export default defineConfig({
	output: 'hybrid',
	adapter: vercel({
		skewProtection: true,
	}),
	site: SITE,
	trailingSlash: 'never',
	integrations: [
		starlight({
			title: 'Inox Tools',
			credits: true,
			favicon: '/favicon.png',
			social: {
				github: 'https://github.com/Fryuni/inox-tools',
				discord: 'https://discord.com/channels/830184174198718474/1197638002764152843',
			},
			components: {
				Head: './src/components/Head.astro',
				PageTitle: './src/components/PageTitle.astro',
				Sidebar: './src/components/Sidebar.astro',
			},
			sidebar: [
				{
					label: 'BETA Docs (Astro 5)',
					link: 'https://inox-tools-git-feat-astro-5-fryuni-pro.vercel.app/',
				},
				{
					label: 'Tiny and Cute Integrations',
					collapsed: false,
					items: [
						{
							label: 'Custom Astro Routing',
							link: '/custom-routing',
						},
						{
							label: 'Sitemap Extensions',
							link: '/sitemap-ext',
						},
						{
							label: 'Astro When',
							link: '/astro-when',
						},
						{
							label: 'Runtime Logger',
							link: '/runtime-logger',
						},
						{
							label: 'Star Warp',
							link: '/star-warp',
						},
						{
							label: 'Request State',
							link: '/request-state',
						},
						{
							label: 'Request Nanostores',
							link: '/request-nanostores',
						},
						{
							label: 'Cut Short',
							link: '/cut-short',
						},
						{
							label: 'Portal Gun',
							link: '/portal-gun',
						},
						{
							label: 'Content Utilities',
							collapsed: false,
							autogenerate: {
								directory: 'content-utils',
							},
						},
					],
				},
				{
					label: 'Tools for Authors',
					collapsed: false,
					items: [
						{
							label: 'Astro Integration Kit',
							link: 'https://astro-integration-kit.netlify.app',
						},
						{
							label: 'Astro Tests',
							link: '/astro-tests',
						},
						{
							label: 'Modular Station',
							collapsed: false,
							autogenerate: {
								directory: 'modular-station',
							},
						},
						{
							label: 'Inline Module',
							collapsed: true,
							autogenerate: { directory: 'inline-mod' },
						},
					],
				},
			],
			plugins: [
				starlightLinksValidator({
					errorOnRelativeLinks: true,
				}),
				starWarp(),
			],
		}),
	],
	redirects: {
		'/content-utils': '/content-utils/integration',
		'/content-utils/git-time': '/content-utils/git',
		'/modular-station': '/modular-station/api',
	},
});
