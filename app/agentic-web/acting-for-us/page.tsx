// AUTHORED-BY Claude
import type { Metadata } from "next";

import Image from "next/image";
import Link from "next/link";

import styles from "../agentic-web.module.css";

export const metadata: Metadata = {
  title: "Letting Software Agents Act for Us",
  description:
    "Agents can already use our apps and talk to one another. Acting for us across organisations also needs shared meaning, clear permission and someone to answer when things go wrong. Review draft.",
  openGraph: {
    title: "Letting Software Agents Act for Us",
    description:
      "Agents can already use our apps and talk to one another. Acting for us across organisations also needs shared meaning, clear permission and someone to answer when things go wrong. Review draft.",
    type: "article",
  },
};

/**
 * The vision paper "Letting Software Agents Act for Us" (review draft, 12
 * October 2026). Body text, figure and references follow the manuscript
 * verbatim; only the review note above the contents is web-specific.
 */
export default function ActingForUsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.pageShell}>
        <header className={styles.masthead}>
          <span className={styles.eyebrow}>Vision paper — review draft</span>
          <h1 className={styles.mastheadTitle}>
            Letting Software Agents Act for Us
          </h1>
          <p className={styles.subtitle}>
            Agents can already use our apps and talk to one another. Acting for
            us across organisations also needs shared meaning, clear permission
            and someone to answer when things go wrong.
          </p>
          <div className={styles.bylineRow}>
            <span>
              <strong className={styles.bylineName}>Jesse Wright</strong> —{" "}
              <a
                href="https://jeswr.org/#me"
                rel="noopener noreferrer"
                target="_blank"
              >
                jeswr.org/#me
              </a>
            </span>
            <span className={styles.statusPill}>
              Review draft — 12 October 2026
            </span>
          </div>
          <p className={styles.draftNote}>
            <em>
              Review draft, 12 October 2026. This note sits outside the
              manuscript. The ideas and editorial direction are Jesse
              Wright&apos;s, developed through dictation, a supervision
              discussion and review of successive drafts. This version, an
              accessible rewrite of the 12 October draft, was drafted with AI
              writing assistance, as were earlier versions. Language models are
              writing tools, not authors. The human author list, references and
              all claims require human review. This draft has not been
              submitted.
            </em>
          </p>
          <nav aria-label="Table of contents" className={styles.toc}>
            <p className={styles.tocTitle}>Contents</p>
            <ol className={styles.tocList}>
              <li>
                <a href="#sec-abstract">
                  <span className={styles.tocNum}>—</span> Abstract
                </a>
              </li>
              <li>
                <a href="#sec-1">
                  <span className={styles.tocNum}>§1</span> The flat with the
                  bay window
                </a>
              </li>
              <li>
                <a href="#sec-2">
                  <span className={styles.tocNum}>§2</span> Relying on an agent
                  you have never met
                </a>
              </li>
              <li>
                <a href="#sec-3">
                  <span className={styles.tocNum}>§3</span> Rules for routine
                  work, language where it helps
                </a>
              </li>
              <li>
                <a href="#sec-4">
                  <span className={styles.tocNum}>§4</span> Seven questions
                  around one action
                </a>
              </li>
              <li>
                <a href="#sec-5">
                  <span className={styles.tocNum}>§5</span> Who runs the agent,
                  and how this can start
                </a>
              </li>
              <li>
                <a href="#sec-6">
                  <span className={styles.tocNum}>§6</span> Open questions, and
                  Sam&apos;s decision
                </a>
              </li>
              <li>
                <a href="#sec-references">
                  <span className={styles.tocNum}>—</span> References
                </a>
              </li>
            </ol>
          </nav>
        </header>
        <section className={styles.section} id="sec-abstract">
          <div className={styles.sectionRail}>
            <span className={styles.sectionRailNum}>—</span>
            <span className={styles.sectionRailTag}>Abstract</span>
          </div>
          <div className={styles.sectionBody}>
            <h2>Abstract</h2>
            <div className={styles.prose}>
              <p>
                Software agents can now work through our apps and browsers in
                the background and exchange messages with other agents. Letting
                them act for us across organisations, by applying for a
                mortgage, sharing records or placing an order, needs more than
                capable agents. This article follows a first-time buyer whose
                agent works within ongoing, revocable permissions. It argues
                that dependable delegation needs shared foundations: agreed
                meaning, permission the other side can recognise, checks on
                where information came from, accepted sources for each claim,
                conditions on use, clear agreements and outcomes, and
                accountability backed by institutions. It relates these seven
                questions to current agent products, protocols and research on
                authenticated delegation. Routine steps should run as explicit,
                tested checks, with language models serving people&apos;s intent
                and unfamiliar cases. The foundation should stay modular rather
                than impose one schema, identity system or channel. The article
                closes with open questions of integration and governance.
              </p>
            </div>
          </div>
        </section>
        <section className={styles.section} id="sec-1">
          <div className={styles.sectionRail}>
            <span className={styles.sectionRailNum}>§1</span>
            <span className={styles.sectionRailTag}>The flat</span>
          </div>
          <div className={styles.sectionBody}>
            <h2>The flat with the bay window</h2>
            <div className={styles.prose}>
              <p>
                The bay window was wide enough for her grandmother&apos;s
                armchair. After six years of saving, Sam had found her flat in
                the worst possible week. She is a physiotherapist, and from
                Monday she was on nights, leaving no office hours for payroll
                letters, bank statements and a call with a mortgage adviser.
              </p>
              <p>
                On the bus home she messaged her personal agent: apply to the
                lender we shortlisted for this flat.
              </p>
              <p>
                In the spring she had given it ongoing permission, which she
                could change or withdraw. It could collect her employment and
                bank records and share them with her chosen lender, and any
                assessor the lender named, for that application only. It could
                also book appointments around her shifts. Any mortgage had to
                stay within four limits: the most she would borrow, the highest
                interest rate, the highest monthly payment and the most she
                would pay to leave early. She kept for herself the decision to
                commit to a home.
              </p>
              <p>
                Her agent sent the application to the lender&apos;s agent. That
                agent named who would see the records: the lender&apos;s staff
                and one independent assessor, for this application only. That
                matched Sam&apos;s terms, so her agent asked her hospital&apos;s
                and bank&apos;s agents to send the records to the lender.
              </p>
              <p>
                The lender&apos;s agent noticed that the hospital&apos;s record
                gave the date Sam joined, not the start of her permanent
                contract, which it needed. The hospital&apos;s agent issued the
                right one. Then the lender proposed a call on an afternoon
                Sam&apos;s rota marked &quot;on call.&quot; Unsure whether she
                would count that as free, her agent asked. &quot;Keep on-call
                days clear,&quot; she replied from the staff room. It booked her
                next day off. Most of the back-and-forth happened while she was
                working or asleep.
              </p>
              <p>
                Some weeks later the offer arrived, inside every limit. Sam read
                it twice on her break, slept on it, and the next morning told
                her agent to proceed and sign.
              </p>
            </div>
          </div>
        </section>
        <section className={styles.section} id="sec-2">
          <div className={styles.sectionRail}>
            <span className={styles.sectionRailNum}>§2</span>
            <span className={styles.sectionRailTag}>Reliance</span>
          </div>
          <div className={styles.sectionBody}>
            <h2>Relying on an agent you have never met</h2>
            <div className={styles.prose}>
              <p>
                Look at Sam&apos;s application from the other side. The lender
                must rely on a record it did not produce, delivered by software
                it does not control, for someone it has never met. Sam must rely
                on the lender&apos;s promise about who sees her bank statements.
                Either may later need to show what was authorised, agreed and
                done. A fluent exchange between capable models settles none of
                this. An agent can be persuasive and wrong. It can pass on a
                genuine document from a source with no standing to make the
                claim, or accept terms the other organisation never enforces.
              </p>
              <p>
                Agents that act for people are no longer only a research idea.
                Meta&apos;s Muse, xAI&apos;s Grok Bot and OpenAI&apos;s dots
                work in the background through persistent cloud computers and
                browsers, often using the person&apos;s own signed-in accounts
                and connected apps, and each promises to take tasks off its
                user&apos;s hands [
                <a className={styles.cite} href="#ref-10">
                  10
                </a>
                ,{" "}
                <a className={styles.cite} href="#ref-13">
                  13
                </a>
                ,{" "}
                <a className={styles.cite} href="#ref-16">
                  16
                </a>
                ]. Their providers describe substantial controls. A user can
                allow an action once or save the permission for later, and the
                agent can ask before sending a message or spending money. On
                supported services, login details can be kept away from the
                model [
                <a className={styles.cite} href="#ref-9">
                  9
                </a>
                ,{" "}
                <a className={styles.cite} href="#ref-13">
                  13
                </a>
                ,{" "}
                <a className={styles.cite} href="#ref-17">
                  17
                </a>
                ]. These products echo part of CUPA, the vision of
                computer-using personal agents that my colleagues and I proposed
                in 2025 [
                <a className={styles.cite} href="#ref-6">
                  6
                </a>
                ].
              </p>
              <p>
                Those controls govern the agent&apos;s own conduct. The
                organisation receiving its messages faces a different question:
                whom does this agent represent, and what is it permitted to do?
                In ordinary use, a Grok Bot acts through its user&apos;s own
                signed-in account [
                <a className={styles.cite} href="#ref-17">
                  17
                </a>
                ]. Such account-based automation can be properly authorised and
                suits much personal work, but the recipient may see only the
                person&apos;s account, with little transparency about whether
                software is acting or within what limits. An agent using a
                person&apos;s account could still identify itself in its
                messages, though the recipient would still need to check its
                permission. OpenAI is previewing organisational dots with their
                own identity and credentials [
                <a className={styles.cite} href="#ref-13">
                  13
                </a>
                ], and a recipient would still need to know what that identity
                may do.
              </p>
              <p>
                Other work covers parts of this. Open protocols let independent
                agents describe their capabilities and exchange structured
                messages, and let AI applications connect to tools and data [
                <a className={styles.cite} href="#ref-1">
                  1
                </a>
                ,{" "}
                <a className={styles.cite} href="#ref-11">
                  11
                </a>
                ]. Payment protocols go further in one domain. They specify
                signed spending authorisations, receipts, and payment tokens
                bounded by amount and expiry [
                <a className={styles.cite} href="#ref-4">
                  4
                </a>
                ,{" "}
                <a className={styles.cite} href="#ref-14">
                  14
                </a>
                ]. The Agent Payments Protocol (AP2) proposes that its
                authorisation model could later extend beyond payments [
                <a className={styles.cite} href="#ref-3">
                  3
                </a>
                ].
              </p>
              <p>
                Research addresses delegation itself. South et al. [
                <a className={styles.cite} href="#ref-15">
                  15
                </a>
                ] set out authenticated delegation: identifiable agents,
                verifiable permission to act for someone, scoped authority and
                audit trails, with attention to legal recognition and outside
                enforcement. Gabriel et al. [
                <a className={styles.cite} href="#ref-8">
                  8
                </a>
                ] examine the ethics of assistants that act for people, and NIST
                has begun a standards effort on agent identity, authorisation
                and interoperability [
                <a className={styles.cite} href="#ref-12">
                  12
                </a>
                ]. Shared meaning has a longer history, from the Semantic Web
                vision of agents using shared vocabularies and signatures [
                <a className={styles.cite} href="#ref-5">
                  5
                </a>
                ] to finance&apos;s industry-maintained description of its
                concepts [
                <a className={styles.cite} href="#ref-7">
                  7
                </a>
                ].
              </p>
              <p>
                My argument is that dependable delegation needs shared
                foundations alongside capable agents. Beyond authenticated
                delegation, organisations that have never worked together must
                agree what their data means. They must check where it came from,
                and separately decide whose word they accept for each claim.
                They must honour agreed conditions on its use, and keep clear
                accounts of what was agreed and what happened. Institutions must
                stand behind all of this and hold people to account. Existing
                pieces address parts of this, often within one product, protocol
                or domain. What designers must still work out is how they fit
                together across domains, so that a lender, a hospital and a
                person&apos;s agent can rely on one another without a bespoke
                arrangement for every pair.
              </p>
              <p>
                The vision rests on assumptions. Sectors would publish and
                maintain shared descriptions of their data. Issuers would sign
                what they release. The organisations involved, and the law,
                would recognise a commitment made by a properly authorised agent
                within its limits. The scene describes a possibility, not
                current mortgage rules or legal advice.
              </p>
            </div>
          </div>
        </section>
        <section className={styles.section} id="sec-3">
          <div className={styles.sectionRail}>
            <span className={styles.sectionRailNum}>§3</span>
            <span className={styles.sectionRailTag}>Rules and language</span>
          </div>
          <div className={styles.sectionBody}>
            <h2>Rules for routine work, language where it helps</h2>
            <div className={styles.prose}>
              <p>
                Much excitement about agents imagines them negotiating
                everything in conversation. For an interaction as common as a
                mortgage application, I argue for the reverse default. Checking
                a proposed appointment against a rota, or recipients against
                Sam&apos;s permissions, is a rule. Ordinary tested software
                gives the same answer for the same inputs and conditions,
                without regenerating it in prose. Language models earn their
                place elsewhere. They turn Sam&apos;s bus message into a
                request, explain the offer in plain words, read mail from
                someone without an agent, and help an agent plan in unfamiliar
                situations where the result can be checked. Engineering guidance
                from one model provider likewise distinguishes predefined
                workflows from agents that direct their own steps, and favours
                the simpler option when it suffices [
                <a className={styles.cite} href="#ref-2">
                  2
                </a>
                ].
              </p>
              <p>
                The same reasoning applies to how agents reach services. An
                agent working through a website&apos;s screens must read pages,
                find controls and decide each step, which costs computing effort
                and leaves room for misreading. An API, a software interface
                through which programs request actions directly, avoids much of
                this. But each service&apos;s API today tends to have its own
                names and meanings. If the lender, the hospital and Sam&apos;s
                agent shared meanings for familiar actions, such as sending an
                employment record or booking an appointment, her agent could use
                them across organisations without interpreting screens or
                learning each site&apos;s vocabulary. The shared meanings would
                cover more than the shape of the data: the exact permission
                behind a request, the conditions on use and the outcome
                reported. They could reach only the actions each service
                implements and permits. Screens remain a useful route while
                services migrate.
              </p>
              <p>
                Agreed actions can also protect the user. A model working
                through screens might take &quot;find the price&quot; as
                &quot;place the order&quot;. Providers already guard against
                such slips. xAI, for instance, documents a separate review model
                that can allow, ask or deny an action, alongside per-action
                approvals, user isolation and, for enterprise teams, network
                policies, which reduce the risk without removing it [
                <a className={styles.cite} href="#ref-17">
                  17
                </a>
                ]. Explicit, agreed actions add a check that does not depend on
                any model&apos;s reading. Given a £30 daily cap and £15 already
                spent today, ordinary software could reject a £20 order before
                it is placed. That requires the check to count purchases already
                made and commitments awaiting payment, and every purchase or
                promise to pay to pass through it. Enforced that way, the same
                check protects both the person and the organisation on the other
                side. Language models and ordinary software remain
                complementary.
              </p>
              <p>
                Within its permission, Sam&apos;s agent does not ask again; that
                is the point. It comes back to her for three distinct reasons:
              </p>
              <ul>
                <li>
                  <strong>The action falls outside her permission.</strong>{" "}
                  Widening it is her choice, never automatic.
                </li>
                <li>
                  <strong>Her intent is genuinely unclear,</strong> as with the
                  on-call afternoon.
                </li>
                <li>
                  <strong>It reaches a decision she kept,</strong> such as
                  proceeding with this home.
                </li>
              </ul>
              <p>
                At those moments her answer becomes something others will act
                on. A careful design confirms the specific terms. It also keeps
                separate records of what she was shown, what she authorised and
                what was then done. Those records should be captured by the
                systems that displayed and performed each step, not left to a
                model&apos;s own description of its behaviour. They help
                investigate a dispute, though no log is infallible, and they do
                not prove that the lender later used her data as promised.
                Reliably matching what a person intended, what she was shown and
                what was actually done remains an open problem.
              </p>
              <p>
                Models may also work out of sight. An employer might use one to
                read a start date from a scanned contract before issuing a
                signed record. The signature would truthfully show that the
                employer issued the record, not that the date was read
                correctly.
              </p>
            </div>
          </div>
        </section>
        <section className={styles.section} id="sec-4">
          <div className={styles.sectionRail}>
            <span className={styles.sectionRailNum}>§4</span>
            <span className={styles.sectionRailTag}>Seven questions</span>
          </div>
          <div className={styles.sectionBody}>
            <h2>Seven questions around one action</h2>
            <div className={styles.prose}>
              <p>
                Strip Sam&apos;s application down and it is a series of actions
                an agent takes for someone: reading a record, sharing it,
                booking a call, accepting an offer. Each action raises some of
                seven questions (Figure 1). The figure is a map of how they
                relate, not layers or steps, and not every action raises all
                seven.
              </p>
              <figure className={styles.paperFigure}>
                <Image
                  unoptimized
                  alt='A central node, "an agent acting for someone", is linked to seven questions: shared meaning, permission, origin check, whose word counts, conditions on use, agreements and outcomes, and accountability. Dotted links show that origin checks support, but do not settle, whose word counts and what happened; permission bounds agreements; and accountability recognises sources, oversees and enforces conditions on use, and resolves disputes.'
                  className={styles.paperFigureImg}
                  height={1402}
                  src="/agentic-web/acting-for-us/seven-questions.svg"
                  width={1953}
                />
                <figcaption className={styles.paperFigcaption}>
                  <strong>Figure 1.</strong>{" "}
                  <em>
                    Seven questions around an agent acting for someone. Each
                    needs its own answer, combining technical checks with
                    institutions that recognise authority, enforce conditions
                    and provide remedies. No answer substitutes for another.
                  </em>
                </figcaption>
              </figure>
              <p>
                <strong>What do we mean?</strong> &quot;Start date&quot; had two
                correct answers, and only one was what the lender needed.
                &quot;Next week&quot; needs dates and a time zone, and an amount
                needs a currency. When two organisations&apos; data models
                differ, published, versioned descriptions of meaning let agents
                notice the mismatch and ask instead of guessing. Shared meaning
                reduces ambiguity. It does not guarantee honesty.
              </p>
              <p>
                <strong>Who acts for whom, within what limits?</strong>{" "}
                Sam&apos;s agent acts for Sam and the lender&apos;s agent for
                the lender, and each side needs to recognise the other&apos;s
                permission. Permission should be ongoing, limited and revocable,
                and systems need to check that it still holds. Withdrawing it
                stops future actions. It does not undo a contract already made
                or data already shared.
              </p>
              <p>
                <strong>Where did it come from, and was it changed?</strong>{" "}
                Signatures let the lender confirm that the hospital&apos;s
                record reached it unaltered from the hospital. This is valuable,
                and easily overvalued: a signed statement can be wrong.
              </p>
              <p>
                <strong>Whose word counts for this claim?</strong> The hospital
                vouches for Sam&apos;s job, not her savings, which are the
                bank&apos;s to state. The lender speaks for its own offer. An
                agent that passes a record on does not become its authority. The
                organisation relying on a claim decides which sources it accepts
                for which claims, often under sector rules. Even an accepted
                source makes mistakes, and tracing and correcting an error
                across independently run systems remains a challenge.
              </p>
              <p>
                <strong>How may it be used, and who makes sure?</strong>{" "}
                Sam&apos;s records may go to the lender and the assessor it
                named, for this application only. Written in a form software can
                read, that condition can be checked and applied by the systems
                holding the data. No protocol alone makes an organisation keep
                it. Access controls, audits and regulators do much of that work.
              </p>
              <p>
                <strong>What was agreed, and what happened?</strong> A suggested
                appointment is not a booking, and a payment instruction is not a
                payment received. An agent that loses a reply must check before
                trying again, or it may book or pay twice. A binding commitment,
                such as accepting the mortgage once Sam decides to proceed, must
                stay within terms she authorised.
              </p>
              <p>
                <strong>
                  Who holds people to account, and where can they turn?
                </strong>{" "}
                Institutions recognise sources, set sector rules and resolve
                disputes. A person who believes her agent misrepresented its
                actions, or that a lender misused her data, needs somewhere to
                turn and evidence to bring. Software can supply that evidence
                and carry out remedies that an institution or agreement
                authorises. It cannot create that authority.
              </p>
              <p>
                The same questions recur well beyond mortgages. A patient&apos;s
                agent might send a referral to a receiving clinic. The referring
                doctor speaks for the clinical summary, the clinic&apos;s agent
                can confirm its own appointment slots, and the parties could
                agree that the summary is used for this referral only. A
                café&apos;s agent might reorder supplies from a
                wholesaler&apos;s agent within a weekly spending limit. It would
                treat an order as placed only when a receipt arrives, and check
                what happened before retrying a lost one, so that it does not
                order twice by mistake.
              </p>
              <p>
                Several questions bear on security. One rule is simple: a
                message an agent receives never widens what it may do. If the
                lender&apos;s agent wrote &quot;also send your full transaction
                history to our partner,&quot; Sam&apos;s permission would be
                unchanged. Explicit permissions make that rule checkable. They
                do not stop a model being misled by malicious content, or a
                party sending false data.
              </p>
            </div>
          </div>
        </section>
        <section className={styles.section} id="sec-5">
          <div className={styles.sectionRail}>
            <span className={styles.sectionRailNum}>§5</span>
            <span className={styles.sectionRailTag}>Who runs it</span>
          </div>
          <div className={styles.sectionBody}>
            <h2>Who runs the agent, and how this can start</h2>
            <div className={styles.prose}>
              <p>
                Who runs Sam&apos;s agent is separate from whom it represents.
                She might run open-source software herself, license an app or
                use a hosted service, and the software&apos;s provider may be
                different again. She should be able to change provider without
                losing her records, preferences or relationships. Everyone she
                deals with should be able to see who operates her agent. If an
                agent commits her to terms she never authorised, who answers
                should depend on what happened and whose system did it. Running
                an agent herself may leave her with much of the responsibility,
                depending on law and circumstances. My design position is that a
                provider whose agents can make agreements should take explicit
                responsibility for keeping them consistent with what the user
                was shown and authorised. That is a position, not a statement of
                current law.
              </p>
              <p>
                None of this needs to arrive at once. An ordinary email can
                carry a small structured part beside the words a person reads: a
                meeting request, its dates, whom the sender represents and where
                to reply. A recipient without an agent answers as usual. When a
                colleague replies with a booking link, an agent can book through
                that existing service within its permission, and remember the
                route. As more people have agents, more exchanges become precise
                requests and answers. A lender can publish what an application
                requires.
              </p>
              <p>
                The foundation&apos;s parts can be chosen and changed
                independently. Nothing here requires one data model, channel,
                identity system, storage service, signature scheme or kind of AI
                model. Agents describe the formats and checks they support, so
                that others can see whether they are compatible. An advertised
                capability still has to be implemented correctly. No technical
                choice replaces institutional enforcement or legal recognition.
                Shared conventions may settle over time, much as email let
                people on different providers reach one another without anyone
                owning it. That is possible, not guaranteed.
              </p>
            </div>
          </div>
        </section>
        <section className={styles.section} id="sec-6">
          <div className={styles.sectionRail}>
            <span className={styles.sectionRailNum}>§6</span>
            <span className={styles.sectionRailTag}>Open questions</span>
          </div>
          <div className={styles.sectionBody}>
            <h2>Open questions, and Sam&apos;s decision</h2>
            <div className={styles.prose}>
              <p>The hardest questions concern integration and governance:</p>
              <ul>
                <li>
                  Who maintains a domain&apos;s shared descriptions of meaning,
                  and how do agents know which version the other side uses?
                </li>
                <li>
                  How can an organisation state, in a form agents can check,
                  which sources it accepts for which claims, across sectors and
                  borders?
                </li>
                <li>
                  How can a person&apos;s reserved decision be captured
                  reliably, and what she was shown be matched to what was done?
                </li>
                <li>
                  How is an error from an accepted source traced and corrected
                  after it has spread?
                </li>
                <li>
                  How should withdrawn permission reach every system that relies
                  on it?
                </li>
                <li>
                  Who answers when things go wrong, and what makes it worthwhile
                  for organisations to publish their meanings and enforce their
                  conditions before others do?
                </li>
              </ul>
              <p>
                Buying a home still carried cost and risk, and the decision to
                go ahead was Sam&apos;s alone. The promise is not that software
                decides for us. It is that the evenings she would have spent
                chasing a letter from payroll went instead to the question only
                she could answer: whether her grandmother&apos;s armchair
                belonged in that window.
              </p>
            </div>
          </div>
        </section>
        <section className={styles.section} id="sec-references">
          <div className={styles.sectionRail}>
            <span className={styles.sectionRailNum}>—</span>
            <span className={styles.sectionRailTag}>References</span>
          </div>
          <div className={styles.sectionBody}>
            <h2>References</h2>
            <div className={styles.refList}>
              <div className={styles.refItem} id="ref-1">
                <span className={styles.refTag}>[1]</span>
                <span className={styles.refBody}>
                  Agent2Agent Project.{" "}
                  <a
                    className={styles.refLink}
                    href="https://a2a-protocol.org/latest/specification/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Agent2Agent (A2A) Protocol Specification
                  </a>
                  . Live specification; accessed 1 October 2026.
                </span>
              </div>
              <div className={styles.refItem} id="ref-2">
                <span className={styles.refTag}>[2]</span>
                <span className={styles.refBody}>
                  Anthropic.{" "}
                  <a
                    className={styles.refLink}
                    href="https://www.anthropic.com/engineering/building-effective-agents"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Building Effective Agents
                  </a>
                  . 19 December 2024. Accessed 12 October 2026.
                </span>
              </div>
              <div className={styles.refItem} id="ref-3">
                <span className={styles.refTag}>[3]</span>
                <span className={styles.refBody}>
                  AP2.{" "}
                  <a
                    className={styles.refLink}
                    href="https://ap2-protocol.org/ap2/agent_authorization/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Agent Authorization Framework
                  </a>
                  . Accessed 12 October 2026.
                </span>
              </div>
              <div className={styles.refItem} id="ref-4">
                <span className={styles.refTag}>[4]</span>
                <span className={styles.refBody}>
                  AP2.{" "}
                  <a
                    className={styles.refLink}
                    href="https://ap2-protocol.org/ap2/specification/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Agentic Payment Protocol (v0.2)
                  </a>
                  . Specification; accessed 12 October 2026.
                </span>
              </div>
              <div className={styles.refItem} id="ref-5">
                <span className={styles.refTag}>[5]</span>
                <span className={styles.refBody}>
                  T. Berners-Lee, J. Hendler and O. Lassila.{" "}
                  <a
                    className={styles.refLink}
                    href="https://lassila.org/publications/2001/SciAm.html"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    The Semantic Web
                  </a>
                  . <em>Scientific American</em> 284, 5 (May 2001), 34–43.
                </span>
              </div>
              <div className={styles.refItem} id="ref-6">
                <span className={styles.refTag}>[6]</span>
                <span className={styles.refBody}>
                  P. A. Bonatti et al.{" "}
                  <a
                    className={styles.refLink}
                    href="https://arxiv.org/abs/2503.15515"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Towards Computer-Using Personal Agents
                  </a>
                  . arXiv:2503.15515, 2025. Revised as{" "}
                  <a
                    className={styles.refLink}
                    href="https://www.semantic-web-journal.net/content/cupa-towards-computer-using-personal-agents-0"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    CUPA: Towards Computer-Using Personal Agents
                  </a>
                  , accepted by the <em>Semantic Web</em> journal, 2026.
                </span>
              </div>
              <div className={styles.refItem} id="ref-7">
                <span className={styles.refTag}>[7]</span>
                <span className={styles.refBody}>
                  EDM Association.{" "}
                  <a
                    className={styles.refLink}
                    href="https://edmcouncil.org/frameworks/industry-models/fibo/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Financial Industry Business Ontology (FIBO)
                  </a>
                  . Accessed 1 October 2026.
                </span>
              </div>
              <div className={styles.refItem} id="ref-8">
                <span className={styles.refTag}>[8]</span>
                <span className={styles.refBody}>
                  I. Gabriel et al.{" "}
                  <a
                    className={styles.refLink}
                    href="https://arxiv.org/abs/2404.16244"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    The Ethics of Advanced AI Assistants
                  </a>
                  . arXiv:2404.16244, 2024.
                </span>
              </div>
              <div className={styles.refItem} id="ref-9">
                <span className={styles.refTag}>[9]</span>
                <span className={styles.refBody}>
                  Meta.{" "}
                  <a
                    className={styles.refLink}
                    href="https://research.meta.ai/blog/security-and-safety-for-ai-agents-our-approach-with-muse"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    How We Built Safety Into Muse
                  </a>
                  . 8 September 2026. Accessed 12 October 2026.
                </span>
              </div>
              <div className={styles.refItem} id="ref-10">
                <span className={styles.refTag}>[10]</span>
                <span className={styles.refBody}>
                  Meta.{" "}
                  <a
                    className={styles.refLink}
                    href="https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Introducing Muse: The World&apos;s First Personal AI Agent
                    Built for Everyone
                  </a>
                  . 8 September 2026; updated 30 September 2026. Accessed 12
                  October 2026.
                </span>
              </div>
              <div className={styles.refItem} id="ref-11">
                <span className={styles.refTag}>[11]</span>
                <span className={styles.refBody}>
                  Model Context Protocol Project.{" "}
                  <a
                    className={styles.refLink}
                    href="https://modelcontextprotocol.io/specification/2025-06-18"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Model Context Protocol Specification, version 2025-06-18
                  </a>
                  . Accessed 1 October 2026.
                </span>
              </div>
              <div className={styles.refItem} id="ref-12">
                <span className={styles.refTag}>[12]</span>
                <span className={styles.refBody}>
                  NIST.{" "}
                  <a
                    className={styles.refLink}
                    href="https://www.nist.gov/artificial-intelligence/ai-agent-standards-initiative"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    AI Agent Standards Initiative
                  </a>
                  . Accessed 12 October 2026.
                </span>
              </div>
              <div className={styles.refItem} id="ref-13">
                <span className={styles.refTag}>[13]</span>
                <span className={styles.refBody}>
                  OpenAI.{" "}
                  <a
                    className={styles.refLink}
                    href="https://openai.com/index/introducing-dots/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Introducing dots
                  </a>
                  . 29 September 2026. Accessed 12 October 2026.
                </span>
              </div>
              <div className={styles.refItem} id="ref-14">
                <span className={styles.refTag}>[14]</span>
                <span className={styles.refBody}>
                  OpenAI.{" "}
                  <a
                    className={styles.refLink}
                    href="https://developers.openai.com/commerce/guides/key-concepts"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Key concepts
                  </a>
                  . Agentic Commerce developer documentation; accessed 12
                  October 2026.
                </span>
              </div>
              <div className={styles.refItem} id="ref-15">
                <span className={styles.refTag}>[15]</span>
                <span className={styles.refBody}>
                  T. South et al.{" "}
                  <a
                    className={styles.refLink}
                    href="https://arxiv.org/abs/2501.09674"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Authenticated Delegation and Authorized AI Agents
                  </a>
                  . arXiv:2501.09674, 2025.
                </span>
              </div>
              <div className={styles.refItem} id="ref-16">
                <span className={styles.refTag}>[16]</span>
                <span className={styles.refBody}>
                  xAI.{" "}
                  <a
                    className={styles.refLink}
                    href="https://docs.x.ai/grok-bot/overview"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Grok Bot
                  </a>
                  . Product documentation; accessed 12 October 2026.
                </span>
              </div>
              <div className={styles.refItem} id="ref-17">
                <span className={styles.refTag}>[17]</span>
                <span className={styles.refBody}>
                  xAI.{" "}
                  <a
                    className={styles.refLink}
                    href="https://docs.x.ai/grok-bot/security"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Grok Bot security
                  </a>
                  . Product documentation; accessed 12 October 2026.
                </span>
              </div>
            </div>
          </div>
        </section>
        <footer className={styles.colophon}>
          <span>
            See also the earlier vision paper,{" "}
            <Link href="/agentic-web">
              <em>The Accountable Web of Agents</em>
            </Link>
            .
          </span>
          <span>© Jesse Wright, 2026. Review draft.</span>
        </footer>
      </div>
    </div>
  );
}
