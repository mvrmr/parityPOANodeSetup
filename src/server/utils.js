import CONST from '../CONSTANTS';
import trim from 'lodash/trim';
var labUtils = require('../tools/labutils');


const utils = (()=> {
  const getFormattedTable = (type, data) => {
    switch (type) {
      case CONST.TABLES.HISTORY: {
        return [{"cells": ['Report submission date', 'LCR %', 'View']}, ...data.map((row) => {
          return {
            "cells": [row.date, `${parseFloat(row.percent)}%`],
            "extraInfo": {
              href: row.href
            }
          };
        })];
      }
      case CONST.TABLES.HQLA: {
        return [{"cells": ['Date', 'Classification', 'Amt. €', 'Local amt.', 'Wt.', 'Wtd. amt. €', 'Counterparty ID', 'Comment']}, ...data.map((row) => {
          return {
            "cells": [
              labUtils.intToDate(row.date),
              row.category,
              formatMoney(parseFloat(row.amount)),
              formatMoney(parseFloat(row.localAmount), trim(row.currency)),
              parseFloat(row.weight).toFixed(2),
              formatMoney(parseFloat(row.weighted_amount)),
              parseInt(row.counterparty),
              trim(row.comment)],
            "extraInfo": {
              index: row.index
            }
          };
        })];
      }
      case CONST.TABLES.INFLOW: {
        return [{"cells": ['Date', 'Classification', 'Amt. €', 'Local amt.', 'Wt.', 'Wtd. amt. €', 'Comment']}, ...data.map((row) => {
          return {
            "cells": [labUtils.intToDate(row.date), row.category, formatMoney(parseFloat(row.amount)), formatMoney(parseFloat(row.localAmount), trim(row.currency)), parseFloat(row.weight).toFixed(2), formatMoney(parseFloat(row.weighted_amount)), trim(row.comment)],
          };
        })];
      }
      case CONST.TABLES.OUTFLOW: {
        return [{"cells": ['Date', 'Classification', 'Amt. €', 'Local amt.', 'Wt.', 'Wtd. amt. €', 'Comment']}, ...data.map((row) => {
          return {
            "cells": [labUtils.intToDate(row.date), row.category, formatMoney(parseFloat(row.amount)), formatMoney(parseFloat(row.localAmount), trim(row.currency)), parseFloat(row.weight).toFixed(2), formatMoney(parseFloat(row.weighted_amount)), trim(row.comment)],
            "extraInfo": {
              weight: row.weightage,
              index: row.index
            }
          };
        })];
      }
      case CONST.TABLES.ADJUSTMENT: {
        return [{"cells": ['Date', 'Type', 'Classification', 'Amt. €', 'Local amt.', 'Wt.', 'Wtd. amt. €', 'Comment', 'Insertion Date']}, ...data.map((row) => {
          return {
            "cells": [labUtils.intToDate(row.date), trim(row.type), row.category, formatMoney(parseFloat(row.amount)), formatMoney(parseFloat(row.localAmount), trim(row.currency)), parseFloat(row.weight).toFixed(2), formatMoney(parseFloat(row.weighted_amount)), trim(row.comment), trim(row.timestamp)],
            "extraInfo": {
              weight: row.weightage,
              index: row.index
            }
          };
        })];
      }

      default: {
        console.error('########## Wrong table type! ############');
        return;
      }
    }
  };
  /**
   * 1        --> "EUR1.00"
   * 12       --> "12.00"
   * 123      --> "123.00"
   * 1234     --> "1,234.00"
   * @param amt: String
   * @param currency: String
   * @returns {string}
   */
  const formatMoney = (amt, currency = '') => {
    amt = '' + amt;
    const _compactCurrency = ((currency) => {
      const _t = trim(currency.toLowerCase());
      if (_t.match('eur')) {
        return '€';
      }
      else if (_t.match('usd')) {
        return '$';
      }
      else if (_t.match('gbp')) {
        return '£';
      }
      else return trim(currency.toUpperCase());
    })(currency);
    // http://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-money-in-javascript
    return trim(_compactCurrency + ' ' + amt.replace(/./g, function (c, i, a) {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
      }));
  };
  return {
    getFormattedTable,
    formatMoney
  };
})();

export default(utils);
