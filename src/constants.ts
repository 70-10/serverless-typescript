const { SERVICE_NAME, NODE_ENV } = process.env;

export const TableName = {
  User: `${SERVICE_NAME}-${NODE_ENV}-User`,
};
