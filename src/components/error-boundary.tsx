import React, { Component, ComponentType } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Error = styled.h5`
 text-weight: bold;
`;

class ErrorBoundary extends Component<any, { hasError: boolean }> {
  constructor(props: ComponentType<any>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <Container>
          <Error>This shouldn&apos;t have happened... :/ </Error>
        </Container>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
