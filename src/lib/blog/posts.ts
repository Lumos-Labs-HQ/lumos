export type BlogPost = {
	id: number;
	slug: string;
	title: string;
	excerpt: string;
	content: string;
	author: string;
	date: string;
	readTime: string;
	image: string;
	tags: string[];
};

export function slugifyTitle(title: string): string {
	return title
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-')
		.replace(/^-|-$/g, '');
}

const fallbackImage = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800';

export const defaultPosts: BlogPost[] = [
	{
		id: 1,
		slug: 'building-flash-orm-a-journey-into-database-abstraction',
		title: 'Building Flash ORM: A Journey into Database Abstraction',
		excerpt: 'How we built a Prisma-like ORM for Go with multi-database support and type-safe code generation.',
		content: [
			'## Why We Built Flash ORM',
			'',
			'We wanted the developer experience of Prisma, but in Go and across multiple SQL dialects.',
			'',
			'## Core Design Goals',
			'',
			'- Type-safe query building',
			'- Schema-first workflow',
			'- Support for PostgreSQL, MySQL, and SQLite',
			'',
			'## Result',
			'',
			'Flash ORM now powers internal services and dramatically reduced hand-written SQL in our apps.'
		].join('\n'),
		author: 'Swarnendu Ghosh',
		date: '2026-02-20',
		readTime: '8 min read',
		image: fallbackImage,
		tags: ['Go', 'ORM', 'Database']
	},
	{
		id: 2,
		slug: 'the-future-of-ai-in-developer-tools',
		title: 'The Future of AI in Developer Tools',
		excerpt: 'Exploring how AI and LLMs are transforming the way we build software and developer experiences.',
		content: [
			'## AI as a Coding Partner',
			'',
			'LLMs are moving from autocomplete to design and architecture assistance.',
			'',
			'## What Changes for Teams',
			'',
			'- Faster prototyping',
			'- Better documentation generation',
			'- New review workflows for AI-generated code',
			'',
			'## Looking Ahead',
			'',
			'The best tools will blend human judgment with machine speed, not replace one with the other.'
		].join('\n'),
		author: 'Rana Dolui',
		date: '2026-02-18',
		readTime: '6 min read',
		image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
		tags: ['AI', 'LLM', 'DevTools']
	}
];

export function toBlogPost(raw: Record<string, unknown>): BlogPost {
	const title = String(raw.title ?? 'Untitled Post');
	const content = String(raw.content ?? '');
	const excerpt = String(raw.excerpt ?? content.slice(0, 150) + (content.length > 150 ? '...' : ''));
	const slugFromRaw = String(raw.slug ?? '').trim();

	return {
		id: Number(raw.id ?? Date.now()),
		slug: slugFromRaw || slugifyTitle(title) || String(Date.now()),
		title,
		excerpt,
		content,
		author: String(raw.author ?? 'Lumos Team'),
		date: String(raw.date ?? new Date().toISOString()),
		readTime: String(raw.readTime ?? '5 min read'),
		image: String(raw.image ?? raw.coverImage ?? fallbackImage),
		tags: Array.isArray(raw.tags) ? raw.tags.map((tag) => String(tag)) : []
	};
}
