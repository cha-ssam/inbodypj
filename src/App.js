import React, { useState } from 'react'; // 
import axios from 'axios';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };  

  const handleFileRemove = () => {
    setSelectedFile(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("파일을 먼저 선택하세요!");
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setAnalysisResult(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="App">
      <h1>인바디 성분표 분석</h1>
      
      {selectedFile ? (
        <div>
          <p>선택된 파일: {selectedFile.name}</p>
          <button onClick={handleFileRemove}>파일 제거</button>
        </div>
      ) : (
        <input type="file" onChange={handleFileChange} />
      )}
      
      <button onClick={handleUpload}>업로드 및 분석</button>

      {analysisResult && (
        <div>
          <h2>분석 결과</h2>
          <pre>{JSON.stringify(analysisResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
