exports.getPlaceholderStringForArray = (arr) => {
  if (!Array.isArray(arr)) {
    throw new Error('Invalid input');
  }

  // if is array, we'll clone the arr
  // and fill the new array with placeholders
  const placeholders = [...arr];
  return placeholders.fill('?').join(', ').trim();
};

exports.multipleColumnSet = (object) => {
  if (typeof object !== 'object') {
    throw new Error('Invalid input');
  }

  const keys = Object.keys(object);
  const values = Object.values(object);

  columnSet = keys.map((key) => `${key} = ?`).join(' AND ');

  return {
    columnSet,
    values,
  };
};

exports.multipleColumnSetPrikaz = (object) => {
  if (typeof object !== 'object') {
    throw new Error('Invalid input');
  }

  const keys = Object.keys(object);
  const values = Object.values(object);

  columnSet = keys
    .map((key) => {
      return key === 'mesec' ? `MONTH(datum) = ?` : `${key} = ?`;
    })
    .join(' AND ');

  return {
    columnSet,
    values,
  };
};
