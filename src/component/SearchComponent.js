import React from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import { useEffect } from "react/cjs/react.development";
import { Form } from "semantic-ui-react";

const SearchComponent = () => {
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [githubUsersAll, setGithubUsersAll] = useState([]);

  async function loadGithubAllUsers() {
    const response = await fetch(`https://api.github.com/users`);
    const data = await response.json();
    console.log(data);
    if (data) {
      const users = data.map((eachUser) => {
        return eachUser.login;
      });
      setGithubUsersAll(users);
    }
  }

  const history = useHistory();
  const handleSearch = (e) => {
    setUserInput(e.target.value);
  };

  useEffect(() => {
    setFilteredUsers(
      githubUsersAll.filter((eachUser) => {
        return eachUser.toLowerCase().includes(userInput.toLowerCase());
      })
    );
  }, [userInput]);

  const handleSubmit = () => {
    if (userInput.length > 0) {
      history.push({
        search: "?" + new URLSearchParams({ userInput: userInput }).toString(),
        pathname: "/userProfile",
        state: { userInput: userInput },
      });
    } else {
      setError("Please type correct name");
    }
  };

  useEffect(() => {
    loadGithubAllUsers();
  }, []);

  const selectUser = (user) => {
    setUserInput(user);
  };
  return (
    <>
      <div className="navbar">Search Github Users</div>
      <div className="search">
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Input
              autoComplete="off"
              placeholder="Github user"
              name="github user"
              onChange={handleSearch}
              value={userInput}
            />

            <Form.Button content="Search" />
          </Form.Group>
        </Form>
      </div>
      {userInput &&
        filteredUsers &&
        filteredUsers.map((user) => {
          return (
            <ul style={{ marginLeft: "35%", marginTop: "10px" }}>
              <li
                style={{ width: "50%", cursor: "pointer" }}
                onClick={() => selectUser(user)}
              >
                {user}
              </li>
            </ul>
          );
        })}
      {!userInput && <h1 style={{marginLeft:"39.5%",marginTop:"2%",color:"red"}}>{error}</h1>}
    </>
  );
};
export default SearchComponent;
