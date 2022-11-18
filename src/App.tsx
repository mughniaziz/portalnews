import React, {FC} from 'react';
import {Typography, Divider} from 'antd';
import {Routes, Route} from 'react-router-dom';
import NewsSection from './components/newsSection';
import './App.css';
import NewsDetail from './components/detailSection';

const App: FC = () => {
  const {Title} = Typography;
  return (
    <div className="App">
      <Title>Portal News</Title>
      <Divider className="divider" />
      <div className="content">
        <Routes>
          <Route path='/' element={<NewsSection />} />
          <Route path='/news/detail' element={<NewsDetail />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
