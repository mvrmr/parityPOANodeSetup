module.exports.quals = function (acronym) {
  var qualsMapping = {
    qfa: "QFA",
    reg: "Regulations",
    ln: "Loans",
    si: "Savings & Investment",
    pns: "Pensions",
    fp: "Financial Planning"
  };
  return qualsMapping[acronym];
};

module.exports.grandFatherQuals = function (acronym) {
  var gfQualsMapping = {
    la: "Life Assurance",
    pns: "Pensions",
    si: "Savings & Investment",
    la_tap: "Life Assurance-Temporary Assurance Policies",
    la_wlp: "Life Assurance-Whole of Life Policies",
    la_lasi: "Life Assurance-Life assurance savings & investment policies",
    pns_ops: "Pensions-Occupational pension schemes",
    pns_ppp: "Pensions-Personal Pension Plans",
    pns_prsa: "Pensions-Personal Retirement Savings Accounts (PRSAs)",
    si_lasip: "Savings and Investment-Life assurance savings & investment policies",
    si_dteg1y: "Savings and Investment-Deposits with a term equal to or greater than one year",
    si_tb: "Savings and Investment-Tracker bonds",
    pgi: "Personal General Insurance",
    cgi: "Commercial General Insurance",
    aoc: "Adjudicating on Complaints",
  };
  return gfQualsMapping[acronym];
};

module.exports.mccStatuses = function (acronym) {
  var statusMapping = {
    MIS: "MCC - In Scope",
    MNR: "MCC - Not on register",
    REVK: "Revoked",
    GF: "Grandfathered",
    NE: "New Entrant"
  };
  return statusMapping[acronym];
};

/*
Pensions Date
Savings & InvestmentDate
Loans Date
Financial Planning Date
RegulationsDate
*/