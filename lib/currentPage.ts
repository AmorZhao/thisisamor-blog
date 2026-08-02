export function getCurrentPage(pathname: string, prefix = ""): string {
  const stripped = prefix && pathname.startsWith(prefix) ? pathname.slice(prefix.length) : pathname;
  const segment = stripped.split("/").filter(Boolean)[0];
  return segment || "home";
}
