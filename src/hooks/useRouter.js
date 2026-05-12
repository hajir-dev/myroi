import { useEffect, useState } from "react";

export function useRouter() {
  const [path, setPath] = useState(window.location.pathname === "/" ? "/login" : window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = (nextPath) => {
    window.history.pushState({}, "", nextPath);
    setPath(nextPath);
  };

  return { path, navigate };
}
