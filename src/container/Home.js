
import React, { useState } from 'react';
import "./Home.css"
import { ReactComponent as Sun } from "../assests/Sun.svg";
import { ReactComponent as Moon } from "../assests/Moon.svg";
import { FcDownload } from "react-icons/fc";

function Home() {


  const [inputValue, setInputValue] = useState('');
  const [listimg, setListImg] = useState([]);

  const setDarkMode = () => {
    document.querySelector("body").setAttribute('date-theme', 'dark')
    localStorage.setItem("selectedTheme", "dark")
  };

  const setLightMode = () => {
    document.querySelector("body").setAttribute('date-theme', 'light')
    localStorage.setItem("selectedTheme", "light")
  };



  const toggleTheme = e => {
    if (e.target.checked) setDarkMode();
    else setLightMode()
  };

    const api= "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";


    const getain = async () => {
      const inp = document.getElementById('inp');
      // إجراء الطلب
      const methods = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${api}`
        },
        body: JSON.stringify({
          prompt: inp.value, // تغيير "sea" إلى "prompt"
          n: 3,
          size: "256x256"
        })
      };
    
      try {
        const res = await fetch("https://api.openai.com/v1/images/generations", methods);
    
        if (!res.ok) {
          const error = await res.json();
          console.error('خطأ في API OpenAI:', error.error.message);
          return;
        }
    
        // تحليل الاستجابة كملف JSON
    

    // استخدام listimg في هذا النطاق
    const data = await res.json();
    const listimg = data.data;

    // حفظ الصور في الحالة
    setListImg(listimg);

  } catch (error) {
    console.error('خطأ:', error.message);
  }
};
    

  return (
    <section>
   <div className='tit'>
        <h1>AI TEST</h1>
      
        <div className='dark_modes'>
      <input
        className='dark_mode_inputs'
        type='checkbox'
        id='darkmode-toggle'
        onChange={toggleTheme}
      />
      <label className='dark_mode_labels' for='darkmode-toggle'>
        <Sun />
        <Moon />
      </label>
    </div>

      </div>

      <div className='half'>
        <h2>AI Images Generator</h2>
      </div>

      <div className='ain'>
  {listimg.map(photo => (
    <div key={photo.id}>
      <img src={photo.url} alt={`AI Image ${photo.id}`} loading="lazy" />
      {/* إضافة رابط تحميل لكل صورة */}
      <a href={photo.url} download={`AI_Image_${photo.id}`} target="_blank">
      <FcDownload />
      </a>
    </div>
  ))}
</div>


      <div className='sea'>
  <input id='inp' value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
  <button onClick={getain}>Generate</button>
</div>
    </section>
  )
}


export default Home;
