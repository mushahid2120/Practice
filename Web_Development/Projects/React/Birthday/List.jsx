import React from "react";

export default function List({ data }) {
  console.log(data);
  if(data===null)
    return ''
  return data.map((person) => {
    return (
      <div className="person" key={person.name}>
        <div className="img-container">
          <img src={person.image} alt={person.image + "image"} />
        </div>
        <div className="text-container">
          <h1 className="person-name">{person.name}</h1>
          <p className="person-age">{person.age} years</p>
        </div>
      </div>
    );
  });
}
