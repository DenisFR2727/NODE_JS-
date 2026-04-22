const path = require("path");

module.exports = path.dirname(require.main.filename);

// module.exports = path.dirname(process.mainModule.filename); - застарілий підхід!

// Побудова шляху до кореневого каталогу
