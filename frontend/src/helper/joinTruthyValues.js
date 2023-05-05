const joinTruthyValues = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

export default joinTruthyValues;
