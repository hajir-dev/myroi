import { useMemo, useState } from "react";
import { DataTable } from "./ui/DataTable";
import { PageHeader } from "./ui/PageHeader";

export function ResourceList({ config, items, onAdd, onEdit, onDelete }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const needle = query.toLowerCase();
    return items.filter((item) => Object.values(item).join(" ").toLowerCase().includes(needle));
  }, [items, query]);

  return (
    <div className="page-stack">
      <PageHeader title={config.title} description={config.description} action={<button className="primary-button" onClick={onAdd} type="button">Tambah {config.singular}</button>} />
      <section className="panel">
        <div className="toolbar">
          <input className="control search" placeholder={config.searchPlaceholder || "Cari data..."} value={query} onChange={(event) => setQuery(event.target.value)} />
          <span>{filtered.length} data</span>
        </div>
        <DataTable
          columns={config.columns}
          items={filtered}
          extraAction={(item) => (
            <div className="action-group">
              <button className="ghost-button" onClick={() => onEdit(item.id)} type="button">
                Edit
              </button>
              <button className="danger-button" onClick={() => onDelete(item.id)} type="button">
                Delete
              </button>
            </div>
          )}
        />
      </section>
    </div>
  );
}
