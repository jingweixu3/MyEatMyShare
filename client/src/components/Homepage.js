import React, { useEffect, useState } from 'react'

const Homepage = () => {
  const [homepage, setHomePage] = useState([])
  
  fetch(`/api/homepage`)
  .then(res => res.json())
  .then(data => setHomePage(data));

  return (
      <div>
          {homepage.map(data => <div key={data.id}> 
            {data.firstName} {data.lastName} 
            </div>)}
      </div>
  );
}

export default Homepage
