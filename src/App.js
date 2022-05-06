import React, {useState} from 'react';
// import Counter from "./components/Counter";
// import ClassCounter from "./components/ClassCounter";
import './styles/App.css';
// import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
// import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import PostForm from './components/PostForm';
import MySelect from './components/UI/select/MySelect';

function App() {
  const [posts, setPosts] = useState([
    {id: 1, title: 'Ruby', body: "Description"},
    {id: 2, title: 'Ruby2', body: "Description2"},
    {id: 3, title: 'Ruby3', body: "Description3"},
  ])
  const [selectedSort, setSelectedSort] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  function getSortedPosts() {
    if(selectedSort) {
      return [...posts].sort((a, b) => a[selectedSort].localCompare(b[selectedSort]))
    }
    return posts;
  }

  const sortedPosts = getSortedPosts()

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const sortPosts = (sort) => {
    setSelectedSort(sort)
  }

  return (
    <div className="App">
      <PostForm create={createPost}/>
      <hr style={{margin: '15px 0'}}/>
      <div>
          <MyInput
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder='Search...'
          />
          <MySelect
              value={selectedSort}
              onChange={sortPosts}
              defaultValue="Sort by"
              options={[
                {value: 'title', name: 'By title'},
                {value: 'body', name: 'By desciption'}
              ]}
          />
      </div>
      {posts.length
        ? 
        <PostList remove={removePost} posts={sortedPosts} title="Ruby posts"/>
        : 
        <h1 style={{textAlign: 'center'}}>
          No posts found :(
        </h1>
      }
    </div>
  );
}

export default App;
