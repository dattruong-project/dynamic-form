import React from "react";
import { CSSProperties } from "styled-components";
import styled from "styled-components";

type LayoutProps = {
  children: React.ReactNode;
  error: any;
  containerStyle?: CSSProperties;
  errorStyle?: CSSProperties;
  id?: string;
  disabledError?: string
};

export const Layout: React.FC<LayoutProps> = ({
  children,
  containerStyle,
  error,
  errorStyle,
  id,
}) => {
  return (
    <div style={containerStyle} id={id}>
      {children}
      {error && <ErrorMessage style={errorStyle}>{error.message}</ErrorMessage>}
    </div>
  );
};

type SizedBoxProps = {
  margin?: number;
  children?: React.ReactNode;
};

const MarginContainer = styled.div<{ margin?: number }>`
  margin: ${(props) => props.margin}px;
`;

export const ErrorMessage = styled.p`
color: red;
`;

export const SizedBox: React.FC<SizedBoxProps> = ({ margin, children }) => {
  return <MarginContainer margin={margin}>{children}</MarginContainer>;
};