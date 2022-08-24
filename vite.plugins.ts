const removeDataTestAttributes = (node) => {
  if (node.type === 1) {
    node.props = node.props.filter((prop) => {
      if (
        prop.type === 6 &&
        prop.name.includes("data-test")
      ) {
        return false;
      }

      return true;
    });
  }
};

export { removeDataTestAttributes };
