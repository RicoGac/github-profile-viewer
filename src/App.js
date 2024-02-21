import logo from './logo.svg';
import GithubImage from './GitHub-Mark.png'
import './App.css';
import { useState } from 'react';

// Main functional component
function App() {
  // State to manage the search input and user data
  const [search, setSearch] = useState("");
  const [userData, setUserData] = useState();

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Fetch GitHub user data based on the entered username
    fetch(`https://api.github.com/users/${search}`)
      .then(Response => Response.json())
      .then(userResponse => setUserData(userResponse));
  }

  // Function to handle input change in the search field
  const handleChange = (event) => {
    setSearch(event.target.value);
  }

  // JSX structure of the component
  return (
    <div className="container text-center">
      <h1 className="py-5">Github profile</h1>

      {/* Search form */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Github user</label>
          <div className="input-group">
            {/* Input field for GitHub username */}
            <input
              type='text'
              className='form-control'
              required
              value={search}
              onChange={handleChange}
            />
            {/* Submit button for form */}
            <span className='input-group-btn'>
              <button type='submit' className='btn btn-success'>
                Search
              </button>
            </span>
          </div>
        </div>
      </form>

      {/* Display user information */}
      <div className='py-5'>
        {!userData && (
          // Display GitHub logo if no user data is available
          <img
            src={GithubImage}
            className='responsive rounded-circle'
            alt=''
            height="200px"
          />
        )}
        {userData && (
          // Display user profile information if available
          <div>
            <img
              src={userData.avatar_url}
              className='responsive rounded-circle'
              alt=''
              height="200px"
            />
            <h1 className='pt-5'>
              {/* Link to GitHub profile */}
              <a href={userData.html_url} target='_new'>
                {userData.login}
              </a>
            </h1>
            {/* Additional user information */}
            <p>Name: {userData.name}</p>
            <p>Company: {userData.company}</p>
            <p>Blog: {userData.blog}</p>
            <p>Email: {userData.email}</p>
            <p>Bio: {userData.bio}</p>
            <p>Twitter: {userData.twitter_username}</p>
            <p>Public Repositories: {userData.public_repos}</p>
            <p>Public Gists: {userData.public_gists}</p>
            <p>Followers: {userData.followers}</p>
            <p>Following: {userData.following}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Export the component
export default App;
