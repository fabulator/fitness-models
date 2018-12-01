module.exports = {
    extends: [
        '@socifi',
    ],
    plugins: [
        'typescript', // fix for Webstorm, otherwise it does not parse ts files
    ],
};
