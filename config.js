
const environments = {};

environments.staging = {
    'httpPort': 3000,
    'envName': 'staging'
};

environments.production = {
    'httpPort': 5000,
    'envName': 'production'
};

const environment = typeof(process.env.NODE_ENV) == 'string' 
    ? process.env.NODE_ENV.toLowerCase() 
    : '';

const environmentToExport = typeof(environments[environment]) == 'object'
    ? environments[environment]
    : environments.staging;

module.exports = environmentToExport;