/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://open.imtihantech.com',
    generateRobotsTxt: true,
    sitemapSize: 7000,
    exclude:
        [
            '/account',
            '/account/settings',
            '/announcement',
            '/class-schedule',
            '/exam',
            '/exam/result',
            '/exam/test',
            '/muin',
            '/note',
            '/note/create',
            '/note/flow',
            '/notification',
            '/plan',
            '/support',
            '/wizard',
            '/auth/verify-email',
            '/auth/wait-list',
        ],
}