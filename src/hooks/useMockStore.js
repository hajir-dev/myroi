import { useState } from "react";
import { initialStore } from "../stores/mockData";

export function useMockStore(navigate, resources) {
  const [store, setStore] = useState(initialStore);

  const create = (key, values) => {
    setStore((current) => ({
      ...current,
      [key]: [{ id: crypto.randomUUID(), ...values }, ...current[key]],
    }));
    navigate(resources[key].path);
  };

  const update = (key, id, values) => {
    setStore((current) => ({
      ...current,
      [key]: current[key].map((item) => (item.id === id ? { ...item, ...values } : item)),
    }));
    navigate(resources[key].path);
  };

  const remove = (key, id) => {
    setStore((current) => ({
      ...current,
      [key]: current[key].filter((item) => item.id !== id),
    }));
  };

  return { store, create, update, remove };
}
