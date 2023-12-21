// @ts-nocheck
const fs = require('fs');
const winston = require('winston');

class StringOperations {
  static strContainsOnlyDoubleEscapedChars(strToCheck) {
    if (strToCheck.match(/(?:\\x[0-9a-fA-F][0-9a-fA-F])+/)) {
      const allEscapedCharMatches = [
        ...strToCheck.matchAll(/\\x([0-9a-fA-F][0-9a-fA-F])/g),
      ];
      allEscapedCharMatches.forEach((escapedCharMatchStr) => {
        const asciiCode = Number(`0x${escapedCharMatchStr}`);
        if (asciiCode > 0x7f) {
          return false;
        }
      });
      return true;
    }
    return false;
  }

  static unescapeStrWithDoubleEscapedChars(strToParse) {
    return eval(`"${strToParse}"`);
  }

  static isValidIdentifierName(strToCheck) {
    if (strToCheck.length == 0) {
      return false;
    }

    const firstChar = strToCheck[0];
    if (
      firstChar.toLowerCase() == firstChar.toUpperCase() &&
      firstChar != '$' &&
      firstChar != '_'
    ) {
      return false;
    }

    if (strToCheck.indexOf('-') != -1) {
      return false;
    }

    return true;
  }
}

class NumberOperations {
  static numberIsFloat(nr) {
    return nr.toString().indexOf('.') != -1;
  }
}

function writeTextFile(path, content) {
  fs.writeFileSync(path, content, { flag: 'w' });
}
function cleanupLogFiles(logger) {
  const logFileNames = [
    'debug.log',
    'debug_ControlFlowFlattening.log',
    'debug_Converting.log',
    'debug_DeadCodeInjection.log',
    'debug_EmbeddedEval.log',
    'debug_Finalizing.log',
    'debug_Finishing.log',
    'debug_Initializing.log',
    'debug_Preparing.log',
    'debug_RenameIdentifiers.log',
    'debug_RenameProperties.log',
    'debug_Simplifying.log',
    'debug_StringArray.log',
    'info.log',
    'warn.log',
  ];
  for (let i = 0; i < logFileNames.length; i++) {
    const fileName = logFileNames[i];
    try {
      fs.unlinkSync(fileName);
    } catch (e) {
      if (e.toString().includes('no such file or directory')) {
        logger.warn(
          `[index.js] Could not delete log file with name = '${fileName}' as it does not exist.`,
        );
      } else {
        logger.warn(
          `[index.js] Could not delete log file with name = '${fileName}'. error = ${e}. ` +
            `Stack = \n${e.stack}`,
        );
      }
    }
  }
}
function createLogger(createDebugLog) {
  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp({ format: 'HH:mm:ss' }),
      winston.format.simple(),
    ),
    transports: [
      new winston.transports.File({
        filename: 'warn.log',
        level: 'warn',
        options: { flags: 'a' },
      }),
      new winston.transports.File({
        filename: 'info.log',
        level: 'info',
        options: { flags: 'a' },
      }),
      new winston.transports.Console({
        level: 'info',
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple(),
        ),
      }),
    ],
  });

  if (createDebugLog) {
    logger.add(
      new winston.transports.File({
        filename: 'debug.log',
        level: 'debug',
        options: { flags: 'w' },
      }),
    );
  }

  return logger;
}

module.exports = {
  StringOperations,
  NumberOperations,
  writeTextFile,
  cleanupLogFiles,
  createLogger,
};
