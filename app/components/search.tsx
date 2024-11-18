"use client"

import { useState } from "react";
import SearchBar from "./searchBar";
import User from "./user";
import { v4 as uuidv4 } from 'uuid';

interface UserType {
  name: string; // name of user
  title: string; // job title
  id: string; // unique id of user
}

const Search = () => {
  // User data
  const users: UserType[] = [
    { name: "Jennie Doe", title: "Mentor: Regina Phalange", id: uuidv4() },
    { name: "John Smith", title: "Mentor: Regina Phalange", id: uuidv4() },
    { name: "Alice Doe", title: "Mentor: Regina Phalange", id: uuidv4() },
    { name: "Bob Doe", title: "Mentor: Regina Phalange", id: uuidv4() },
  ];
  


  const [currentUser, setCurrentUser] = useState<number>(0)

  return (
    <div className="w-[370px] overflow-y-auto bg-white rounded-lg py-2.5 flex flex-col gap-5">
      <SearchBar />
      <div className="flex flex-col gap-2.5">
        {users.map((user, index) =>
           <User
            key={user.id}
            name={user.name}
            title={user.title}
            chooseUser={() => setCurrentUser(index)}
            isChosen={index == currentUser}
          />)}
      </div>
    </div>
  );
};

export default Search;
