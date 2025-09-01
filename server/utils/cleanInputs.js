export const cleanInputs = (data) => {
  const cleaned = {};

  for (const key in data) {
    const value = data[key];

    // Convierte strings vacíos en null
    cleaned[key] = value === '' ? null : value;
  }

  return cleaned;
};
