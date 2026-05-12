export function resolveRoute(path, resources) {
  if (path === "/dashboard" || path === "/") {
    return { kind: "dashboard" };
  }

  for (const [key, config] of Object.entries(resources)) {
    if (path === config.path) {
      return { kind: "list", key };
    }

    if (path === `${config.path}/new`) {
      return { kind: "form", key };
    }

    const editMatch = path.match(new RegExp(`^${config.path}/([^/]+)/edit$`));
    if (editMatch) {
      return { kind: "form", key, id: editMatch[1] };
    }
  }

  return { kind: "missing" };
}
