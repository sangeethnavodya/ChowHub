import React, { useEffect, useState } from "react";
import { SmileOutlined, HeartOutlined, StarOutlined, MehOutlined } from '@ant-design/icons';
import axios from "axios";
import '../Post/react.css'

function ReactComponent(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [reactId, setReactId] = useState('');
  const [react, setReact] = useState([]);
  const [hahaCount1, setHahaCount] = useState(0);
  const [wowCount1, setWowCount] = useState(0);
  const [sadCount1, setSadCount] = useState(0);
  const [heartCount1, setHeartCount] = useState(0);
  const [hahaFirst, setHahaFirst] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:8080/react/${props.data.id}`);
      console.log(response.data);
      const { hahaCount, heartCount, sadCount, wowCount, id } = response.data[0];
      setHahaCount(hahaCount);
      setWowCount(wowCount);
      setSadCount(sadCount);
      setHeartCount(heartCount); // Assuming the angryCount represents heartCount in your case
      setReactId(id);
      setIsLoading(false);
    }
    fetchData();
  }, [props.data.id]);

  function handleHaha() {
    if (hahaFirst) {
      setHahaCount(prevCount => prevCount + 1);
      setHahaFirst(false);
      axios.put(`http://localhost:8080/react/${reactId}`, { hahaCount: hahaCount1 + 1 })
        .then(response => {
          console.log(response);
          // Handle successful response here
        })
        .catch(error => {
          console.error(error);
          // Handle error response here
        });
    } else {
      setHahaCount(prevCount => prevCount - 1);
      setHahaFirst(true);
      axios.put(`http://localhost:8080/react/${reactId}`, { hahaCount: hahaCount1 - 1 })
        .then(response => {
          console.log(response);
          // Handle successful response here
        })
        .catch(error => {
          console.error(error);
          // Handle error response here
        });
    }
  }
  function handleHeart() {
    if (hahaFirst) {
      setHeartCount(prevCount => prevCount + 1);
      setHahaFirst(false);
      axios.put(`http://localhost:8080/react/heart/${reactId}`, { heartCount: heartCount1 + 1 })
        .then(response => {
          console.log(response);
          // Handle successful response here
        })
        .catch(error => {
          console.error(error);
          // Handle error response here
        });
    } else {
      setHeartCount(prevCount => prevCount - 1);
      setHahaFirst(true);
      axios.put(`http://localhost:8080/react/heart/${reactId}`, { heartCount: heartCount1 - 1 })
        .then(response => {
          console.log(response);
          // Handle successful response here
        })
        .catch(error => {
          console.error(error);
          // Handle error response here
        });
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="main-react">
        <div className="main-haha">
        <SmileOutlined className="emoji-haha" onClick={handleHaha} />
        <div className="reactCount" >{hahaCount1}</div>
        </div>
        <div className="main-haha">
        <HeartOutlined className="emoji-wow" onClick={handleHeart}/>
        <div className="reactCount" >{heartCount1}</div>
        </div>
        {/* <StarOutlined className="emoji-like" />
        <MehOutlined className="emoji-sad" /> */}
      </div>
      


    
    </div>
  );
}

export default ReactComponent;
