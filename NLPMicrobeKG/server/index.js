/* eslint-disable */
const send = require('koa-send');
const Koa = require('koa');
const Router = require('koa-router');
const userAgent = require('koa-useragent');
const path = require('path');
const swig = require('swig');
const bodyParser = require('koa-bodyparser');
const router = new Router();
const app = new Koa();

const templateRoot = path.join(__dirname, '../build/');

app.use(userAgent);
app.use(bodyParser());

router.get(/^\/static(?:\/|$)/, async ctx => {
    const filePath = ctx.path.replace(/static\//, '');
    await send(ctx, filePath, {
        root: path.join(__dirname, '../build'),
        maxage: '31536000', // long-term caching
    });
});

router.get(/^\/(.*)$/, ctx => {
    const template = swig.compileFile(path.resolve(templateRoot, 'index.html'));
    ctx.body = template({});
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
console.log('listening on port 3000');