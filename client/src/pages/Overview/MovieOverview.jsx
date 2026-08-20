import { useParams } from "react-router";
import Overview from "./Overview";
import { useEffect, useState } from "react";
import API_URL from "../../config";

const MovieOverview = function(){
  const {id} = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await fetch(`${API_URL}/movies/${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(`Failed to fetch movie: ${response.status}`);
        }

        setData(data);
      }catch(err){
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  if (!data) {
    return <div></div>;
  }

  return(
    <Overview type="movie" data={data}/>
  );
};

export default MovieOverview;