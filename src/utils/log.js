const logSymbols = require("log-symbols");

const logSuccess = (...args) => {
  console.log(logSymbols.success, ...args);
};

const logError = (...args) => {
  console.log(logSymbols.error, ...args);
};

const logInfo = (...args) => {
  console.log(logSymbols.info, ...args);
};

const logWarning = (...args) => {
  console.log(logSymbols.warning, ...args);
};

module.exports = {
  logSuccess,
  logError,
  logInfo,
  logWarning,
};
