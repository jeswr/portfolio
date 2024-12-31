import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
} from "@/components/icons";

export const Navbar = () => {
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Avatar
              radius="sm"
              rel="icon"
              src="https://avatars.githubusercontent.com/u/63333554"
            />
            {" "}
            {/* https://www.jeswr.org/_next/image?url=https%3A%2F%2Favatars.githubusercontent.com%2Fu%2F63333554&w=256&q=75 */}
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
        <NavbarItem className="hidden sm:flex gap-2">
          {"twitter" in siteConfig.links &&
          typeof siteConfig.links.twitter === "string" ? (
            <Link
              isExternal
              aria-label="Twitter"
              href={siteConfig.links.twitter}
              property="account"
              rel="me"
              title="Twitter"
              typeof="OnlineAccount"
            >
              <TwitterIcon className="text-default-500" />
            </Link>
          ) : undefined}
          {"discord" in siteConfig.links &&
          typeof siteConfig.links.discord === "string" ? (
            <Link
              isExternal
              aria-label="Discord"
              href={siteConfig.links.discord}
              property="account"
              rel="me"
              title="Discord"
              typeof="OnlineAccount"
            >
              <DiscordIcon className="text-default-500" />
            </Link>
          ) : undefined}
          {"github" in siteConfig.links &&
          typeof siteConfig.links.github === "string" ? (
            <Link
              isExternal
              aria-label="Github"
              href={siteConfig.links.github}
              property="account"
              rel="me"
              title="GitHub"
              typeof="OnlineAccount"
            >
              <GithubIcon className="text-default-500" />
            </Link>
          ) : undefined}
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
        {"sponsor" in siteConfig.links &&
        typeof siteConfig.links.sponsor === "string" ? (
          <NavbarItem className="hidden md:flex">
            <Button
              isExternal
              as={Link}
              className="text-sm font-normal text-default-600 bg-default-100"
              href={siteConfig.links.sponsor}
              startContent={<HeartFilledIcon className="text-danger" />}
              variant="flat"
            >
              Sponsor
            </Button>
          </NavbarItem>
        ) : undefined}
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        {"github" in siteConfig.links &&
        typeof siteConfig.links.github === "string" ? (
          <Link
            isExternal
            aria-label="Github"
            href={siteConfig.links.github}
            property="account"
            rel="me"
            title="GitHub"
            typeof="OnlineAccount"
          >
            <GithubIcon className="text-default-500" />
          </Link>
        ) : undefined}
        <ThemeSwitch />
        <Link
            isExternal
            aria-label="Inrupt.com WebId"
            property='sameAs isPrimaryTopicOf rdfs:seeAlso'
                    rel='me'
                    typeof='Agent'
                    href='https://id.inrupt.com/jeswr'
                    target='_blank'
          >
            <GithubIcon className="text-default-500" />
          </Link>
        {/* <span>
                  Alternate Solid Profiles:
                  <a
                    property='sameAs isPrimaryTopicOf rdfs:seeAlso'
                    rel='me'
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
                    rel='me'
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
                    rel='me'
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
                  </span> */}
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
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
