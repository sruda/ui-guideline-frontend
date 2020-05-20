import React from 'react';

import cn from 'classnames';

import './Logo.scss';

export enum Size {
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
}

export enum Color {
  default = 'var(--black)',
  white = 'var(--white)',
  lightSlate = 'var(--light-slate)',
}

export type Props = {
  readonly arialLabel: string;
  readonly color: Color;
  readonly size?: Size;
  readonly className?: string;
};

enum LogoWidth {
  xs = '94',
  sm = '120',
  md = '147',
  lg = '188',
}

enum LogoHeight {
  xs = '14',
  sm = '18',
  md = '22',
  lg = '28',
}

const Logo: React.SFC<Props> = ({ arialLabel, color = Color.default, size = Size.xs, className }) => {
  const logoClass = cn(className, className, 'ug-logo', {
    inline: true,
  });

  return (
    <a className={logoClass} aria-label={arialLabel} rel="noopener noreferrer" href="/">
      <svg
        width={LogoWidth[size]}
        height={LogoHeight[size]}
        fill={color}
        viewBox="0 0 188 28"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M58.1337 15.6362h8.1317v11.0942c-1.3301.4333-2.6098.7406-3.8391.922-1.2193.1813-2.5393.272-3.9601.272-3.3454 0-5.925-.9875-7.7387-2.9625-1.8138-1.985-2.7207-4.7812-2.7207-8.3886 0-3.557 1.0228-6.3381 3.0683-8.34334 2.0455-2.0153 4.8619-3.02294 8.4491-3.02294 2.3076 0 4.4941.44336 6.5598 1.33009l-1.2696 3.00783c-1.7936-.82627-3.5872-1.23941-5.3808-1.23941-2.3579 0-4.2221.74062-5.5925 2.22187-1.3704 1.4812-2.0556 3.5066-2.0556 6.0761 0 2.7005.6147 4.7561 1.844 6.1668 1.2394 1.4006 3.0179 2.101 5.3355 2.101 1.1689 0 2.4184-.1462 3.7484-.4384v-5.6982h-4.5797v-3.0985zM82.9974 27.6221l-.4988-2.1916h-.1814c-.4937.7759-1.1991 1.3855-2.116 1.8289-.9069.4433-1.9448.665-3.1137.665-2.0253 0-3.5368-.5038-4.5344-1.5114-.9976-1.0077-1.4963-2.5343-1.4963-4.5798V10.9053h3.5822v10.3082c0 1.2797.2619 2.242.7859 2.8869.524.6348 1.3452.9522 2.4637.9522 1.4913 0 2.5846-.4433 3.2799-1.3301.7054-.8968 1.058-2.3931 1.058-4.489v-8.3282h3.5671v16.7168h-2.7962zM94.409 27.6221h-3.552V10.9053h3.552v16.7168zM90.6454 6.47665c0-.63481.1713-1.12352.5139-1.46612.3527-.3426.8515-.5139 1.4964-.5139.6247 0 1.1084.1713 1.451.5139.3527.3426.529.83131.529 1.46612 0 .60459-.1763 1.08322-.529 1.4359-.3426.3426-.8263.5139-1.451.5139-.6449 0-1.1437-.1713-1.4964-.5139-.3426-.35268-.5139-.83131-.5139-1.4359zM105.14 27.9244c-2.085 0-3.713-.7557-4.882-2.2672-1.1685-1.5114-1.7529-3.6325-1.7529-6.3633 0-2.7408.5895-4.8719 1.7679-6.3935 1.19-1.5316 2.832-2.2974 4.928-2.2974 2.197 0 3.869.8111 5.018 2.4334h.181c-.171-1.1991-.257-2.1463-.257-2.8415V4.10364h3.567V27.6221h-2.781l-.619-2.1916h-.167c-1.138 1.6626-2.806 2.4939-5.003 2.4939zm.953-2.8718c1.461 0 2.524-.4081 3.189-1.2243.665-.8262 1.008-2.1614 1.028-4.0054v-.4987c0-2.106-.343-3.6024-1.028-4.4891-.685-.8867-1.758-1.3301-3.22-1.3301-1.249 0-2.211.5089-2.886 1.5266-.676 1.0076-1.013 2.4486-1.013 4.3228 0 1.8541.327 3.2698.982 4.2472.655.9674 1.638 1.451 2.948 1.451zM126.089 27.9244c-2.599 0-4.635-.7557-6.106-2.2672-1.461-1.5215-2.192-3.6124-2.192-6.2726 0-2.7307.681-4.877 2.041-6.4389 1.36-1.5618 3.229-2.3427 5.607-2.3427 2.207 0 3.95.6701 5.23 2.0102 1.28 1.3402 1.92 3.1842 1.92 5.532v1.9196h-11.14c.051 1.6223.489 2.8718 1.315 3.7484.826.8666 1.99 1.2999 3.492 1.2999.987 0 1.904-.0907 2.751-.2721.856-.1914 1.773-.5038 2.75-.9371v2.8869c-.866.4132-1.743.7054-2.63.8767-.886.1713-1.899.2569-3.038.2569zm-.65-14.631c-1.128 0-2.035.3577-2.72 1.0731-.675.7155-1.078 1.7584-1.209 3.1288h7.587c-.02-1.3805-.352-2.4234-.997-3.1288-.645-.7154-1.532-1.0731-2.661-1.0731zM140.176 27.6221h-3.552V4.10364h3.552V27.6221zM148.822 27.6221h-3.552V10.9053h3.552v16.7168zm-3.764-21.14545c0-.63481.172-1.12352.514-1.46612.353-.3426.852-.5139 1.497-.5139.624 0 1.108.1713 1.451.5139.352.3426.529.83131.529 1.46612 0 .60459-.177 1.08322-.529 1.4359-.343.3426-.827.5139-1.451.5139-.645 0-1.144-.1713-1.497-.5139-.342-.35268-.514-.83131-.514-1.4359zM168.622 27.6221h-3.567v-10.278c0-1.2898-.262-2.2521-.786-2.8869-.514-.6348-1.335-.9522-2.464-.9522-1.501 0-2.599.4434-3.295 1.3301-.695.8867-1.042 2.373-1.042 4.4588v8.3282h-3.552V10.9053h2.781l.498 2.1916h.182c.504-.796 1.219-1.4107 2.146-1.844.927-.4333 1.955-.6499 3.084-.6499 4.01 0 6.015 2.0405 6.015 6.1214v10.8977zM180.865 27.9244c-2.6 0-4.635-.7557-6.106-2.2672-1.461-1.5215-2.192-3.6124-2.192-6.2726 0-2.7307.68-4.877 2.041-6.4389 1.36-1.5618 3.229-2.3427 5.607-2.3427 2.207 0 3.95.6701 5.23 2.0102 1.28 1.3402 1.919 3.1842 1.919 5.532v1.9196h-11.139c.05 1.6223.489 2.8718 1.315 3.7484.826.8666 1.99 1.2999 3.491 1.2999.988 0 1.905-.0907 2.751-.2721.857-.1914 1.774-.5038 2.751-.9371v2.8869c-.866.4132-1.743.7054-2.63.8767-.887.1713-1.899.2569-3.038.2569zm-.65-14.631c-1.128 0-2.035.3577-2.72 1.0731-.676.7155-1.079 1.7584-1.21 3.1288h7.588c-.02-1.3805-.353-2.4234-.998-3.1288-.645-.7154-1.531-1.0731-2.66-1.0731zM23.6356 0v16.6262c0 3.6149-1.0265 6.4174-3.0796 8.4075C18.5155 27.0112 15.5682 28 11.7139 28c-3.76608 0-6.66307-.9636-8.69096-2.8907C1.00765 23.1822 0 20.4112 0 16.7962V0h7.50067v16.2105c0 1.9523.36528 3.3693 1.09582 4.251.73054.8817 1.80751 1.3226 3.23081 1.3226 1.524 0 2.6261-.4346 3.3063-1.3037.6928-.8817 1.0391-2.3176 1.0391-4.3077V0h7.4629zM29.4359 27.6221V0h7.5007v27.6221h-7.5007z" />
      </svg>
    </a>
  );
};

export default Logo;