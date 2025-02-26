import React, { use, useEffect } from "react";
import { getUsers } from "../../services/Api";

const Use = () => {
  const { data } = use(getUsers(`/users`));
  
  useEffect(() => {
    console.log(data);
  }, []);

  return <div></div>;
};

export default Use;
