import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';

interface Props {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  id?: string;
  autoFocus?: boolean;
  className?: string;
}

export const TextField: React.VFC<Props> = ({
  value,
  onChange,
  placeholder,
  id,
  autoFocus,
  className,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  return (
    <Container className={className}>
      <Input
        id={id}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
        ref={inputRef}
      />
      {placeholder != null && !isFocused && !value && (
        <Placeholder>{placeholder}</Placeholder>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

const Input = styled.input`
  display: block;

  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 2px solid transparent;
  border-radius: 6px;
  background: ${(p) => p.theme.colors.gray[100]};

  color: ${(p) => p.theme.colors.text.base};
  transition: 0.1s ${(p) => p.theme.easings.easeOut};

  &:focus {
    background: #fff;
    border-color: ${(p) => p.theme.colors.primary[500]};
  }
`;

const Placeholder = styled.span`
  position: absolute;
  top: 0.5rem;
  left: 0.75rem;
  pointer-events: none;

  color: ${(p) => p.theme.colors.text.light};
`;
