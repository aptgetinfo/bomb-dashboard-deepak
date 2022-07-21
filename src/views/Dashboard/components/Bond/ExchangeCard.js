import React from 'react';
import useBombFinance from '../../../../hooks/useBombFinance';
import useModal from '../../../../hooks/useModal';
import ExchangeModal from './ExchangeModal';
import useTokenBalance from '../../../../hooks/useTokenBalance';
import useApprove, { ApprovalState } from '../../../../hooks/useApprove';
import useCatchError from '../../../../hooks/useCatchError';
import { useWallet } from 'use-wallet';
import UnlockWallet from '../../../../components/UnlockWallet';
import ArrowDown from '../../../../assets/img/arrow-down-circle.png';
import Cart from '../../../../assets/img/shopping-cart.png'

const ExchangeCard = ({
  action,
  fromToken,
  fromTokenName,
  toToken,
  toTokenName,
  priceDesc,
  onExchange,
  disabled = false,
  disabledDescription,
}) => {
  const catchError = useCatchError();
  const {
    contracts: { Treasury },
  } = useBombFinance();
  const [approveStatus, approve] = useApprove(fromToken, Treasury.address);

  const { account } = useWallet();
  const balance = useTokenBalance(fromToken);
  const [onPresent, onDismiss] = useModal(
    <ExchangeModal
      title={action}
      description={priceDesc}
      max={balance}
      onConfirm={(value) => {
        onExchange(value);
        onDismiss();
      }}
      action={action}
      tokenName={fromTokenName}
    />,
  );
  return (
    <>
      {!!account ? (
        <>
          {approveStatus !== ApprovalState.APPROVED && !disabled ? (
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
              disabled={approveStatus === ApprovalState.PENDING || approveStatus === ApprovalState.UNKNOWN}
              onClick={() => catchError(approve(), `Unable to approve ${fromTokenName}`)}
            >
              <span
                style={{ verticalAlign: 'middle', paddingBottom: '12px', paddingLeft: '10px' }}
              >Purchase</span>
              <img src={Cart} alt="Purchase" style={{ marginLeft: '10px', verticalAlign: 'bottom' }} width="30rem" />
            </btn>
          ) : (
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
              onClick={onPresent}
              disabled={disabled}
            >
              <span style={{ verticalAlign: 'middle', paddingBottom: '12px', paddingLeft: '10px' }}>
                Reedem
              </span>
              <img src={ArrowDown} alt="Reedem" style={{ marginLeft: '10px', verticalAlign: 'bottom' }} width="30rem" />
            </btn>
          )}
        </>
      ) : (
        <UnlockWallet />
      )}
    </>
  );
};

export default ExchangeCard;
