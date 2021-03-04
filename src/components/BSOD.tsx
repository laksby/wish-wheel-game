import React, { FC } from 'react';
import styled from 'styled-components';
import bsodImage from '../images/BSOD.svg';
import likeImage from '../images/like.svg';

export const BSOD: FC = () => {
  return (
    <Container>
      <SkullImage src={bsodImage} alt="" aria-hidden />
      <h1>
        На этом ПК возникла проблема и поэтому срочно необходимо выпить!
        <br />
        <br />
        Мы лишь хотим продолжить праздник в нормально ритме и собираемся дальше Вас удивлять и Вами
        восхищаться наши дорогие дамы!
        <br />
        <br />
        <HeartImage src={likeImage} alt="" aria-hidden />
        <HeartImage src={likeImage} alt="" aria-hidden />
        <HeartImage src={likeImage} alt="" aria-hidden />
        <HeartImage src={likeImage} alt="" aria-hidden />
        <HeartImage src={likeImage} alt="" aria-hidden />
      </h1>
    </Container>
  );
};

const Container = styled.div`
  background-color: #0098fb;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10vh;
  box-sizing: border-box;
  justify-content: space-between;

  h1 {
    color: #ffffff;
    font-family: sans-serif;
    font-weight: 400;
    font-size: 5vh;
  }
`;

const SkullImage = styled.img`
  width: 40vh;
`;

const HeartImage = styled.img`
  width: 6vh;
  margin-right: 1vh;
`;
