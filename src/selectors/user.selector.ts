export const getFullnames = (data) => {
  return data.map((value) => {
    return `${value.first_name} ${value.last_name}`;
  });
};
