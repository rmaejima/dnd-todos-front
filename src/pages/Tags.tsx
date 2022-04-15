import React from 'react';
import { FaTag } from 'react-icons/fa';
import { SafeArea } from 'components/common/SafeArea';
import { PageTitle } from 'components/common/PageTitle';
import { TagList } from 'components/tags/TagList';

export const Tags: React.VFC = () => {
  return (
    <SafeArea>
      <PageTitle>
        <FaTag />
        <h1>タグ</h1>
      </PageTitle>
      <TagList />
    </SafeArea>
  );
};
