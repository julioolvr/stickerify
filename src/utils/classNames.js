// TODO: Install the actual classnames package from npm
// once I'm online

function classNames(conditions) {
  return Object.keys(conditions)
    .filter(key => conditions[key])
    .join(" ");
}

export default classNames;
