const attributesToObject = attributes => {
  const obj = {};

  Array.from(attributes).forEach(attribute => {
    obj[attribute.nodeName] = attribute.nodeValue;
  });

  return obj;
};

module.exports = { attributesToObject };
