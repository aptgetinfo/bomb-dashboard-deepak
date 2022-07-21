import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Grid, Box, Typography, IconButton } from '@material-ui/core';
import Card from '../Summary/Card';
import { getDisplayBalance } from '../../../../utils/formatBalance';
import useBombFinance from '../../../../hooks/useBombFinance';
import useBombStats from '../../../../hooks/useBombStats';
import useTotalStakedOnBoardroom from '../../../../hooks/useTotalStakedOnBoardroom';
import useEarningsOnBoardroom from '../../../../hooks/useEarningsOnBoardroom';
import useStakedBalanceOnBoardroom from '../../../../hooks/useStakedBalanceOnBoardroom';
import useTotalValueLocked from '../../../../hooks/useTotalValueLocked';
import useStakedTokenPriceInDollars from '../../../../hooks/useStakedTokenPriceInDollars';
import UnlockWallet from '../../../../components/UnlockWallet';
import useWallet from 'use-wallet';
import useWithdrawCheck from '../../../../hooks/boardroom/useWithdrawCheck';
import useClaimRewardCheck from '../../../../hooks/boardroom/useClaimRewardCheck';
import useRedeemOnBoardroom from '../../../../hooks/useRedeemOnBoardroom';
import useHarvestFromBoardroom from '../../../../hooks/useHarvestFromBoardroom';
import { AddIcon, RemoveIcon } from '../../../../components/icons';
import useApprove, { ApprovalState } from '../../../../hooks/useApprove';
import DepositModal from '../../../Boardroom/components/DepositModal';
import WithdrawModal from '../../../Boardroom/components/WithdrawModal';
import useModal from '../../../../hooks/useModal';
import useTokenBalance from '../../../../hooks/useTokenBalance';
import useStakeToBoardroom from '../../../../hooks/useStakeToBoardroom';
import useWithdrawFromBoardroom from '../../../../hooks/useWithdrawFromBoardroom';
import Discord from '../../../../assets/img/dis.png';
import Document from '../../../../assets/img/doc.png';
import BShare from '../../../../assets/img/bshare-200x200.png';
import BombImg from '../../../../assets/img/bomb32.png';
import ArrowUp from '../../../../assets/img/arrow-up-circle.png';
import ArrowDown from '../../../../assets/img/arrow-down-circle.png';
const BoardRoom = () => {
  const { account } = useWallet();
  const bombFinance = useBombFinance();
  const bombStats = useBombStats();
  const totalStaked = useTotalStakedOnBoardroom();
  const earnings = useEarningsOnBoardroom();
  const stakedBalance = useStakedBalanceOnBoardroom();
  const TVL = useTotalValueLocked();
  const canWithdraw = useWithdrawCheck();
  const canClaimReward = useClaimRewardCheck();
  const { onRedeem } = useRedeemOnBoardroom();
  const { onReward } = useHarvestFromBoardroom();
  const [approveStatus, approve] = useApprove(bombFinance.BSHARE, bombFinance.contracts.Boardroom.address);
  const tokenBalance = useTokenBalance(bombFinance.BSHARE);

  const { onStake } = useStakeToBoardroom();
  const { onWithdraw } = useWithdrawFromBoardroom();
  const canWithdrawFromBoardroom = useWithdrawCheck();

  const tokenPriceInDollars = useMemo(
    () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null),
    [bombStats],
  );
  const earnedInDollars = (Number(tokenPriceInDollars) * Number(getDisplayBalance(earnings))).toFixed(2);

  const stakedTokenPriceInDollars = useStakedTokenPriceInDollars('BSHARE', bombFinance.BSHARE);
  const tokenPriceInDollarsStaked = useMemo(
    () =>
      stakedTokenPriceInDollars
        ? (Number(stakedTokenPriceInDollars) * Number(getDisplayBalance(stakedBalance))).toFixed(2).toString()
        : null,
    [stakedTokenPriceInDollars, stakedBalance],
  );

  const [onPresentDeposit, onDismissDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      onConfirm={(value) => {
        onStake(value);
        onDismissDeposit();
      }}
      tokenName={'BShare'}
    />,
  );
  const [onPresentWithdraw, onDismissWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      onConfirm={(value) => {
        onWithdraw(value);
        onDismissWithdraw();
      }}
      tokenName={'BShare'}
    />,
  );

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <div>
            <p style={{ textAlign: 'right' }}>
              <a
                href="https://bombbshare.medium.com/the-bomb-cycle-how-to-print-forever-e89dc82c12e5"
                target={'_blank'}
                rel="noopener noreferrer"
                style={{ color: '#9EE6FF' }}
              >
                {'Read Investment Strategy >'}
              </a>
            </p>
          </div>
          <div style={{ background: 'rgba(0, 173, 232, 0.5)', padding: '10px', margin: '1rem 0' }}>
            <p style={{ textAlign: 'center', margin: '0px', color: '#fff', fontWeight: 'bolder' }}>Invest Now</p>
          </div>
          <div style={{ margin: '1rem 0', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ background: 'grey', padding: '0.4rem', width: '45%', textAlign: 'center' }}>
              <img
                alt="Deposit"
                style={{
                  verticalAlign: 'middle',
                  marginRight: '10px',
                  height: '30px',
                  width: '30px',
                  lineHeight: '60px',
                  borderRadius: '30px',
                  backgroundColor: 'white',
                  color: 'white',
                  textAlign: 'center',
                }}
                src={Discord}
              />
              Chat on Discord
            </div>
            <div style={{ background: 'grey', padding: '0.4rem', width: '45%', textAlign: 'center' }}>
              <img
                alt="Deposit"
                style={{
                  verticalAlign: 'middle',
                  marginRight: '10px',
                  height: '30px',
                  width: '30px',
                  lineHeight: '60px',
                  borderRadius: '30px',
                  backgroundColor: 'white',
                  color: 'white',
                  padding: '2px',
                  textAlign: 'center',
                }}
                src={Document}
              />
              Read Docs
            </div>
          </div>
          <Card>
            <div style={{ color: '#fff', display: 'flex' }}>
              <div style={{ width: '100%' }}>
                <img src={BShare} alt="Deposit" style={{ float: 'left' }} width="100rem" />
                <div>
                  <div style={{ marginTop: '20px', display: 'flex' }}>
                    <Typography color="textPrimary" align="left" variant="h5">
                      Boardroom
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
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <p style={{ margin: '0', marginRight: '1rem' }}>Stake BSHARE and earn BOMB every epoch</p>
                    </div>
                    <div>
                      <p style={{ margin: '0', marginRight: '1rem' }}>TVL: ${Math.ceil(Number(TVL))}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div style={{ display: 'flex', justifyContent: 'end', color: '#fff' }}>
              <p>
                Total Staked:
                <img src={BShare} alt="metamask icon" width="25px" style={{ verticalAlign: 'bottom' }} />
                {getDisplayBalance(totalStaked)}
              </p>
            </div>
            <div className="dashboard_boardroom" style={{ marginTop: '1rem', color: '#fff' }}>
              <div style={{ float: 'left',display:'flex',width: '130%'}}>
              <div style={{ margin: '0 1rem', padding: '0.5rem', textAlign: 'left' }}>
                <p style={{ margin: '0' }}>Daily Returns :</p>
                <p style={{ margin: '0', fontSize: '40px' }}>2%</p>
              </div>
              <div style={{ margin: '0 1rem', padding: '0.5rem', textAlign: 'left' }}>
                <p style={{ margin: '0' }}>Your Stake</p>
                <p style={{ margin: '0' }}>
                  <img
                    src={BShare}
                    alt="metamask icon"
                    width="30px"
                    style={{ marginRight: '4px', verticalAlign: 'middle' }}
                  />
                  {getDisplayBalance(stakedBalance)}
                </p>
                <p style={{ margin: '0' }}>≈ ${tokenPriceInDollarsStaked}</p>
              </div>
              <div style={{ margin: '0 1rem', padding: '0.5rem', textAlign: 'left' }}>
                <p style={{ margin: '0', marginLeft: '5px' }}>Earned</p>
                <p style={{ margin: '0' }}>
                  <img
                    src={BombImg}
                    alt="metamask icon"
                    width="30px"
                    style={{ marginRight: '4px', verticalAlign: 'middle' }}
                  />
                  {getDisplayBalance(earnings)}
                </p>
                <p style={{ margin: '0' }}>≈ ${earnedInDollars}</p>
              </div>
              </div>
              {!!account ? (
                <div style={{ margin: '0 1rem', padding: '0.5rem', textAlign: 'center',float: 'right',marginLeft: '6rem' }}>
                  <div style={{ display: 'flex', width: '140%' }}>
                    <div style={{ margin: '0 5px' }}>
                      {approveStatus !== ApprovalState.APPROVED ? (
                        <btn
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
                            margin: '4px 2px',
                          }}
                          disabled={approveStatus !== ApprovalState.NOT_APPROVED}
                          // className={approveStatus === ApprovalState.NOT_APPROVED ? 'shinyButton' : 'shinyButtonDisabled'}
                          onClick={approve}
                        >
                          <span style={{ verticalAlign: 'middle', paddingBottom: '12px', paddingLeft: '10px' }}>
                            Deposit
                          </span>
                          <img
                            src={ArrowUp}
                            alt="Deposit"
                            style={{ marginLeft: '10px', verticalAlign: 'bottom' }}
                            width="30rem"
                          />
                        </btn>
                      ) : (
                        <>
                          <IconButton disabled={!canWithdrawFromBoardroom} onClick={onPresentWithdraw}>
                            <RemoveIcon color={!canWithdrawFromBoardroom ? '' : 'yellow'} />
                          </IconButton>
                          <StyledActionSpacer />
                          <IconButton onClick={onPresentDeposit}>
                            <AddIcon color={!canWithdrawFromBoardroom ? '' : 'yellow'} />
                          </IconButton>
                        </>
                      )}
                    </div>
                    <div style={{ margin: '0 1rem' }}>
                      <btn
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
                          margin: '4px 2px',
                        }}
                        disabled={stakedBalance.eq(0) || (!canWithdraw && !canClaimReward)}
                        onClick={onRedeem}
                        // className={
                        //   stakedBalance.eq(0) || (!canWithdraw && !canClaimReward)
                        //     ? 'shinyButtonDisabledSecondary'
                        //     : 'shinyButtonSecondary'
                        // }
                      >
                        <span style={{ verticalAlign: 'middle', paddingBottom: '12px', paddingLeft: '10px' }}>
                          Withdraw
                        </span>
                        <img
                          src={ArrowDown}
                          alt="Deposit"
                          style={{ marginLeft: '10px', verticalAlign: 'bottom' }}
                          width="30rem"
                        />
                      </btn>
                    </div>
                  </div>
                  <div style={{ margin: '0 1rem' }}>
                    {/* <Button
                    onClick={onReward}
                    className={earnings.eq(0) || !canClaimReward ? 'shinyButtonDisabled' : 'shinyButton'}
                    disabled={earnings.eq(0) || !canClaimReward}
                  >
                    Claim Reward
                  </Button> */}
                    <btn
                      onClick={onReward}
                      disabled={earnings.eq(0) || !canClaimReward}
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
                      <img
                        src={BombImg}
                        alt="Deposit"
                        style={{ marginLeft: '5px', verticalAlign: 'bottom' }}
                        width="30rem"
                      />
                    </btn>
                  </div>
                </div>
              ) : (
                <UnlockWallet />
              )}
            </div>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <div
            style={{
              minHeight: '430px',
              border: '1px solid #728CDF',
              background: 'rgba(35, 40, 75, 0.75)',
              backdropFilter: 'blur(10px)',
              borderRadius: '10px',
              padding: '15px',
              marginTop: '3rem',
            }}
          >
            <Typography color="textPrimary" align="left" variant="h6">
              Latest News
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`;

export default BoardRoom;
