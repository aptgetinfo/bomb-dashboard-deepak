import { Typography } from '@material-ui/core';
import React, { useMemo } from 'react';
import moment from 'moment';
import useCurrentEpoch from '../../../../hooks/useCurrentEpoch';
import useTreasuryAllocationTimes from '../../../../hooks/useTreasuryAllocationTimes';
import Card from './Card';
import ProgressCountdown from '../../../Boardroom/components/ProgressCountdown';
import useTotalValueLocked from '../../../../hooks/useTotalValueLocked';
import useCashPriceInEstimatedTWAP from '../../../../hooks/useCashPriceInEstimatedTWAP';
import { roundAndFormatNumber } from '../../../../0x';
import useBombStats from '../../../../hooks/useBombStats';
import useBondStats from '../../../../hooks/useBondStats';
import usebShareStats from '../../../../hooks/usebShareStats';
import MetamaskFox from '../../../../assets/img/metamask-fox.svg';
import BombImg from '../../../../assets/img/bomb32.png';
import BShareImg from '../../../../assets/img/bomb32.png';
import BBondImg from '../../../../assets/img/xbomb-32.png';

const Summary = () => {
  const currentEpoch = useCurrentEpoch();
  const TVL = useTotalValueLocked();
  const { to } = useTreasuryAllocationTimes();
  const cashStat = useCashPriceInEstimatedTWAP();
  const currentTwap = useMemo(() => (cashStat ? Number(cashStat.priceInDollars).toFixed(4) : null), [cashStat]);
  let previousTwap = currentTwap;
  const bombStats = useBombStats();
  const bombCirculatingSupply = useMemo(() => (bombStats ? String(bombStats.circulatingSupply) : null), [bombStats]);
  const bombTotalSupply = useMemo(() => (bombStats ? String(bombStats.totalSupply) : null), [bombStats]);
  const bombPriceInDollars = useMemo(
    () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null),
    [bombStats],
  );
  const bombPriceInBNB = useMemo(() => (bombStats ? Number(bombStats.tokenInFtm).toFixed(4) : null), [bombStats]);
  const bShareStats = usebShareStats();
  const bShareCirculatingSupply = useMemo(
    () => (bShareStats ? String(bShareStats.circulatingSupply) : null),
    [bShareStats],
  );
  const bShareTotalSupply = useMemo(() => (bShareStats ? String(bShareStats.totalSupply) : null), [bShareStats]);
  const bSharePriceInDollars = useMemo(
    () => (bShareStats ? Number(bShareStats.priceInDollars).toFixed(2) : null),
    [bShareStats],
  );
  const bSharePriceInBNB = useMemo(
    () => (bShareStats ? Number(bShareStats.tokenInFtm).toFixed(4) : null),
    [bShareStats],
  );
  const tBondStats = useBondStats();
  const tBondCirculatingSupply = useMemo(
    () => (tBondStats ? String(tBondStats.circulatingSupply) : null),
    [tBondStats],
  );
  const tBondTotalSupply = useMemo(() => (tBondStats ? String(tBondStats.totalSupply) : null), [tBondStats]);
  const tBondPriceInDollars = useMemo(
    () => (tBondStats ? Number(tBondStats.priceInDollars).toFixed(2) : null),
    [tBondStats],
  );
  const tBondPriceInBNB = useMemo(() => (tBondStats ? Number(tBondStats.tokenInFtm).toFixed(4) : null), [tBondStats]);

  return (
    <Card>
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>BOMB Finance Summary</h2>
      <div
        style={{ display: 'flex', alignItems: 'center'}}
      >
        <div className="summary_table">
          <table style={{ width: '100%', textAlign: 'center' }}>
            <tbody>
              <tr>
                <th></th>
                <th>Current Supply</th>
                <th>Total Supply</th>
                <th>Price</th>
                <th></th>
              </tr>
              <tr>
                <td>
                  <p>
                    <img src={BombImg} alt="metamask icon" />
                    $BOMB
                  </p>
                </td>
                <td>{roundAndFormatNumber(Number(bombCirculatingSupply), 2)}</td>
                <td>{roundAndFormatNumber(Number(bombTotalSupply), 2)}</td>
                <td>
                  ${bombPriceInDollars ? roundAndFormatNumber(Number(bombPriceInDollars), 2) : '-.--'}
                  <br />
                  {bombPriceInBNB ? roundAndFormatNumber(Number(bombPriceInBNB), 2) : '-.----'} BTCB
                </td>
                <td>
                  <img src={MetamaskFox} alt="metamask icon" />
                </td>
              </tr>
              <tr>
                <td>
                  <p>
                    <img src={BShareImg} alt="metamask icon" />
                    $BSHARE
                  </p>
                </td>
                <td>{roundAndFormatNumber(Number(bShareCirculatingSupply), 2)}</td>
                <td>{roundAndFormatNumber(Number(bShareTotalSupply), 2)}</td>
                <td>
                  ${bSharePriceInDollars ? bSharePriceInDollars : '-.--'}
                  <br />
                  {bSharePriceInBNB ? roundAndFormatNumber(Number(bSharePriceInBNB), 2) : '-.----'} BNB
                </td>
                <td>
                  <img src={MetamaskFox} alt="metamask icon" />
                </td>
              </tr>
              <tr>
                <td>
                  <p>
                    <img src={BBondImg} alt="metamask icon" />
                    $BBOND
                  </p>
                </td>
                <td>{roundAndFormatNumber(Number(tBondCirculatingSupply), 2)}</td>
                <td>{roundAndFormatNumber(Number(tBondTotalSupply), 2)}</td>
                <td>
                  ${tBondPriceInDollars ? tBondPriceInDollars : '-.--'}
                  <br />
                  {tBondPriceInBNB ? roundAndFormatNumber(Number(tBondPriceInBNB), 2) : '-.----'} BTCB
                </td>
                <td>
                  <img src={MetamaskFox} alt="metamask icon" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ color: 'white' }}>
          <Typography align="center" color="textPrimary" variant="h5">
            Current Epoch
          </Typography>
          <Typography align="center" color="textPrimary" variant="h6">
            {Number(currentEpoch)}
          </Typography>
          <hr />
          <Typography align="center" color="textPrimary" variant="h5">
            <ProgressCountdown base={moment().toDate()} hideBar={true} deadline={to} description="Next Epoch" />
          </Typography>
          <Typography align="center" color="textPrimary" variant="h6">
            Next Epoch in
          </Typography>
          <hr />
          <div style={{ textAlign: 'center' }}>
            <p>
              Live TWAP <span style={{ color: 'greenyellow' }}>{currentTwap}</span>
            </p>
            <p>
              TVL <span style={{ color: 'greenyellow' }}>${Math.ceil(Number(TVL))}</span>
            </p>
            <p>
              Last Epoch TWAP <span style={{ color: 'greenyellow' }}>{previousTwap}</span>
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Summary;
