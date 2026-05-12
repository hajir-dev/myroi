import React from "react";
import { createRoot } from "react-dom/client";
import { DashboardShell } from "./components/layout/DashboardShell";
import { EmptyPage } from "./components/EmptyPage";
import { LoginPage } from "./components/LoginPage";
import { Overview } from "./components/Overview";
import { ResourceForm } from "./components/ResourceForm";
import { ResourceList } from "./components/ResourceList";
import { resources } from "./config/resources";
import { useMockAuth } from "./hooks/useMockAuth";
import { useMockStore } from "./hooks/useMockStore";
import { useRouter } from "./hooks/useRouter";
import { resolveRoute } from "./routes/resolveRoute";
import "./styles.css";

function App() {
  const { path, navigate } = useRouter();
  const { user, login, logout } = useMockAuth(navigate);
  const { store, create, update, remove } = useMockStore(navigate, resources);
  const route = resolveRoute(path, resources);

  if (!user || path === "/login") {
    return <LoginPage onLogin={login} />;
  }

  return (
    <DashboardShell path={path} navigate={navigate} user={user} onLogout={logout}>
      {route.kind === "dashboard" && <Overview store={store} navigate={navigate} />}
      {route.kind === "list" && (
        <ResourceList
          config={resources[route.key]}
          items={store[route.key]}
          onAdd={() => navigate(`${resources[route.key].path}/new`)}
          onEdit={(id) => navigate(`${resources[route.key].path}/${id}/edit`)}
          onDelete={(id) => remove(route.key, id)}
        />
      )}
      {route.kind === "form" && (
        <ResourceForm
          config={resources[route.key]}
          item={store[route.key].find((entry) => entry.id === route.id)}
          onCancel={() => navigate(resources[route.key].path)}
          onSubmit={(values) => (route.id ? update(route.key, route.id, values) : create(route.key, values))}
        />
      )}
      {route.kind === "missing" && <EmptyPage navigate={navigate} />}
    </DashboardShell>
  );
}

createRoot(document.getElementById("root")).render(<App />);
