import { siteConfig } from "@/lib/constants";

export function SiteRoles() {
  return (
    <div className="flex flex-col gap-1 text-sm leading-relaxed text-muted">
      {siteConfig.roles.map((role) => (
        <p key={role.company}>
          {role.prefix}{" "}
          <a
            href={role.href}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            {role.company}
          </a>
        </p>
      ))}
    </div>
  );
}
