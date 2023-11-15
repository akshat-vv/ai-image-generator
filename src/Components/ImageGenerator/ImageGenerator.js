import React, { useEffect, useRef, useState } from 'react';
import "./ImageGenerator.css"
import ErrorPage from '../ErrorComponent/ErrorPage';
import errorImage from '../Assets/errorImage.jpg'
import defaultImage from '../Assets/default_image.jpg'

export const ImageGenerator = () => {

  const [image_url,setImage_url] = useState('/');
  const [image_url2,setImage_url2] = useState('/');
  const [image_url3,setImage_url3] = useState('/');
  const [disableButton,setButtonDisable] = useState(false);
  const [loading,setLoading] = useState(false);
  const [hasError,setError] = useState(null);
  let inputRef = useRef(null);


  useEffect(() => {
    const timer = setTimeout(() => {
      setButtonDisable(false);
    }, 60000);
    return () => clearTimeout(timer);
  }, [disableButton]);

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
        n: 3,
        size: "256x256"
      }),
    }
    );
    let data = await response.json();
    if(data.error){
      setLoading(false);
      setImage_url(errorImage);
      setImage_url2(errorImage);
      setImage_url3(errorImage);
      setError(data.error);
    }else{
    let data_array = data.data;
    setButtonDisable(true);
    setImage_url(data_array[0].url);
    setImage_url2(data_array[1].url);
    setImage_url3(data_array[2].url);
    setLoading(false);
    }
  }

  return (
      <div className='ai-image-generator'>
      <div className='header'>
        AI Image <span>Generator</span>
      </div>
      <div className='img-loading'>
        <div className='image'>
          <img src={image_url === '/' ? defaultImage : image_url}/>
          <img src={image_url === '/' ? defaultImage : image_url2}/>
          <img src={image_url === '/' ? defaultImage : image_url3}/>
        </div>
        <div className='loading'>
          {/* <div className={loading ? 'loading-bar-full' :'loading-bar'}></div> */}
          <div className={loading ? 'loading-text' : 'display-none'}>Your image is being created by AI</div>
          {loading && <div className="loader"></div>}
        </div>
      </div>
      {hasError && <ErrorPage error={hasError}/>}
      <div className='search-box'>
        <input type='text' ref={inputRef} className='search-input' placeholder='Describe what you want to see'></input>
        <button className='generate-btn' disabled={disableButton} onClick={()=>imageGenerator()}>Generate</button>
      </div>
      {   disableButton &&
      <div className='disclaimer'>
       <p> <span>Note:</span> You can only generate 3 images/minute</p>
      </div>}
    </div>
  )
}
