import React, { SVGProps } from 'react';

const TestioLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 246 64" {...props}>
    <image
      width={246}
      height={64}
      xlinkHref="data:image/png;base64,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"
    />
  </svg>
);

export default TestioLogo;