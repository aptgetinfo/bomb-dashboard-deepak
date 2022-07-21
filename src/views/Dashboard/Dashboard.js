import React from 'react';
import Page from '../../components/Page';
import { createGlobalStyle } from 'styled-components';
import { Helmet } from 'react-helmet';
import { Container, Typography } from '@material-ui/core';
import './Dashboard.css';
import BackGround from '../../assets/img/background.png';
import Summary from './components/Summary/Summary';
import BoardRoom from './components/Boardroom/Boardroom';
import BombFarm from './components/BombFarm/BombFarm';
import Bond from './components/Bond/Bond';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${BackGround}) repeat;
    background-size: cover;
  }
`;
const TITLE = 'bomb.money | Dashboard';

const Dashboard = () => {
  return (
    <Page>
      <BackgroundImage />
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <Container maxWidth="lg">
        <Typography color="textPrimary" align="center" variant="h3" gutterBottom>
          Dashboard
        </Typography>
        <Summary />
        <BoardRoom />
        <BombFarm />
        <Bond />
      </Container>
    </Page>
  );
};

export default Dashboard;
