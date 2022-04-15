import React from 'react';
import { ColorPicker, useColor } from 'react-color-palette';
import 'react-color-palette/lib/css/styles.css';
import { useModal } from 'react-hooks-use-modal';
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';
import { IconButton } from 'components/common/IconButton';
import { colors } from 'utils/theme';
import { Button } from 'components/common/Button';
import { TextField } from 'components/common/TextField';
import { useState } from 'react';
import { stringNotEmpty } from 'utils/hooks/useValidation';
import { createTag } from 'utils/apis/tag';
import { TagCreateRequest } from 'types/tag';

interface Props {
  onCompleteCreate: () => void;
}

export const CreateTagFloatingActionButton: React.VFC<Props> = ({
  onCompleteCreate,
}) => {
  const [Modal, open, close] = useModal('root', {
    preventScroll: true,
    closeOnOverlayClick: false,
  });
  const [color, setColor] = useColor('hex', colors.primary[500]);

  const [titleValue, setTitleValue] = useState<string>('');

  const resetStates = () => {
    setTitleValue('');
  };

  const onSubmit = async () => {
    close();
    const payload: TagCreateRequest = {
      title: titleValue,
      color: color.hex,
    };
    await createTag(payload);

    // モーダル内の値をリセットする
    resetStates();
    onCompleteCreate();
  };

  return (
    <>
      <FloatingActionContaner>
        <IconButton bgColor={colors.primary[500]} onClick={open}>
          <FaPlus />
        </IconButton>
      </FloatingActionContaner>

      <Modal>
        <ModalContainer>
          <ModalTitle>新しいタグ</ModalTitle>
          <Label>タイトル</Label>
          <StyledTextField
            value={titleValue}
            placeholder="タスク"
            onChange={setTitleValue}
            rules={[stringNotEmpty()]}
          />
          <Label>カラー</Label>
          <PaletteContainer>
            <ColorPicker
              width={456}
              height={228}
              color={color}
              onChange={setColor}
              hideHSV
              dark
            />
          </PaletteContainer>
          <Label>プレビュー</Label>
          {titleValue.length !== 0 ? (
            <Preview $bgColor={color.hex}>{titleValue}</Preview>
          ) : (
            <Label style={{ fontWeight: 'normal' }}>
              タイトルを入力してください
            </Label>
          )}

          <ActionSectionContainer>
            <Button color={colors.error[500]} onClick={close}>
              キャンセル
            </Button>
            <Button
              type="submit"
              onClick={onSubmit}
              disabled={titleValue.length === 0}
            >
              作成
            </Button>
          </ActionSectionContainer>
        </ModalContainer>
      </Modal>
    </>
  );
};

const FloatingActionContaner = styled.div`
  position: fixed;
  bottom: 3rem;
  right: 4rem;
`;

const ModalContainer = styled.div`
  width: 35rem;
  background-color: #fff;
  border-radius: 1rem;

  padding: 1.5rem;
`;

const ModalTitle = styled.h1`
  margin-bottom: 1rem;
  color: ${(p) => p.theme.colors.text.base};
  font-size: 1.5rem;
  font-weight: bold;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.25rem;

  color: ${(p) => p.theme.colors.text.base};
  font-size: 0.75rem;
  font-weight: bold;
`;

const StyledTextField = styled(TextField)`
  margin-bottom: 1rem;
`;

const PaletteContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const Preview = styled.div<{ $bgColor: string }>`
  display: inline-block;
  background-color: ${(p) => p.$bgColor};
  border-radius: 0.75rem;

  padding: 0.25rem 1rem;
  color: #fff;
  font-size: 0.75rem;
  font-weight: bold;
`;

const ActionSectionContainer = styled.div`
  display: flex;
  justify-content: end;

  > :not(:first-child) {
    margin-left: 1rem;
  }
`;
