import React, { FC, useEffect, useState } from "react";
import { Typography } from 'antd';
import { useLocation } from 'react-router-dom';
import {IParseResponse} from './interface'
import {Readability} from '@mozilla/readability'
import axios, { AxiosResponse } from "axios";
import './styles.css';


const NewsDetail: FC = () => {
  const location = useLocation();
  const { Title, Text } = Typography;
  const { title, urlImg, author, url } = location.state;

  const [text, setText] = useState<string | undefined>('')

  useEffect(() => {
    getText();
  })

  const getText = async (): Promise<void> => {
    await axios.get(url).then((res: AxiosResponse<IParseResponse>) => {
      let dom = new DOMParser().parseFromString(res?.data.toString(), 'text/html');
      let contentText = new Readability(dom).parse();
      setText(contentText?.textContent);
    })
  }

  return (
    <div className="body">
      <Text className="text">Author: {author === null ? '-' : author}</Text>
      <div className="center">
        <img alt="img-preview" src={urlImg} width="80%" height="600px" />
        <Title>{title}</Title>
        <div className="justify">
          <Text className="content">{text}</Text>
        </div>
      </div>
    </div>
  );
}

export default NewsDetail;
