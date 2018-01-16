import Vue from 'vue';
import Router from 'koa-router';
import render from 'vue-server-renderer';
import fs from 'fs';
import path from 'path';

const currentPath = path.resolve();
const templatePath = path.join(currentPath, 'src', 'server', 'templates');

const renderer = render.createRenderer({
  template: fs.readFileSync(`${templatePath}//index.template.html`, 'utf-8'),
});

const router = new Router();

router.get('/ping', async (ctx, next) => {
  ctx.body = 'PONG';
});

router.get('/views', async (ctx, next) => {
  try {
    const app = new Vue({
      data: {
        url: ctx.url,
      },
      template: '<div>The visited URL is {{ url }} </div>',
    });

    const html = await renderer.renderToString(app);
    console.log(html);
    console.log(ctx.render);
    ctx.body = html;
  } catch (e) {
    console.log(e);
  }
});

export default router;
