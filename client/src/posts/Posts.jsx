import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CreatePost from './CreatePost';
import { deletePost, fetchPosts } from './postsSlice';

function App() {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.posts);
  const loaded = useSelector(state => state.posts.loaded);

  useEffect(() => {
    if (!loaded) {
      dispatch(fetchPosts());
    }
  }, [dispatch]);
 
  const [filterBy, setFilterBy] = useState('');

  const filteredPosts = useMemo(() => {
    if (!filterBy) return posts;

    return posts.filter(p => p.name.toLowerCase().includes(filterBy.toLowerCase()))
  }, [posts, filterBy]);

  function confirmDeletePost(postId) {
    if (confirm('¿Desea eliminar la entrada?')) {
      dispatch(deletePost(postId));
    }
  }

  return (
    <div className="container my-3">
      <CreatePost />

      <hr />
      
      <div className="row mb-2">
        <div className="col-sm">
          <input className="form-control" type="text" onChange={(e) => setFilterBy(e.target.value)} placeholder="Filtrar por nombre..." />
        </div>
      </div>
      
      <div className="row">
        <div className="col-sm">
          <div className="table-responsive-sm">
            <table className="table">
              <caption>Mostrando {filteredPosts.length} entrada{filteredPosts.length > 1 ? 's' : ''} de {posts.length}</caption>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.map(post => 
                  <tr key={post.id}>
                    <td>{post.name}</td>
                    <td>{post.description}</td>
                    <td><button className="btn btn-sm btn-danger" onClick={() => confirmDeletePost(post.id)}>Eliminar</button></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
