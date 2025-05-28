import { defineConfig } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar';
import { neofoxPlugin } from './plugin-neofox';
import { hyperlinkPlugin } from './plugin-hyperlink';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "fennecs.tech",
  description: "tiny C# ECS",

  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Bai+Jamjuree:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&display=swap', rel: 'stylesheet' }],
    ['link', { href: 'https://mastodon.gamedev.place/@jupiter', rel: 'me' }],
    ['link', { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" }],
    ['link', { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" }],
    ['link', { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" }],
    ['link', { rel: "manifest", href: "/site.webmanifest" }],
    ['link', { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#142458" }],
    ['meta', { name: "pinterest-rich-pin", content: "false" }],
    ['meta', { name: "msapplication-TileColor", content: "#142458" }],
    ['meta', { name: "author", content: "⤜outfox⤏" }],
    ['meta', { name: "theme-color", content: "#222222" }],
    ['meta', { name: "twitter:card", content: "summary_large_image" }],    
    ['meta', { name: "twitter:title", content: "fennecs ... the little ECS that loves you back! ❤️" }],    
    ['meta', { name: "twitter:image", content: "https://fennecs.tech/img/meta-fennecs.png" }],    
    ['meta', { name: "twitter:image:alt", content: "fennecs entity component system, logotype, white on orange" }],    
    ['meta', { name: "twitter:description", content: "A free and open source Entity-Component System written in pure C#! fennecs is fun, fast, and plays nice with game engines!" }],        
    ['meta', { property: "og:title", content: "fennecs ... the little ECS that loves you back! ❤️" }],        
    ['meta', { property: "og:description", content: "A free and open source Entity-Component System written in pure C#! fennecs is fun, fast, and plays nice with game engines!" }],        
    ['meta', { property: "og:image", content: "https://fennecs.tech/img/meta-fennecs.png" }],        
    ['meta', { property: "twitter:image", content: "https://fennecs.tech/img/meta-fennecs.png" }],    
    ['meta', { property: "author", content: "⤜outfox⤏" }],
  ],

    
  markdown: {
    config: (md) => {
      md.use(neofoxPlugin, {});
      md.use(hyperlinkPlugin, {});
    }
  },


  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    footer: {
      message: '<a href="https://github.com/outfox/fennecs/?tab=MIT-1-ov-file#readme"><b>fenn</b>ecs</a> is released under the MIT License. <a href="https://volpeon.ink/emojis/neofox/">Neofox</a> is released under the CC BY-NC-SA 4.0 License.',
      copyright: '<b>fenn</b>ecs is made with love & foxes, copyright © 2025 <a href="https://github.com/outfox/fennecs/graphs/contributors"> its contributors</a>'
    },

    sidebar: generateSidebar([{
        sortMenusByFrontmatterOrder: true,
        useFolderLinkFromIndexFile: true,
        useTitleFromFrontmatter: true,
        useFolderTitleFromIndexFile: true,
        documentRootPath: '/',
        scanStartPath: '/',
        resolvePath: '/',
        includeRootIndexFile: false,
        collapseDepth: 1,
      }
    ]),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/outfox/fennecs' },
      { icon: 'discord', link: 'https://discord.gg/Bfx74WcVXW' },
      { icon: 'nuget', link: 'https://www.nuget.org/packages/fennecs/' }      
    ],
  }
})
