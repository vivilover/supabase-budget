
export const groupByCategory = () => data.reduce((accm, curr) => {
  const category = curr.category;

  if(!accm[category]) {
    accm[category] = [];
  }
  accm[category].push(curr);
  return accm;
}, {});