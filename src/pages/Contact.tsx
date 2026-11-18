import { LuMail, LuMapPin, LuPhone } from 'react-icons/lu'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import SocialLinks from '../components/SocialLinks'
import { profile } from '../data/site'

const details = [
  { label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}`, Icon: LuPhone },
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, Icon: LuMail },
  { label: 'Location', value: profile.location, href: undefined, Icon: LuMapPin },
]

export default function Contact() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk"
        text="Have an idea or an opportunity? Reach out and I will get back to you."
      />
      <section className="mx-auto mt-14 max-w-2xl space-y-4 px-6">
        {details.map(({ label, value, href, Icon }, i) => {
          const body = (
            <>
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand/15 text-sky">
                <Icon size={20} />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-widest text-faint">
                  {label}
                </span>
                <span className="text-fg">{value}</span>
              </span>
            </>
          )
          const cls =
            'flex items-center gap-4 rounded-2xl border border-line bg-panel p-5 transition'
          return (
            <Reveal key={label} delay={i * 100}>
              {href ? (
                <a href={href} className={`${cls} hover:border-brand/60`}>
                  {body}
                </a>
              ) : (
                <div className={cls}>{body}</div>
              )}
            </Reveal>
          )
        })}

        <Reveal delay={300} className="pt-6 text-center">
          <p className="mb-4 text-sm text-muted">Or find me on</p>
          <div className="flex justify-center">
            <SocialLinks />
          </div>
        </Reveal>
      </section>
    </>
  )
}
