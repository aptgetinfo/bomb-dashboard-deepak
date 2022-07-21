import React, { useMemo, useCallback } from 'react';
import { Box, Typography } from '@material-ui/core';
import Card from '../Summary/Card';
import useBondStats from '../../../../hooks/useBondStats';
import { getDisplayBalance } from '../../../../utils/formatBalance';
import useTokenBalance from '../../../../hooks/useTokenBalance';
import useBombFinance from '../../../../hooks/useBombFinance';
import ExchangeCard from './ExchangeCard';
import useBondsPurchasable from '../../../../hooks/useBondsPurchasable';
import useCashPriceInLastTWAP from '../../../../hooks/useCashPriceInLastTWAP';
import { useTransactionAdder } from '../../../../state/transactions/hooks';
import { BOND_REDEEM_PRICE_BN } from '../../../../bomb-finance/constants';
import BBondImg from '../../../../assets/img/xbomb-512.png';

const Bonds = () => {
  const bombFinance = useBombFinance();
  const bondStat = useBondStats();
  const bondBalance = useTokenBalance(bombFinance?.BBOND);
  const bondsPurchasable = useBondsPurchasable();
  const cashPrice = useCashPriceInLastTWAP();
  const addTransaction = useTransactionAdder();
  const isBondPurchasable = useMemo(() => Number(bondStat?.tokenInFtm) < 1.01, [bondStat]);
  const isBondRedeemable = useMemo(() => cashPrice.gt(BOND_REDEEM_PRICE_BN), [cashPrice]);

  const handleBuyBonds = useCallback(
    async (amount) => {
      const tx = await bombFinance.buyBonds(amount);
      addTransaction(tx, {
        summary: `Buy ${Number(amount).toFixed(2)} BBOND with ${amount} BOMB`,
      });
    },
    [bombFinance, addTransaction],
  );

  const handleRedeemBonds = useCallback(
    async (amount) => {
      const tx = await bombFinance.redeemBonds(amount);
      addTransaction(tx, { summary: `Redeem ${amount} BBOND` });
    },
    [bombFinance, addTransaction],
  );

  return (
    <Box sx={{ marginTop: '25px' }}>
      <Card>
        <Box display={'flex'} justifyContent={'space-between'}>
          <div>
            <img alt="Bomb Bond" src={BBondImg} style={{ float: 'left' }} width="100rem" />
            <Typography align="left" variant="h3" style={{ color: '#fff' }}>
              Bonds
            </Typography>
            <p style={{ color: '#fff', fontSize: '1.2rem', marginTop: '0' }}>
              BBonds can be purchased only on contraction periods, when TWAP of BOMB is below 1.
            </p>
          </div>
        </Box>
        <Box display={'grid'} style={{ gridTemplateColumns: '1.5fr 1.5fr 2fr' }} color={'#fff'}>
          <div>
            <p>Current Price: (Bomb)^2</p>
            <p style={{ fontWeight: 'bolder', fontSize: '1.5rem', marginTop: '0' }}>
              BBond = {bondStat ? Number(bondStat?.tokenInFtm).toFixed(4) || '-' : '0'} BTCB
            </p>
          </div>
          <div>
            <p>Available to redeem:</p>
            <p style={{ fontWeight: 'bolder', fontSize: '1.5rem', marginTop: '0' }}>
              <img
                src={BBondImg}
                alt="metamask icon"
                width="35px"
                style={{ marginLeft: '10px', verticalAlign: 'middle' }}
              />
              {getDisplayBalance(bondBalance)}
            </p>
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <p style={{ marginTop: '0', marginBottom: '0.4rem' }}>Purchase BBond</p>
                <p style={{ marginTop: '0' }}>Bomb is over peg</p>
              </div>
              <div>
                <ExchangeCard
                  action="Purchase"
                  fromToken={bombFinance.BOMB}
                  fromTokenName="BOMB"
                  toToken={bombFinance.BBOND}
                  toTokenName="BBOND"
                  priceDesc={
                    !isBondPurchasable
                      ? 'BOMB is over peg'
                      : getDisplayBalance(bondsPurchasable, 18, 4) + ' BBOND available for purchase'
                  }
                  onExchange={handleBuyBonds}
                  disabled={!bondStat || isBondRedeemable}
                />
              </div>
            </div>
            <hr />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <p style={{ marginTop: '0' }}>Redeem BBond</p>
              </div>
              <div>
                <ExchangeCard
                  action="Redeem"
                  fromToken={bombFinance.BBOND}
                  fromTokenName="BBOND"
                  toToken={bombFinance.BOMB}
                  toTokenName="BOMB"
                  priceDesc={`${getDisplayBalance(bondBalance)} BBOND Available in wallet`}
                  onExchange={handleRedeemBonds}
                  disabled={!bondStat || bondBalance.eq(0) || !isBondRedeemable}
                  // disabledDescription={!isBondRedeemable ? `Enabled when 10,000 BOMB > ${BOND_REDEEM_PRICE}BTC` : null}
                />
              </div>
            </div>
          </div>
        </Box>
      </Card>
    </Box>
  );
};

export default Bonds;
