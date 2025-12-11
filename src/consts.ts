import type { IconMap, SocialLink, Site } from '@/types'

export const SITE: Site = {
  title: "Kinntaku's Blog",
  description:
    "Kinntaku's Blog.",
  href: 'https://kinntaku.github.io/',
  author: 'Kinntaku',
  locale: 'zh-CN',
  featuredPostCount: 2,
  postsPerPage: 3,
}

export const NAV_LINKS: SocialLink[] = [

  {
    href: '/blog',
    label: 'blog',
  },
  {
    href: '/tags',
    label: 'tags',
  },
  {
    href: '/about',
    label: 'about',
  }
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'https://github.com/Kinntaku',
    label: 'GitHub',
  },
]

export const ICON_MAP: IconMap = {
  Website: 'lucide:globe',
  GitHub: 'lucide:github',
  LinkedIn: 'lucide:linkedin',
  Twitter: 'lucide:twitter',
  Email: 'lucide:mail',
  RSS: 'lucide:rss',
}
