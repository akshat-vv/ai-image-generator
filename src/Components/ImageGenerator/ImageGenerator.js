import React, { useRef, useState } from 'react';
import "./ImageGenerator.css"
import defaultImage from '../Assets/default_image.jpg'

export const ImageGenerator = () => {

  const [image_url,setImage_url] = useState('/');
  const [loading,setLoading] = useState(false);
  let inputRef = useRef(null);

  const imageGenerator = async () =>{
    if(inputRef.current.value === ''){
      return 0;
    }
    setLoading(true);
    const response = await fetch("https://api.openai.com/v1/images/generations",
    {
      method:'POST',
      headers:{
        "Content-Type":"application/json",
        Authorization:
        "Bearer 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",
        "User-Agent":"Chrome",
      },
      body:JSON.stringify({
        model: "dall-e-2",
        prompt: `${inputRef.current.value}`,
        n: 1,
        size: "1024x1024"
      }),
    }
    );
    let data = await response.json();
    let data_array = data.data;
    setImage_url(data_array[0].url);
    setLoading(false);
  }

  return (
    <div className='ai-image-generator'>
      <div className='header'>
        AI Image <span>Generator</span>
      </div>
      <div className='img-loading'>
        <div className='image'>
          <img src={image_url === '/' ? defaultImage : image_url}/>
        </div>
        <div className='loading'>
          <div className={loading ? 'loading-bar-full' :'loading-bar'}></div>
          <div className={loading ? 'loading-text' : 'display-none'}>Loading...</div>
        </div>
      </div>
      <div className='search-box'>
        <input type='text' ref={inputRef} className='search-input' placeholder='Describe what you want to see'></input>
        <div className='generate-btn' onClick={()=>imageGenerator()}>Generate</div>
      </div>
    </div>
  )
}
