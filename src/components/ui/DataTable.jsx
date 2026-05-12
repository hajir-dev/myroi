import { renderCell } from "../../lib/renderCell";

export function DataTable({ columns, items, extraAction, dense = false }) {
  return (
    <div className="table-wrap">
      <table className={dense ? "data-table dense" : "data-table"}>
        <thead>
          <tr>
            {columns.map(([, label]) => (
              <th key={label}>{label}</th>
            ))}
            {extraAction && <th className="right">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (extraAction ? 1 : 0)} className="empty">
                Tidak ada data.
              </td>
            </tr>
          ) : (
            items.map((item) => (
              <tr key={item.id || item.no}>
                {columns.map(([key]) => (
                  <td key={key}>{renderCell(item[key], key)}</td>
                ))}
                {extraAction && <td className="right">{extraAction(item)}</td>}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
