import { useState } from "react";
import { Field } from "./ui/Field";
import { PageHeader } from "./ui/PageHeader";

export function ResourceForm({ config, item, onSubmit, onCancel }) {
  const [values, setValues] = useState(() => {
    const seed = {};
    config.fields.forEach((field) => {
      seed[field.name] = item?.[field.name] || field.options?.[0] || "";
    });
    return seed;
  });

  const submit = (event) => {
    event.preventDefault();
    onSubmit(values);
  };

  return (
    <div className="page-stack">
      <PageHeader title={`${item ? "Edit" : "Tambah"} ${config.singular}`} description={config.description} />
      <form className="panel form-panel" onSubmit={submit}>
        <div className="form-grid">
          {config.fields.map((field) => (
            <Field key={field.name} {...field} value={values[field.name]} onChange={(value) => setValues({ ...values, [field.name]: value })} />
          ))}
        </div>
        <div className="form-actions">
          <button className="ghost-button" type="button" onClick={onCancel}>
            Cancel
          </button>
          <button className="primary-button" type="submit">
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
}
