import React from 'react'
import { useState} from 'react';
import { useHistory } from 'react-router';
import { useEffect } from 'react/cjs/react.development';
import {Card,Image,Icon} from "semantic-ui-react";
const UserProfile = () => {
  // const{userInput}=props;
  const history=useHistory();
    const [name,setName]=useState('');
    const [userName,setUsername]=useState('');
    const [bio,setBio]=useState('');
    const[id,setId]=useState('');
    const[company,setCompany]=useState('');
    const[location,setLocation]=useState('');
    const [followers,setFollowers]=useState('');
    const [following,setFollowing]=useState('');
    const [repos,setRepos]=useState('');
    const [avatar,setAvatar]=useState('');

    const setData = ({name,id,company,location,login,followers,following,public_repos,bio,avatar_url}) => {
        setName(name);
        setUsername(login);
        setId(id);
        setLocation(location);
        setCompany(company);
        setFollowers(followers);
        setFollowing(following);
        setRepos(public_repos);
        setAvatar(avatar_url);
        setBio(bio);
    
      };

       useEffect(()=>{
        fetch(`https://api.github.com/users/${history.location.state.userInput}`)
        .then(res=>res.json())
        .then(data=>{
          setData(data);
        });
      },[history.location.state.userInput]);

      console.log(history.location.state.userInput);
    return (
        <div className="card">
        <Card>
    <Image src={avatar} wrapped ui={false} />
    <Card.Content>

      <Card.Header>{name}</Card.Header>
      <Card.Header>{userName}</Card.Header>
      <Card.Header>{id}</Card.Header>
      <Card.Header>{location}</Card.Header>
      <Card.Header>{company}</Card.Header>


      <Card.Meta>
        <span>{repos}</span>
      </Card.Meta>

      <Card.Description>
        {bio}
      </Card.Description>

    </Card.Content>

    <Card.Content extra> 
      <a href>
        <Icon name='user' />
        {followers} followers
      </a>
    </Card.Content>
    <Card.Content extra> 
    <a href>
        <Icon name='user' />
        {following} following
      </a>
    </Card.Content>
  </Card>
        </div>
    )
}

export default UserProfile
