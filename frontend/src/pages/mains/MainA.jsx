import React from 'react';
import * as S from './main.styles';

export default function MainA() {
  return (
    <S.MainWrap01>
      <S.MainContainer>
        <S.MainContent01>
          <S.MentBox>
            <S.MentText>
              사
              <S.PositionBox>
                랑<S.PositionImg01 src="/images/main/main_sub03.png" alt="지구 이미지" />
              </S.PositionBox>
              <S.PositionBox>
                해<S.PositionImg02 src="/images/main/main_sub02.png" alt="새싹 이미지" />
              </S.PositionBox>
              <br />
              지구야
            </S.MentText>
            <img src="/images/main/main_sub01.png" alt="" />
          </S.MentBox>
        </S.MainContent01>
        <S.MainContent02>
          <S.SubText01>SAVE THE EARTH</S.SubText01>
          <S.SubText02>
            지구는 우리의 부주의와 무관심으로 인해 파괴되고 있습니다. <br />
            환경 보호를 위해 분리수거 등의 노력을 기울이며, 아름다운 지구를 만들어 보면 어떨까요?
          </S.SubText02>
        </S.MainContent02>
      </S.MainContainer>
      <S.ScrollBox>
        <S.ScrollText>SCROLL</S.ScrollText>
        <S.ScrollIcon src="/images/main/down-arrow.png" alt="화살이미지" />
      </S.ScrollBox>
    </S.MainWrap01>
  );
}
