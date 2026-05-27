import type { Metadata } from "next";
import ClientThemeLayout from "@/layouts/ClientThemeLayout";

export const metadata: Metadata = { title: "About" };

export default function About() {
  return (
    <ClientThemeLayout currentPage="about">
      <main className="p-8">
        <h2 className="text-2xl mb-4">About Amor | 关于阿漠</h2>
        <div>
          <p className="mb-2">Hey! This is Amor.</p>
          <p className="mb-2">And welcome to my little blog&apos;s about page :3</p>
          <p className="mb-2">This is like my little journal where I write about life, books, and whatever random interesting stuff. I like the feeling of writing and the "eventually making sense of things through writing" (and it&apos;s fun to look back at what happened years ago), so instead of flooding my social media pages (introvert problems... ;-;), I made this space <span className="strikethrough">to spam however I want</span> where I just be me.</p>
          <p className="mb-2">As for an intro to myself, I'm 22, I'm an ISTJ. I got my master's degree in Electronic Engineering in 2025, and now work as a junior developer in Bristol. I enjoy things like coffee, reading, running, Formula 1, playing Go and blogging. I write a bit in both English and Mandarin, and I&apos;m slowly picking up Spanish and Korean. </p>
          <p className="mb-2">...if you are reading this, I hope you enjoy it! And let&apos;s be friends... 0w0</p>
          <br />
          <p className="mb-2">Socials...?</p>
          <div className="mb-4">
            <div>
              <a href="https://instagram.com/amor.zh39/" target="_blank" rel="noopener noreferrer" className="custom-blue"><i className="fab fa-instagram mr-2"></i>Instagram</a>
            </div>
            <div>
              <a href="mailto:amor_7303@163.com" target="_blank" rel="noopener noreferrer" className="custom-blue"><i className="far fa-envelope mr-2"></i>Email</a>
            </div>
            <div>
              <a href="https://github.com/AmorZhao" target="_blank" rel="noopener noreferrer" className="custom-blue"><i className="fab fa-github mr-2"></i>GitHub</a>
            </div>
            <div>
              <a href="https://amor-zhao.notion.site/Amor-s-Dashboard-33d838340d45480980835d213c19ea5a" target="_blank" rel="noopener noreferrer" className="custom-blue"><i className="fa-solid fa-n mr-2"></i>Notion Dashboard</a>
            </div>
          </div>
          <br />
          <hr className="custom-border"/>
          <br />
          <h2 className="text-xl mb-4">About This Site | 关于本页</h2>
          <div>
            <p className="mb-2">
              This blog is built with <a href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer" className="custom-blue">Next.js</a> and hosted on <a href="https://vercel.com/docs" target="_blank" rel="noopener noreferrer" className="custom-blue">Vercel</a>. Styling is done with <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer" className="custom-blue">Tailwind CSS</a>, <a href="https://react.dev/learn" target="_blank" rel="noopener noreferrer" className="custom-blue">React</a>,
              <a href="https://fontawesome.com" target="_blank" rel="noopener noreferrer" className="custom-blue"> Font Awesome</a>, and <a href="https://fonts.google.com/" target="_blank" rel="noopener noreferrer" className="custom-blue">Google Fonts</a> (Lora for English, Noto Serif for Simplified Chinese).
              I also used <a href="https://ui.shadcn.com/docs" target="_blank" rel="noopener noreferrer" className="custom-blue">shadcn</a> and <a href="https://motion.dev/docs" target="_blank" rel="noopener noreferrer" className="custom-blue">Framer Motion</a> for UI and animations.
            </p>
            <p className="mb-2">
              Blog posts are loaded directly from markdown files. I&apos;ve migrated some older diary files to a <a href="https://turso.tech" target="_blank" rel="noopener noreferrer" className="custom-blue">Turso</a> database, so the API can fetch data from there. The next steps would be adding a <a href="https://developers.cloudflare.com/" target="_blank" rel="noopener noreferrer" className="custom-blue">Cloudflare CDN</a> for image hosting, migrating the rest of the data to the database, linking tags and images, etc. Also the current API management is a bit messy, definitely need to clean that up.
            </p>
            <p className="mb-2">
              (...Might add a few more features later? Thinking about a search bar and maybe some built-in translation options blablabla...)
            </p>
            <p className="mb-2">
              A bit of TMI: A few years ago I built a personal blog using <a href="https://hexo.io/" target="_blank" rel="noopener noreferrer" className="custom-blue">Hexo</a> on my old GitHub account (<span className="italic">thisisamor.github.io</span>, yes, this blog is named after its predecessor). But... let&apos;s just say I spammed a little <span className="italic">too</span> much without organising it well. Plus I wanted more flexibility without being restricted by the original setup. So I ended up deleting it and starting fresh and ...hopefully getting things right this time. :3
            </p>
          </div>
          <br />
          <hr className="custom-border"/>
          <br />
          <h2 className="text-xl mb-4">Amor&apos;s Friends | 阿漠的友链</h2>
          <p className="mb-2">
            <a href="https://xiaorandaisyyu.github.io" target="_blank" rel="noopener noreferrer" className="custom-blue"><i className="fa-regular fa-heart mr-2"></i>Daisy&apos;s homepage</a>
          </p>
        </div>
      </main>
    </ClientThemeLayout>
  );
}
