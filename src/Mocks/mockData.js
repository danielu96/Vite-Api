import { nanoid } from 'nanoid';

  const  userList = [
      {
        id: nanoid(),
        password: "123",
        name: "Daniel",
        lastName: "Kartkowski",
        location: "Wasabi",
        email: "daniel@wp.pl"
      },
      {
        id:nanoid(),
        password: "pa213",
        name: "Paul",
        lastName: "Polowski",       
        location: "San Paulo",
        email: "paul@pp.pl",
      },
      {
        id: nanoid(),
        password: "r098",
        name: "Raulo",
        lastName: "Raulenios", 
        location: "RaulosTown",
        email: "raul@wp.pl"
      },
      {
        id: nanoid(),
        password: "j456",
        name: "John",
        lastName: "Johnas", 
        location: "JohnTown",
        email: "john@jp.pl"
      }
    ]
  export default userList