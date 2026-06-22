import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import NextImage from "next/image";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  GithubIcon,
  LinkedInIcon,
  TwitterIcon,
  MastodonIcon,
  BlueskyIcon,
  ScholarIcon,
  OrcidIcon,
} from "@/components/icons";
import headshot from "@/public/jesse-wright.jpg";

// rel="me" on these consolidates the maintainer's web identity (IndieWeb / WebID)
// and the same URLs are mirrored as schema:sameAs in the page RDFa + JSON-LD.
const socials = [
  {
    key: "github",
    label: "GitHub",
    href: siteConfig.links.github,
    Icon: GithubIcon,
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    href: siteConfig.links.linkedin,
    Icon: LinkedInIcon,
  },
  {
    key: "x",
    label: "X (Twitter)",
    href: siteConfig.links.x,
    Icon: TwitterIcon,
  },
  {
    key: "mastodon",
    label: "Mastodon",
    href: siteConfig.links.mastodon,
    Icon: MastodonIcon,
  },
  {
    key: "bluesky",
    label: "Bluesky",
    href: siteConfig.links.bluesky,
    Icon: BlueskyIcon,
  },
  {
    key: "scholar",
    label: "Google Scholar",
    href: siteConfig.links.scholar,
    Icon: ScholarIcon,
  },
  {
    key: "orcid",
    label: "ORCID",
    href: siteConfig.links.orcid,
    Icon: OrcidIcon,
  },
] as const;

export const Navbar = () => {
  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-2" href="/">
            <NextImage
              alt="Jesse Wright"
              className="rounded-md"
              height={32}
              src={headshot}
              width={32}
            />
            <p className="font-bold text-inherit">Jesse Wright</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-3 items-center">
          {socials.map(({ key, label, href, Icon }) =>
            href ? (
              <Link
                key={key}
                isExternal
                aria-label={label}
                href={href}
                rel="me noopener noreferrer"
                title={label}
              >
                <Icon className="text-default-500" />
              </Link>
            ) : null,
          )}
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link
          isExternal
          aria-label="GitHub"
          href={siteConfig.links.github}
          rel="me noopener noreferrer"
          title="GitHub"
        >
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item.href}-${index}`}>
              <Link
                color="foreground"
                href={item.href}
                isExternal={item.href.startsWith("http")}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
