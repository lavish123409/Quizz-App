import React, { useEffect } from 'react';

const Profile = () => {

    useEffect(() => {
      console.log('rnng');
    
      return () => {
        ;
      };
    }, []);
    

  return <div>
      Hello
  </div>;
};

export default Profile;
