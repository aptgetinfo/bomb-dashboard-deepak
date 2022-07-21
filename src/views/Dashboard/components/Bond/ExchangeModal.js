import React, { useCallback, useMemo, useState } from 'react';
import Button from '../../../../components/Button';
import Modal from '../../../../components/Modal';
import ModalActions from '../../../../components/ModalActions';
import ModalTitle from '../../../../components/ModalTitle';
import TokenInput from '../../../../components/TokenInput';
import { getFullDisplayBalance } from '../../../../utils/formatBalance';
import Label from '../../../../components/Label';

const ExchangeModal = ({ max, title, description, onConfirm, onDismiss, action, tokenName }) => {
  const [val, setVal] = useState('');
  const fullBalance = useMemo(() => getFullDisplayBalance(max), [max]);

  const handleChange = useCallback((e) => setVal(e.currentTarget.value), [setVal]);

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance);
  }, [fullBalance, setVal]);

  return (
    <Modal>
      <ModalTitle text={title} />
      <TokenInput
        value={val}
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        max={fullBalance}
        symbol={tokenName}
      />
      <Label text={description} />
      <ModalActions>
        <Button text="Cancel" onClick={onDismiss} />
        <Button text={action} onClick={() => onConfirm(val)} />
      </ModalActions>
    </Modal>
  );
};

export default ExchangeModal;
