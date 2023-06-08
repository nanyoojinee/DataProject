import React, { useEffect, useState } from 'react';
import * as S from './main.styles';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import * as Api from '../../api/index';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Legend,
} from 'recharts';

const settings = {
  infinite: true,
  slidesToShow: 1,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 6000,
  cssEase: 'linear',
  fade: true,
  pauseOnHover: false,
};

// const data = [
//   {
//     name: 'Page A',
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: 'Page B',
//     uv: 1500,
//     pv: 1200,
//     amt: 2400,
//   },
//   {
//     name: 'Page C',
//     uv: 7000,
//     pv: 6500,
//     amt: 3300,
//   },
// ];

export default function MainA() {
  const [plasticData, setPlasticData] = useState([]);

  useEffect(() => {
    const getPlasticData = async () => {
      const result = await Api.get('/plasticData');
      setPlasticData(JSON.parse(result.data.data));
    };
    getPlasticData();
  }, []);

  console.log(plasticData);

  return (
    <S.MainWrap02>
      <S.MainContainer>
        <S.MainMent02>
          심각한 환경문제 <br />
          어떻게 생각하시나요?
        </S.MainMent02>
        <S.SlickContainer>
          <Slider {...settings}>
            <div>
              <S.ChartInfo>
                <h3>차트 제목</h3>
                <p>차트 설명차트 설명차트 설명차트 설명차트 설명차트 설명차트 설명차트 설명차트</p>
              </S.ChartInfo>
              <S.ChartBox>
                <LineChart
                  width={380}
                  height={300}
                  data={plasticData}
                  margin={{
                    top: 5,
                    right: 20,
                  }}
                >
                  <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                </LineChart>
              </S.ChartBox>
            </div>
            <div>
              <S.ChartInfo>
                <h3>차트 제목2</h3>
                <p>
                  차트 설명차트 설명차트 설명차트 설명차트 설명차트 설명차트 설명차트 설명차트
                  설명차트 설명차트 설명차트 설명차트 설명차트 설명차트 설명차트 설명차트 설명차트
                  설명차트 설명차트 설명차트 설명차트 설명차트 설명차트 설명차트 설명차트 설명
                </p>
              </S.ChartInfo>
              <S.ChartBox>
                <BarChart
                  width={380}
                  height={300}
                  data={plasticData}
                  margin={{
                    top: 5,
                    right: 20,
                  }}
                >
                  <Bar type="monotone" dataKey="pv" stroke="#8884d8" />
                  <Bar type="monotone" dataKey="uv" stroke="#82ca9d" />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Legend />
                </BarChart>
              </S.ChartBox>
            </div>
          </Slider>
        </S.SlickContainer>
      </S.MainContainer>
      <S.ScrollBox>
        <S.ScrollText>SCROLL</S.ScrollText>
        <S.ScrollIcon src="/images/main/down-arrow.png" alt="화살이미지" />
      </S.ScrollBox>
    </S.MainWrap02>
  );
}
