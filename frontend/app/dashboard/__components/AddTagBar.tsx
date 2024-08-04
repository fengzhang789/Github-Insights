import React, { useState } from 'react';
import axios from 'axios';

interface AddTagBarProps {
    repo: string | null;
}

const AddTagBar: React.FC<AddTagBarProps> = ({repo}) => {
  const [tagName, setTagName] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagName(event.target.value);
  };

  const handleAddTag = () => {
    if (tagName.trim() === '') return;

    axios.post('http://localhost:5000/github/repository/tags', {
        repoName: repo,
        tag: tagName,
    })
    .then((response) => {
      console.log('Tag added:', response.data);
      setTagName('');
    })
    .catch((error) => {
      console.error('Error adding tag:', error);
    });
  };

  if (!repo) return null;
  
  return (
    <div className="flex items-center">
      <input
        type="text"
        value={tagName}
        onChange={handleInputChange}
        placeholder="Enter new tag name"
        className="border p-2 flex-grow"
      />
      <button
        onClick={handleAddTag}
        className="bg-blue-500 text-white p-2 ml-2"
      >
        Add Tag
      </button>
    </div>
  );
};

export default AddTagBar;