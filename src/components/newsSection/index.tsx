import React, { useState, FC, useEffect } from 'react';
import { List, Typography } from 'antd';
import {useNavigate} from 'react-router-dom';
import { IResponseArticles, IArticle } from './model'
import axios, { AxiosResponse } from 'axios';
import './index.css';

const NewsSection: FC = () => {

  const navigate = useNavigate();

  const {Text, Link} = Typography
  
  const [news, setNews] = useState<IResponseArticles>();
  const [page] = useState<number>(1);
  const [totRes, setTotRes] = useState<number>(0);
  const [isLoad, setIsLoad] = useState<boolean>(false);

  useEffect(() => {
    getArticles(page, totRes);
  }, [page, totRes])

  const getArticles = async (page: number, pageSize: number): Promise<void> => {
    setIsLoad(true);
    await axios.get(`https://newsapi.org/v2/top-headlines?country=us&page=${page}&pageSize=${pageSize}&apiKey=d3e24b57b9ff4999b6419e53acc0c94e`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }).then((response: AxiosResponse<IResponseArticles>) => {
      if (response.data?.status === 'ok')
      setNews(response.data);
      setTotRes(response.data?.totalResults);
    }).finally(() => {
      setIsLoad(false);
    })
  }

  return (
      <List
        loading={isLoad}
        itemLayout='vertical'
        size='large'
        dataSource={news?.articles}
        pagination={{
          onChange: pages => {
            console.log(pages);
          },
        }}
        footer={<div className='centerFooter'>Muhammad Mughni Aziz</div>}
        renderItem={(item: IArticle, idx: number) => (
          <List.Item
            key={idx}
            extra={<img alt='img-news' src={item?.urlToImage === null ? 'https://career.astra.co.id/static/media/image_not_available1.94c0c57d.png' : item?.urlToImage} width={150} />}
            actions={[<Text>Author: {item?.author === null ? '-' : item?.author}</Text>, <Link className='btnMore' onClick={() => navigate('/news/detail', {state: {
              title: item?.title,
              content: item?.content,
              urlImg: item?.urlToImage === null ? 'https://career.astra.co.id/static/media/image_not_available1.94c0c57d.png' : item?.urlToImage,
              author: item?.author,
              url: item?.url
            }})}>Read More</Link>]}>
            <List.Item.Meta title={item?.title} description={item?.description === null ? 'This news not have description' : item?.description} />
          </List.Item>
        )}
      />
  );
}

export default NewsSection;
