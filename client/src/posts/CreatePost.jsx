import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from './postsSlice';

function CreatePost() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  async function parseNewPost() {
    const result = await dispatch(addPost({
      name,
      description,
    }));

    if (!result.error) {
      setName('');
      setDescription('');
    }
  }

  return (
    <div className="row">
      <div className="col-sm">
        <input className="form-control mb-2" type="text" value={name} onChange={(e) => setName(e.target.value || '')} placeholder="Nombre" maxLength={255} />
        <textarea className="form-control mb-2" value={description} onChange={(e) => setDescription(e.target.value || '')} rows="3" placeholder="Descripción"></textarea>
        <button className="btn btn-primary" onClick={parseNewPost}>Crear</button>
      </div>
    </div>
  );
}

export default CreatePost;
