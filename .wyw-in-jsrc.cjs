module.exports = {
  classNameSlug: (hash, title) =>
    process.env.NODE_ENV === "production" ? `${hash}` : `${title}_${hash}`,
};
