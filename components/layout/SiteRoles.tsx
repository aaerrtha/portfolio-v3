import { siteConfig } from "@/lib/constants";

export function SiteRoles() {
  return (
    <div className="mt-[18px] flex flex-col text-sm leading-[1.7] text-muted">
      {siteConfig.roles.map((role) => (
        <p key={role.company}>
          {role.prefix}{" "}
          <a
            href={role.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground transition-colors duration-150 ease-in-out hover:text-foreground"
          >
            {role.company}
          </a>
        </p>
      ))}
    </div>
  );
}
