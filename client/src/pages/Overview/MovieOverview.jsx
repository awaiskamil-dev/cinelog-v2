import { useParams } from "react-router";
import Overview from "./Overview";
import { useEffect, useState } from "react";
import API_URL from "../../config";

const MoiveOverview = function(){
  const {id} = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await fetch(`${API_URL}/movies/${id}`);
        const data = response.json();

        setData(data);
      }catch(err){
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  return(
    <Overview type="movie" data={data}/>
  );
};

export default MoiveOverview;