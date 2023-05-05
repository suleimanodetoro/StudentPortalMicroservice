const serializeSelect = (data = []) =>
  data.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.id,
  }));

export const serializeFormikSelect = (data = []) => {
  try {
    return data.map((item) => ({
      label: item.name,
      value: item.id,
    }));
  } catch (error) {
    console.log(error);
  }
};

export default serializeSelect;
