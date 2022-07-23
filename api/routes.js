import Router from '@koa/router';
import pool from './db.js';

const router = new Router({
  prefix: '/api/posts'
});

router.get('/', async (ctx) => {
  const { rows } = await pool.query('SELECT id, name, description FROM posts');

  ctx.body = rows;
});

router.post('/', async (ctx) => {
  const { name, description } = ctx.request.body;
  if (!name || !description) {
    ctx.status = 400;
    return ctx.body = {
      error: 'Missing name/description',
    };
  }

  const { rows } = await pool.query(
    'INSERT INTO posts (name, description) VALUES ($1, $2) RETURNING *', 
    [name, description]
  );

  ctx.body = rows[0];
});

router.delete('/:id', async (ctx) => {
  const { rows } = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *', [ctx.params.id]);

  ctx.body = rows[0];
});

export default router;
