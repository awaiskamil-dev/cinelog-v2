import Overview from "./Overview";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import API_URL from "../../config";

const TvOverview = function(){
  const {id} = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await fetch(`${API_URL}/tv/${id}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(`Failed to fetch tv show: ${response.status}`);
        }

        setData(data);
      }catch(err){
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  if(!data){
    return <div></div>;
  }

  return(
    <Overview type="tv" data={data}/>
  );
};

export default TvOverview;