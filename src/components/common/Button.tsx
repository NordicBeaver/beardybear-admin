import styled from 'styled-components/macro';

interface ButtonProps {
  variant?: 'action' | 'caution' | 'default';
}

export const Button = styled.button<ButtonProps>`
  background-color: ${(props) =>
    props.variant === 'action' ? '#ffe8b0' : props.variant === 'caution' ? '#D33F49' : '#ffffff'};
  border: none;
  padding: 0.5em 0.8em;
  font-size: 1.3em;
  font-weight: 500;
  border-radius: 6px;
  font-family: inherit;
  cursor: pointer;
  &:hover {
    background-color: ${(props) =>
      props.variant === 'action' ? '#dac694' : props.variant === 'caution' ? '#b9373f' : '#fafafa'};
  }
`;
