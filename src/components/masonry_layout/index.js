
import React, { useEffect, useState } from "react";
import { createApi } from "unsplash-js";

// See https://unsplash.com/developers and get access token 
const api = createApi({
  // Don't forget to set your access token here!
  accessKey: "1s947LsFLoCQ_TzXFUbMYjQViH56M7q2JQJ3v4j-8dc"
});

const MasonaryLayout = () => {  
  const finalImagesList = [];
  const [data, setPhotosResponse] = useState(null);
  useEffect(() => {
    api.photos.list().then(result => {
      console.log(result);
      setPhotosResponse(result.response?.results);
    })
      .catch(() => {
        console.log("something went wrong!");
      });

  }, []);

// function to arrange images based on height
  const orderImageByHeight = ({ image, column = 3 }) => {
   
    const tempArr = Array(column - 1).fill(0);
    let childToAppend = [];
    let loopCount = 0;
    image?.forEach((item, idx) => {
      const min = Math.min(...tempArr);
      const index = tempArr.indexOf(min);
      loopCount++;
      childToAppend[index] = item;
      console.log(tempArr[index]);
      tempArr[index] = tempArr[index] + item.height;
      if (loopCount === column - 1) {
        childToAppend?.forEach((i) => {
          finalImagesList.push(i)
        });
        childToAppend = []
        loopCount = 0;
      }
    })  
    return finalImagesList;
    }

  orderImageByHeight({ image: data })


  if (data === null) {
    return <div>Loading... Please wait..</div>;
  } else if (data.errors) {
    return (
      <div>
        <div>{data.errors[0]}</div>
        <div>Please make sure to set your access token!</div>
      </div>
    );
  } else {
    return (
        <div className="container">
            
        {finalImagesList.map(photo => (
          <div className="item" key={photo.id} >
            <img key={photo.id} src={photo.urls.small_s3} alt={photo.alt_description} />
          </div>
        ))}
        
      </div>
    );
  }
};


export default MasonaryLayout;
