// ***************** Imports ***************** //
const db = require("../config/index");
const { QueryTypes } = require("sequelize");

// ***************** Generate LmId Function ***************** //
const generateLmId = async (suffix, sliceCount, code_field, table) => {
  const query = `
  SELECT D.*
  FROM ${table} AS D`;

  const getAllData = await db.sequelize.query(query, {
    type: QueryTypes.SELECT,
  });

  if (getAllData.length < 1) {
    return suffix + "001";
  } else {
    let getLastCode = parseInt(
      getAllData[getAllData.length - 1][code_field].slice(sliceCount)
    );

    const newCode = suffix + String(getLastCode + 1).padStart(3, "0");

    return newCode;
  }
};

// ***************** Exports ***************** //
module.exports = generateLmId;
