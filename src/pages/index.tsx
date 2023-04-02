import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useRouter } from 'next/router'
import { LinkedinIcon, TwitterIcon } from 'next-share';
import { GoMarkGithub } from "react-icons/go";
import { SiGooglescholar } from "react-icons/si";
import { FaResearchgate } from "react-icons/fa";
import Icon from '@mdi/react';
import { mdiMastodon } from '@mdi/js';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();
  return (
    <div vocab="http://xmlns.com/foaf/0.1/" prefix="rdf: http://www.w3.org/1999/02/22-rdf-syntax-ns# rdfs: http://www.w3.org/2000/01/rdf-schema# foaf: http://xmlns.com/foaf/0.1/ owl: http://www.w3.org/2002/07/owl# xsd: http://www.w3.org/2001/XMLSchema# org: http://www.w3.org/ns/org# cert: http://www.w3.org/ns/auth/cert# schema: http://schema.org/ vcard: http://www.w3.org/2006/vcard/ns# solid: http://www.w3.org/ns/solid/terms# dct: http://purl.org/dc/terms/" >
      <Head>
        <title>Jesse Wright</title>
        <meta name="description" content="A website about Jesse Wright" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://avatars.githubusercontent.com/u/63333554" />
        <link rel="canonical" href={router.pathname} />
        <link rel="foaf:primaryTopic foaf:maker" href={`${router.pathname}#me`} />
      </Head>
      <main resource='#me' typeof="Person Agent schema:Person vcard:Individual">
      <h1>⚠️ This site is under construction ⚠️</h1>
        
        
        
        <div className={styles.description}>
          <div className={styles.profilePhoto}>
            <a property='isPrimaryTopicOf' href={router.pathname}>
              <Image
                src="https://avatars.githubusercontent.com/u/63333554"
                alt="Profile Photo"
                width={75}
                height={75}
                priority
                property='img vcard:hasPhoto'
                typeof='Image dct:Image'
                resource='https://avatars.githubusercontent.com/u/63333554'
              />
            </a>
          </div>
        </div>

        <div className={styles.center}>
          <div className={styles.centerText} property='name'>
            Jesse Wright
          </div>
        </div>

        <div>
          My preferred pronouns are <span property='solid:preferredSubjectPronoun'>he</span>/<span property='solid:preferredObjectPronoun'>him</span>/<span property='solid:preferredRelativePronoun'>his</span>. I often go by <span property='nick'>jeswr</span>.


          {/* @ts-ignore */}
          I speak <span property='schema:knowsLanguage' content='en-au'>English</span>.
        </div>


        {/* https://sfba.social/@jeswr/ */}
        {/* https://www.researchgate.net/profile/Jesse-Wright-5 */}
        {/* https://scholar.google.com.au/citations?user=J_HhOU8AAAAJ&hl=en&oi=sra */}

        <div className={styles.grid}>
          {/* <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Docs <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Find in-depth information about Next.js features and&nbsp;API.
            </p>
          </a>

          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Learn <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Learn about Next.js in an interactive course with&nbsp;quizzes!
            </p>
          </a>

          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Templates <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Discover and deploy boilerplate example Next.js&nbsp;projects.
            </p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Deploy <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Instantly deploy your Next.js site to a shareable URL
              with&nbsp;Vercel.
            </p>
          </a> */}
        </div>

      </main>
      <footer style={{ textAlign: 'center' }} about='#me'>
        &copy; 2023-{new Date(Date.now()).getUTCFullYear()} - Jesse Wright
        
        <br />
        This website contains RDFa annotations and uses content-negotiation to make it a valid Solid WebId Profile. Check out the contents <a href='https://rdf-play.rubensworks.net/#url=https%3A%2F%2Fwww.jeswr.org%2F'>here</a>; and query over my data in Solid <a href='https://comunica.github.io/comunica-feature-link-traversal-web-clients/builds/solid-default/#datasources=https%3A%2F%2Fwww.jeswr.org%2F%23me&query=CONSTRUCT%20WHERE%20%7B%0A%20%20%20%20%3Fs%20%3Fp%20%3Fo%0A%7D'>here</a>.  
        <br />

        <span>
          <a
            rel='account'
            typeof='OnlineAccount'
            title='LinkedIn'
            href='https://www.linkedin.com/in/jesse-wright-49823a132/'
            target='_blank'
          >
            <LinkedinIcon
              size={25}
            />

          </a>

          <a
            rel='account'
            typeof='OnlineAccount'
            title='GitHub'
            href='https://github.com/jeswr/'
            target='_blank'
          >
            <GoMarkGithub />
          </a>

          <a
            rel='account'
            typeof='OnlineAccount'
            title='Twitter'
            href='https://twitter.com/jesmwr'
            target='_blank'
          >
            <TwitterIcon size={25} />
          </a>

          <a
            rel='account'
            typeof='OnlineAccount'
            title='Google Scholar'
            href='https://scholar.google.com.au/citations?user=J_HhOU8AAAAJ'
            target='_blank'
          >
            <SiGooglescholar />
          </a>

          <a
            rel='account'
            typeof='OnlineAccount'
            title='ResearchGate'
            href='https://www.researchgate.net/profile/Jesse-Wright-5'
            target='_blank'
          >
            <FaResearchgate />
          </a>

          <a
            rel='account'
            typeof='OnlineAccount'
            title='Mastodon'
            href='https://sfba.social/@jeswr/'
            target='_blank'
          >
            <Icon path={mdiMastodon} size={1} />
          </a>
        </span>
        <span>
          Alternate Solid Profiles:
          <a
            property='sameAs isPrimaryTopicOf rdfs:seeAlso'
            typeof='Agent'
            href='https://id.inrupt.com/jeswr'
            target='_blank'
          >
            <Image
              src='https://login.inrupt.com/favicon.ico'
              alt='Inrupt PodSpaces'
              width={25}
              height={25}
              />
          </a>

          <a
            property='sameAs isPrimaryTopicOf rdfs:seeAlso'
            typeof='Agent'
            href='https://jeswr.solidcommunity.net/profile/card#me'
            target='_blank'
          >
            <Image
              src='https://solidcommunity.net/favicon.ico'
              alt='Solid Community'
              width={25}
              height={25}
              />
          </a>

          <a
            property='sameAs isPrimaryTopicOf rdfs:seeAlso'
            typeof='Agent'
            href='https://use.id/jeswr'
            target='_blank'
          >
            <Image
              src='https://app.use.id/logo.ico'
              alt='Use ID'
              width={25}
              height={25}
              />
          </a>
        </span>


      </footer>
    </div>
  )
}
