import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Box, Typography} from '@material-ui/core';
import Card from '../Summary/Card';
import { getDisplayBalance } from '../../../../utils/formatBalance';
import useStakedTokenPriceInDollars from '../../../../hooks/useStakedTokenPriceInDollars';
import useBombStats from '../../../../hooks/useBombStats';
import useBank from '../../../../hooks/useBank';
import useStatsForPool from '../../../../hooks/useStatsForPool';
import useEarnings from '../../../../hooks/useEarnings';
import useStakedBalance from '../../../../hooks/useStakedBalance';
import useHarvest from '../../../../hooks/useHarvest';
import useApprove from '../../../../hooks/useApprove';
import { ApprovalState } from '../../../../hooks/useApproveZapper';
import useModal from '../../../../hooks/useModal';
import IconButton from '../../../../components/IconButton';
import { AddIcon, RemoveIcon } from '../../../../components/icons';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import DepositModal from '../../../Bank/components/DepositModal';
import WithdrawModal from '../../../Bank/components/WithdrawModal';
import ZapModal from '../../../Bank/components/ZapModal';
import useTokenBalance from '../../../../hooks/useTokenBalance';
import useStake from '../../../../hooks/useStake';
import useWithdraw from '../../../../hooks/useWithdraw';
import useZap from '../../../../hooks/useZap';
import useRedeem from '../../../../hooks/useRedeem';
import BombDollarImg from '../../../../assets/img/bomb-bitcoin-LP.png';
import BombBnb from '../../../../assets/img/bomb-bnb-lp-512.png';
import BombImg from '../../../../assets/img/bomb32.png';
import BShare from '../../../../assets/img/bshare-200x200.png';
import ArrowUp from '../../../../assets/img/arrow-up-circle.png';
import ArrowDown from '../../../../assets/img/arrow-down-circle.png';
const BombFarms = () => {
  const bombStats = useBombStats();
  const bomb_btcb = 'BombBtcbLPBShareRewardPool';
  const bomb_btcb_bank = useBank(bomb_btcb);
  const bomb_btcb_tokenBalance = useTokenBalance(bomb_btcb_bank.depositToken);
  const { onStake: bomb_btcb_onStake } = useStake(bomb_btcb_bank);
  const { onWithdraw: bomb_btcb_onWithdraw } = useWithdraw(bomb_btcb_bank);
  const { onZap: bomb_btcb_onZap } = useZap(bomb_btcb_bank);
  const { onReward: bomb_btcb_claim_onReward } = useHarvest(bomb_btcb_bank);
  const [bomb_btcb_deposit_approveStatus, bomb_btcb_deposit_approve] = useApprove(
    bomb_btcb_bank.depositToken,
    bomb_btcb_bank.address,
  );
  const bomb_btcb_earnings = useEarnings(bomb_btcb_bank.contract, bomb_btcb_bank.earnTokenName, bomb_btcb_bank.poolId);
  const bomb_btcb_statsOnPool = useStatsForPool(bomb_btcb_bank);
  const bomb_btcb_stakedBalance = useStakedBalance(bomb_btcb_bank.contract, bomb_btcb_bank.poolId);
  const bomb_btcb_stakedTokenPriceInDollars = useStakedTokenPriceInDollars(
    bomb_btcb_bank.depositTokenName,
    bomb_btcb_bank.depositToken,
  );
  const { onRedeem: bomb_btcb_onRedeem } = useRedeem(bomb_btcb_bank);

  const bomb_btcb_earnedTokenPriceInDollars = useMemo(
    () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null),
    [bombStats],
  );

  const bomb_btcb_stakedEarnedTokenPriceInDollars = useMemo(
    () => (bomb_btcb_stakedTokenPriceInDollars ? bomb_btcb_stakedTokenPriceInDollars : null),
    [bomb_btcb_stakedTokenPriceInDollars],
  );

  const bomb_btcb_earnedInDollars = (
    Number(bomb_btcb_earnedTokenPriceInDollars) * Number(getDisplayBalance(bomb_btcb_earnings))
  ).toFixed(2);
  const bomb_btcb_stakedEarnedInDollars = (
    Number(bomb_btcb_stakedEarnedTokenPriceInDollars) *
    Number(getDisplayBalance(bomb_btcb_stakedBalance, bomb_btcb_bank.depositToken.decimal))
  ).toFixed(2);

  const [bomb_btcb_onPresentDeposit, bomb_btcb_onDismissDeposit] = useModal(
    <DepositModal
      max={bomb_btcb_tokenBalance}
      decimals={bomb_btcb_bank.depositToken.decimal}
      onConfirm={(amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        bomb_btcb_onStake(amount);
        bomb_btcb_onDismissDeposit();
      }}
      tokenName={bomb_btcb_bank.depositTokenName}
    />,
  );

  const [bomb_btcb_onPresentZap, bomb_btcb_onDissmissZap] = useModal(
    <ZapModal
      decimals={bomb_btcb_bank.depositToken.decimal}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        bomb_btcb_onZap(zappingToken, tokenName, amount);
        bomb_btcb_onDissmissZap();
      }}
      tokenName={bomb_btcb_bank.depositTokenName}
    />,
  );

  const [bomb_btcb_onPresentWithdraw, bomb_btcb_onDismissWithdraw] = useModal(
    <WithdrawModal
      max={bomb_btcb_stakedBalance}
      decimals={bomb_btcb_bank.depositToken.decimal}
      onConfirm={(amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        bomb_btcb_onWithdraw(amount);
        bomb_btcb_onDismissWithdraw();
      }}
      tokenName={bomb_btcb_bank.depositTokenName}
    />,
  );

  const bomb_bnb = 'BshareBnbLPBShareRewardPool';
  const bomb_bnb_bank = useBank(bomb_bnb);
  const bomb_bnb_tokenBalance = useTokenBalance(bomb_bnb_bank.depositToken);
  const { onStake: bomb_bnb_onStake } = useStake(bomb_bnb_bank);
  const { onWithdraw: bomb_bnb_onWithdraw } = useWithdraw(bomb_bnb_bank);
  const { onZap: bomb_bnb_onZap } = useZap(bomb_bnb_bank);
  const { onReward: bomb_bnb_claim_onReward } = useHarvest(bomb_bnb_bank);
  const [bomb_bnb_deposit_approveStatus, bomb_bnb_deposit_approve] = useApprove(
    bomb_bnb_bank.depositToken,
    bomb_bnb_bank.address,
  );
  const bomb_bnb_earnings = useEarnings(bomb_bnb_bank.contract, bomb_bnb_bank.earnTokenName, bomb_bnb_bank.poolId);
  const bomb_bnb_statsOnPool = useStatsForPool(bomb_bnb_bank);
  const bomb_bnb_stakedBalance = useStakedBalance(bomb_bnb_bank.contract, bomb_bnb_bank.poolId);
  const bomb_bnb_stakedTokenPriceInDollars = useStakedTokenPriceInDollars(
    bomb_bnb_bank.depositTokenName,
    bomb_bnb_bank.depositToken,
  );
  const { onRedeem: bomb_bnb_onRedeem } = useRedeem(bomb_bnb_bank);

  const bomb_bnb_earnedTokenPriceInDollars = useMemo(
    () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null),
    [bombStats],
  );

  const bomb_bnb_stakedEarnedTokenPriceInDollars = useMemo(
    () => (bomb_bnb_stakedTokenPriceInDollars ? bomb_bnb_stakedTokenPriceInDollars : null),
    [bomb_bnb_stakedTokenPriceInDollars],
  );

  const bomb_bnb_earnedInDollars = (
    Number(bomb_bnb_earnedTokenPriceInDollars) * Number(getDisplayBalance(bomb_btcb_earnings))
  ).toFixed(2);
  const bomb_bnb_stakedEarnedInDollars = (
    Number(bomb_bnb_stakedEarnedTokenPriceInDollars) *
    Number(getDisplayBalance(bomb_bnb_stakedBalance, bomb_bnb_bank.depositToken.decimal))
  ).toFixed(2);

  const [bomb_bnb_onPresentDeposit, bomb_bnb_onDismissDeposit] = useModal(
    <DepositModal
      max={bomb_bnb_tokenBalance}
      decimals={bomb_bnb_bank.depositToken.decimal}
      onConfirm={(amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        bomb_bnb_onStake(amount);
        bomb_bnb_onDismissDeposit();
      }}
      tokenName={bomb_bnb_bank.depositTokenName}
    />,
  );

  const [bomb_bnb_onPresentZap, bomb_bnb_onDissmissZap] = useModal(
    <ZapModal
      decimals={bomb_bnb_bank.depositToken.decimal}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        bomb_bnb_onZap(zappingToken, tokenName, amount);
        bomb_bnb_onDissmissZap();
      }}
      tokenName={bomb_bnb_bank.depositTokenName}
    />,
  );

  const [bomb_bnb_onPresentWithdraw, bomb_bnb_onDismissWithdraw] = useModal(
    <WithdrawModal
      max={bomb_bnb_stakedBalance}
      decimals={bomb_bnb_bank.depositToken.decimal}
      onConfirm={(amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        bomb_bnb_onWithdraw(amount);
        bomb_bnb_onDismissWithdraw();
      }}
      tokenName={bomb_bnb_bank.depositTokenName}
    />,
  );

  const claimAllHandler = () => {
    bomb_btcb_claim_onReward();
    bomb_bnb_claim_onReward();
  };

  return (
    <Box sx={{ marginTop: 25 }}>
      <Card>
        <Box display={'flex'} justifyContent={'space-between'}>
          <div>
            <Typography align="left" variant="h3" style={{ color: '#fff' }}>
              Bomb Farms
            </Typography>
            <p style={{ color: '#fff', fontSize: '1.2rem', marginTop: '0' }}>
              Stake your LP tokens in our farms to start earning $BSHARE
            </p>
          </div>
          <div style={{ padding: '1rem' }}>
            <btn
                    onClick={claimAllHandler}
                    disabled={bomb_btcb_earnings.eq(0) || bomb_bnb_earnings.eq(0)}
                    style={{
                      backgroundColor: 'transparent',
                      border: '1px solid white',
                      borderRadius: '20px',
                      padding: '5px',
                      borderColor: 'white',
                      color: 'white',
                      textAlign: 'center',
                      verticalAlign: 'middle',
                      textDecoration: 'none',
                      display: 'inline-block',
                      fontSize: '16px',
                      margin: '4px 5px',
                    }}
                    // className={bomb_btcb_earnings.eq(0) ? 'shinyButtonDisabled' : 'shinyButton'}
                  >
                    <span style={{ verticalAlign: 'middle', paddingBottom: '12px', paddingLeft: '10px' }}>
                      Claim All
                    </span>
                    <img src={BombImg} alt="Deposit" style={{ marginLeft: '5px', verticalAlign: 'bottom' }} width="30rem" />
                  </btn>
          </div>
        </Box>
        <Card>
          <Box style={{ color: '#fff', marginTop: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex' }}>
                <Typography color="textPrimary" align="left" variant="h5">
                  <img src={BombDollarImg} alt="metamask icon" width="30px" style={{ marginRight: '10px' }} />
                  BOMB-BTCB
                </Typography>
                <span
                  style={{
                    marginLeft: '10px',
                    fontSize: '15px',
                    backgroundColor: 'rgba(0, 232, 162, 0.5)',
                    padding: ' 5px',
                    borderRadius: '4px',
                    height: '20px',
                  }}
                >
                  Recommended
                </span>
              </div>
              <div>
                <Typography>TVL: ${bomb_btcb_statsOnPool?.TVL}</Typography>
              </div>
            </div>
            <hr />
            <div className="dashboard_bombfarm">
              <div>
                <p style={{ margin: '0' }}>Daily Returns</p>
                <p style={{ margin: '0', fontSize: '40px' }}>
                  {bomb_btcb_bank.closedForStaking ? '0.00' : bomb_btcb_statsOnPool?.dailyAPR}%
                </p>
              </div>
              <div>
                <p style={{ margin: '0' }}>Your Stake</p>
                <p style={{ margin: '0' }}>
                  <img
                    src={BombDollarImg}
                    alt="metamask icon"
                    width="30px"
                    style={{ marginRight: '4px', verticalAlign: 'middle' }}
                  />
                  {getDisplayBalance(bomb_btcb_stakedBalance, bomb_btcb_bank.depositToken.decimal)}
                </p>
                <p style={{ margin: '0' }}>≈ ${bomb_btcb_stakedEarnedInDollars}</p>
              </div>
              <div>
                <p style={{ margin: '0' }}>Earned</p>
                <p style={{ margin: '0' }}>
                  <img
                    src={BShare}
                    alt="metamask icon"
                    width="30px"
                    style={{ marginRight: '4px', verticalAlign: 'middle' }}
                  />
                  {getDisplayBalance(bomb_btcb_earnings)}
                </p>
                <p style={{ margin: '0' }}>≈ ${bomb_btcb_earnedInDollars}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'end' }}>
                <div >
                  {bomb_btcb_deposit_approveStatus !== ApprovalState.APPROVED ? (
                    <btn
                      disabled={
                        bomb_btcb_bank.closedForStaking ||
                        bomb_btcb_deposit_approveStatus === ApprovalState.PENDING ||
                        bomb_btcb_deposit_approveStatus === ApprovalState.UNKNOWN
                      }
                      onClick={bomb_btcb_deposit_approve}
                      // className={
                      //   bomb_btcb_bank.closedForStaking ||
                      //   bomb_btcb_deposit_approveStatus === ApprovalState.PENDING ||
                      //   bomb_btcb_deposit_approveStatus === ApprovalState.UNKNOWN
                      //     ? 'shinyButtonDisabled'
                      //     : 'shinyButton'
                      // }
                      style={{
                        backgroundColor: 'transparent',
                        border: '1px solid white',
                        borderRadius: '20px',
                        padding: '5px',
                        borderColor: 'white',
                        color: 'white',
                        textAlign: 'center',
                        verticalAlign: 'middle',
                        textDecoration: 'none',
                        display: 'inline-block',
                        fontSize: '16px',
                        margin: '4px 5px',
                      }}
                    >
                      <span style={{ verticalAlign: 'middle', paddingBottom: '12px', paddingLeft: '10px' }}>
                        Deposit
                      </span>
                      <img src={ArrowUp} alt="Deposit" style={{ marginLeft: '5px', verticalAlign: 'bottom' }} width="30rem" />
                    </btn>
                  ) : (
                    <>
                      <IconButton onClick={bomb_btcb_onPresentWithdraw}>
                        <RemoveIcon />
                      </IconButton>
                      <StyledActionSpacer />
                      <IconButton
                        disabled={
                          bomb_btcb_bank.closedForStaking ||
                          bomb_btcb_bank.depositTokenName === 'BOMB-BSHARE-LP' ||
                          bomb_btcb_bank.depositTokenName === 'BOMB' ||
                          bomb_btcb_bank.depositTokenName === 'BOMB-BTCB-LP' ||
                          bomb_btcb_bank.depositTokenName === '80BOMB-20BTCB-LP' ||
                          bomb_btcb_bank.depositTokenName === '80BSHARE-20WBNB-LP' ||
                          bomb_btcb_bank.depositTokenName === 'BUSM-BUSD-LP' ||
                          bomb_btcb_bank.depositTokenName === 'BBOND'
                        }
                        onClick={() => (bomb_btcb_bank.closedForStaking ? null : bomb_btcb_onPresentZap())}
                      >
                        <FlashOnIcon />
                      </IconButton>
                      <StyledActionSpacer />
                      <IconButton
                        disabled={bomb_btcb_bank.closedForStaking}
                        onClick={() => (bomb_btcb_bank.closedForStaking ? null : bomb_btcb_onPresentDeposit())}
                      >
                        <AddIcon />
                      </IconButton>
                    </>
                  )}
                </div>
                <div >
                  <btn
                    onClick={bomb_btcb_onRedeem}
                    style={{
                      backgroundColor: 'transparent',
                      border: '1px solid white',
                      borderRadius: '20px',
                      padding: '5px',
                      borderColor: 'white',
                      color: 'white',
                      textAlign: 'center',
                      verticalAlign: 'middle',
                      textDecoration: 'none',
                      display: 'inline-block',
                      fontSize: '16px',
                      margin: '4px 5px',
                    }}
                  >
                    <span style={{ verticalAlign: 'middle', paddingBottom: '12px', paddingLeft: '10px' }}>
                      Withdraw
                    </span>
                    <img src={ArrowDown} alt="Deposit" style={{ marginLeft: '5px', verticalAlign: 'bottom' }} width="30rem" />
                  </btn>
                </div>
                <div >
                  <btn
                    onClick={bomb_btcb_claim_onReward}
                    disabled={bomb_btcb_earnings.eq(0)}
                    style={{
                      backgroundColor: 'transparent',
                      border: '1px solid white',
                      borderRadius: '20px',
                      padding: '5px',
                      borderColor: 'white',
                      color: 'white',
                      textAlign: 'center',
                      verticalAlign: 'middle',
                      textDecoration: 'none',
                      display: 'inline-block',
                      fontSize: '16px',
                      margin: '4px 5px',
                    }}
                    // className={bomb_btcb_earnings.eq(0) ? 'shinyButtonDisabled' : 'shinyButton'}
                  >
                    <span style={{ verticalAlign: 'middle', paddingBottom: '12px', paddingLeft: '10px' }}>
                      Claim Rewards
                    </span>
                    <img src={BombImg} alt="Deposit" style={{ marginLeft: '5px', verticalAlign: 'bottom' }} width="30rem" />
                  </btn>
                </div>
              </div>
            </div>
          </Box>
        </Card>
        <hr />
        <Card>
          <Box style={{ color: '#fff', marginTop: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex' }}>
                <Typography color="textPrimary" align="left" variant="h5">
                  <img src={BombBnb} alt="metamask icon" width="30px" style={{ marginRight: '10px' }} />
                  BSHARE-BNB
                </Typography>
                <span
                  style={{
                    marginLeft: '10px',
                    fontSize: '15px',
                    backgroundColor: 'rgba(0, 232, 162, 0.5)',
                    padding: ' 5px',
                    borderRadius: '4px',
                    height: '20px',
                  }}
                >
                  Recommended
                </span>
              </div>
              <div>
                <Typography>TVL: ${bomb_bnb_statsOnPool?.TVL}</Typography>
              </div>
            </div>
            <hr />
            <div className="dashboard_bombfarm">
              <div>
                <p style={{ margin: '0' }}>Daily Returns</p>
                <p style={{ margin: '0', fontSize: '40px' }}>
                  {bomb_bnb_bank.closedForStaking ? '0.00' : bomb_bnb_statsOnPool?.dailyAPR}%
                </p>
              </div>
              <div>
                <p style={{ margin: '0' }}>Your Stake</p>
                <p style={{ margin: '0' }}>
                  <img
                    src={BombDollarImg}
                    alt="metamask icon"
                    width="30px"
                    style={{ marginRight: '4px', verticalAlign: 'middle' }}
                  />
                  {getDisplayBalance(bomb_bnb_stakedBalance, bomb_bnb_bank.depositToken.decimal)}
                </p>
                <p style={{ margin: '0' }}>≈ ${bomb_bnb_stakedEarnedInDollars}</p>
              </div>
              <div>
                <p style={{ margin: '0' }}>Earned</p>

                <p style={{ margin: '0' }}>
                  <img
                    src={BShare}
                    alt="metamask icon"
                    width="30px"
                    style={{ marginRight: '4px', verticalAlign: 'middle' }}
                  />
                  {getDisplayBalance(bomb_bnb_earnings)}
                </p>
                <p style={{ margin: '0' }}>≈ ${bomb_bnb_earnedInDollars}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'end' }}>
                <div >
                  {bomb_bnb_deposit_approveStatus !== ApprovalState.APPROVED ? (
                    <btn
                      disabled={
                        bomb_bnb_bank.closedForStaking ||
                        bomb_bnb_deposit_approveStatus === ApprovalState.PENDING ||
                        bomb_bnb_deposit_approveStatus === ApprovalState.UNKNOWN
                      }
                      onClick={bomb_bnb_deposit_approve}
                      style={{
                        backgroundColor: 'transparent',
                        border: '1px solid white',
                        borderRadius: '20px',
                        padding: '5px',
                        borderColor: 'white',
                        color: 'white',
                        textAlign: 'center',
                        verticalAlign: 'middle',
                        textDecoration: 'none',
                        display: 'inline-block',
                        fontSize: '16px',
                        margin: '4px 5px',
                      }}
                    >
                      <span style={{ verticalAlign: 'middle', paddingBottom: '12px', paddingLeft: '10px' }}>
                        Deposit
                      </span>
                      <img src={ArrowUp} alt="Deposit" style={{ marginLeft: '5px', verticalAlign: 'bottom' }} width="30rem" />
                    </btn>
                  ) : (
                    <>
                      <IconButton onClick={bomb_bnb_onPresentWithdraw}>
                        <RemoveIcon />
                      </IconButton>
                      <StyledActionSpacer />
                      <IconButton
                        disabled={
                          bomb_bnb_bank.closedForStaking ||
                          bomb_bnb_bank.depositTokenName === 'BOMB-BSHARE-LP' ||
                          bomb_bnb_bank.depositTokenName === 'BOMB' ||
                          bomb_bnb_bank.depositTokenName === 'BOMB-BTCB-LP' ||
                          bomb_bnb_bank.depositTokenName === '80BOMB-20BTCB-LP' ||
                          bomb_bnb_bank.depositTokenName === '80BSHARE-20WBNB-LP' ||
                          bomb_bnb_bank.depositTokenName === 'BUSM-BUSD-LP' ||
                          bomb_bnb_bank.depositTokenName === 'BBOND'
                        }
                        onClick={() => (bomb_bnb_bank.closedForStaking ? null : bomb_bnb_onPresentZap())}
                      >
                        <FlashOnIcon />
                      </IconButton>
                      <StyledActionSpacer />
                      <IconButton
                        disabled={bomb_bnb_bank.closedForStaking}
                        onClick={() => (bomb_bnb_bank.closedForStaking ? null : bomb_bnb_onPresentDeposit())}
                      >
                        <AddIcon />
                      </IconButton>
                    </>
                  )}
                </div>
                <div >
                  <btn
                    onClick={bomb_bnb_onRedeem}
                    style={{
                      backgroundColor: 'transparent',
                      border: '1px solid white',
                      borderRadius: '20px',
                      padding: '5px',
                      borderColor: 'white',
                      color: 'white',
                      textAlign: 'center',
                      verticalAlign: 'middle',
                      textDecoration: 'none',
                      display: 'inline-block',
                      fontSize: '16px',
                      margin: '4px 5px',
                    }}
                  >
                    <span style={{ verticalAlign: 'middle', paddingBottom: '12px', paddingLeft: '10px' }}>
                      Withdraw
                    </span>
                    <img src={ArrowDown}  alt="Deposit" style={{ marginLeft: '5px', verticalAlign: 'bottom' }} width="30rem" />
                  </btn>
                </div>
                <div >
                  <btn
                    onClick={bomb_bnb_claim_onReward}
                    disabled={bomb_bnb_earnings.eq(0)}
                    style={{
                      backgroundColor: 'transparent',
                      border: '1px solid white',
                      borderRadius: '20px',
                      padding: '5px',
                      borderColor: 'white',
                      color: 'white',
                      textAlign: 'center',
                      verticalAlign: 'middle',
                      textDecoration: 'none',
                      display: 'inline-block',
                      fontSize: '16px',
                      margin: '4px 5px',
                    }}
                    // className={bomb_btcb_earnings.eq(0) ? 'shinyButtonDisabled' : 'shinyButton'}
                  >
                    <span style={{ verticalAlign: 'middle', paddingBottom: '12px', paddingLeft: '10px' }}>
                      Claim Rewards
                    </span>
                    <img src={BombImg} alt="Deposit" style={{ marginLeft: '5px', verticalAlign: 'bottom' }} width="30rem" />
                  </btn>
                </div>
              </div>
            </div>
          </Box>
        </Card>
      </Card>
    </Box>
  );
};

const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`;

export default BombFarms;
