export function Field({ label, type = "text", value, onChange, options, required, placeholder }) {
  return (
    <label className="field">
      <span>{label}</span>
      {type === "select" ? (
        <select className="control" value={value} required={required} onChange={(event) => onChange(event.target.value)}>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          className="control"
          type={type === "email" ? "text" : type}
          inputMode={type === "email" ? "email" : undefined}
          value={value}
          required={required}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </label>
  );
}
