import React from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import { useEffect } from "react/cjs/react.development";
import { Form } from "semantic-ui-react";
import axios from "axios";


const SearchComponent = () => {
  // const suggestions=[
  //   "shyamsha",
  //   "subahm-jain",
  //   "Peeyush-kumar7656",
  //   "a4aakash",
  //   "a4akash",
  //   "deven",
  //   "subhajit"
  // ]
  const [userInput, setUserInput] = useState(" ");
  const [error, setError] = useState(null);
  const [githubUsers,setGithubusers]=useState([]);
  // const [filteredUsers, setFilteredUsers] = useState([]);
  // const[display,setDisplay]=useState(false);
  // const [options,setOptions]=useState([]);

  // useEffect(()=>{
  //   const githubUsers=[];
  //   const promises=new Array.fill().map((v)=>fetch(`https://api.github.com/users`));
  //   Promise.all(promises).then(githubUsersArr => {
  //     return githubUsersArr.map(value =>
  //       value
  //         .json()
  //         .then(({ login }) =>
  //           githubUsers.push({login})
  //         )
  //     );
  //   });
  //   setOptions(githubUsers);
  //   console.log(githubUsers);
  // }, [userInput]);

  // useEffect(() => {
  //   axios
  //     .get("https://api.github.com/users")
  //     .then(res => {
  //       setGithubusers(res.data);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }, []);

  // useEffect(() => {
  //   setFilteredUsers(
  //     githubUsers.filter(users =>{
  //      return users.login.toLowerCase().includes(userInput.toLowerCase())
  //     })
  //   );
  // }, [userInput,githubUsers]);

 
  useEffect(() => {
    const loadGithubUsers=async ()=>{
      const response= await axios.get("https://api.github.com/users")
          setGithubusers(response.data);
        };
        loadGithubUsers();
      },[]);

      console.log(githubUsers);

  const history = useHistory();
  const handleSearch = (e) => {
    setUserInput(e.target.value);
  };
  // const handleSearch=(userInput)=>{
  //    let matches = githubUsers.filter((users)=>{
  //       const regex=new RegExp(`${userInput}`,"gi")
  //       return users.login.match(regex);
  //    })
  //     setGithubusers(matches);
  // }

  const handleSubmit = () => {
          if(userInput.length>0){
          history.push({
            search:"?" + new URLSearchParams({userInput:userInput}).toString(),
            pathname: '/userProfile',
            state: { userInput:userInput }
          });
          
          }
          else{
            setError("Please type correct name");
          }
  };
  return (
    <>
      <div className="navbar">Search Github Users</div>
      <div className="search">
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Input
              placeholder="Github user"
              name="github user"
              onChange={handleSearch}
              // onClick={()=>setDisplay(!display)}
              // onChange={(e)=>handleSearch(e.target.value)}
            />
            <Form.Button content="Search"/>
          </Form.Group>
        </Form>
      </div>
      {error ? <h1>Please type correct name</h1> : null}
      {/* <Autocomplete suggestions={suggestions}/> */}
      {/* {display && (
        <div className="autoContainer">
          {options
            .filter(({login }) => login.value(userInput))
            .map((value) => {
              return (
                  <span>{value.login}</span>
              );
            })} */}
        {/* </div>
      )} */}

      {/* {filteredUsers.map((users, idx) => (
        <GithubDetail key={idx} {...users} />
      ))}
      {filteredUsers.length === 0 && <p>No users found</p>} */}

      {/* {githubUsers && githubUsers.map((item,index) => {
          <div key={index} style={{marginLeft:"35%",marginTop:"10px"}}>
            <Card style={{width:'50%'}} title={`${item.login}`}></Card>
          </div> */}
      {/* })} */}
    </>
  );
}

// const GithubDetail = props => {
//   const {login} = props;
//   return (
//     <>
//       <p>{login}</p>
//     </>
//   );
// };

export default SearchComponent;
