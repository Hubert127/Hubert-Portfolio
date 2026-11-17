import { FaGithub, FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa6'
import { profile, socials } from '../data/site'

const items = [
  { label: 'GitHub', href: socials.github, Icon: FaGithub },
  { label: 'LinkedIn', href: socials.linkedin, Icon: FaLinkedinIn },
  { label: 'Instagram', href: socials.instagram, Icon: FaInstagram },
  { label: 'WhatsApp', href: `https://wa.me/${profile.whatsapp}`, Icon: FaWhatsapp },
]

export default function SocialLinks() {
  return (
    <ul className="flex gap-3">
      {items.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 transition hover:border-brand hover:bg-brand hover:text-white"
          >
            <Icon size={17} />
          </a>
        </li>
      ))}
    </ul>
  )
}
