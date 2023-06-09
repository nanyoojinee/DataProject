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

export default function MainA() {
  const [plasticData, setPlasticData] = useState([]);
  const [wasteData, setWasteData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const plasticResult = await Api.get('/plasticData');
      const parsedPlasticData = JSON.parse(plasticResult.data.data);
      const recentPlasticData = parsedPlasticData.slice(-10);

      setPlasticData(recentPlasticData);

      const wasteResult = await Api.get('/wasteData');
      const parsedWasteData = JSON.parse(wasteResult.data.data);

      const transformedWasteData = Object.keys(parsedWasteData).map(year => ({
        Year: year,
        '재활용 가능자원 분리배출': parsedWasteData[year]['재활용 가능자원 분리배출'],
        '종량제방식 등 혼합배출': parsedWasteData[year]['종량제방식 등 혼합배출'],
      }));

      setWasteData(transformedWasteData);
    };
    fetchData();
  }, []);

  console.log(plasticData);
  console.log(wasteData);

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
                <h3>플라스틱 생산량</h3>
                <p>최근 10년간의 플라스틱 생산량 추이입니다.</p>
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
                  <Bar dataKey="전 세계 플라스틱 생산량(백만 톤)" fill="#FFD700" />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="Year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                </BarChart>
              </S.ChartBox>
            </div>
            <div>
              <S.ChartInfo>
                <h3>웨스트 데이터</h3>
                <p>
                  웨스트 데이터의 설명입니다. 웨스트 데이터에 대한 설명을 작성하세요.
                </p>
              </S.ChartInfo>
              <S.ChartBox>
                <LineChart
                  width={380}
                  height={300}
                  data={wasteData}
                  margin={{
                    top: 5,
                    right: 20,
                  }}
                >
                  <Line type="monotone" dataKey="재활용 가능자원 분리배출" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="종량제방식 등 혼합배출" stroke="#82ca9d" />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="Year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                </LineChart>
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
