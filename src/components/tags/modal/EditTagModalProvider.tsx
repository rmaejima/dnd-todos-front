import { Button } from 'components/common/Button';
import { TextField } from 'components/common/TextField';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Color, ColorPicker, useColor } from 'react-color-palette';
import { useModal } from 'react-hooks-use-modal';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { Tag, TagUpdateRequest } from 'types/tag';
import { deleteTag, updateTag } from 'utils/apis/tag';
import { stringNotEmpty } from 'utils/hooks/useValidation';
import { colors } from 'utils/theme';

interface Props {
  tag: Tag;
  onCompleteUpdate: () => void;
  children: React.ReactNode;
}

export const EditTagModalProvider: React.VFC<Props> = ({
  tag,
  onCompleteUpdate,
  children,
}) => {
  const [Modal, open, close] = useModal('root', {
    preventScroll: true,
    closeOnOverlayClick: false,
  });
  const [color, setColor] = useColor('hex', tag.color);
  const [titleValue, setTitleValue] = useState<string>(tag.title);
  const [initColor, setInitColor] = useState<Color>();

  useEffect(() => {
    setInitColor(color);
  }, []);

  const onClickDeleteButton = async () => {
    await deleteTag(tag.id);
    toast.info(`「${tag.title}」タグを削除しました`);
    onCompleteUpdate();
  };

  const onClickUpdateButton = async () => {
    const payload: TagUpdateRequest = {
      title: titleValue,
      color: color.hex,
    };
    await updateTag(tag.id, payload);
    close();
    onCompleteUpdate();
  };

  const onClickCancelButton = () => {
    setTitleValue(tag.title);
    if (initColor) {
      setColor(initColor);
    }
    close();
  };

  return (
    <>
      <OpenBox onClick={open}>{children}</OpenBox>
      <Modal>
        <ModalContainer>
          <ModalTitle>タグ編集</ModalTitle>
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

          <PreviewSectionContainer>
            <Label>プレビュー</Label>
            {titleValue.length !== 0 ? (
              <Preview $bgColor={color.hex}>{titleValue}</Preview>
            ) : (
              <Label style={{ fontWeight: 'normal' }}>
                タイトルを入力してください
              </Label>
            )}
          </PreviewSectionContainer>

          <ActionSectionContainer>
            <Button color={colors.error[500]} onClick={onClickDeleteButton}>
              タグを削除
            </Button>
            <RightActionSection>
              <Button color={colors.gray[500]} onClick={onClickCancelButton}>
                キャンセル
              </Button>
              <Button
                type="submit"
                onClick={onClickUpdateButton}
                disabled={titleValue.length === 0}
              >
                更新
              </Button>
            </RightActionSection>
          </ActionSectionContainer>
        </ModalContainer>
      </Modal>
    </>
  );
};

const OpenBox = styled.div`
  display: inline-block;
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

const PreviewSectionContainer = styled.div`
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
  justify-content: space-between;
`;

const RightActionSection = styled.div`
  display: flex;
  > :not(:first-child) {
    margin-left: 1rem;
  }
`;
