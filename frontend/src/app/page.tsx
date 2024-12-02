'use client';

import OnchainkitSvg from 'src/svg/OnchainkitSvg';

export default function Page() {

  return (
    <div className='flex h-full w-96 max-w-full flex-col px-1 font-sans md:w-[1008px]'>
      <section className='mt-6 mb-6 flex w-full flex-col md:flex-row'>
        <div className='flex w-full flex-row items-center justify-between gap-2 md:gap-0'>
          <a
            href="#"
            title="onchainkit"
            target="_blank"
            rel="noreferrer"
          >
            <OnchainkitSvg />
          </a>
        </div>
      </section>
    </div>
  );
}
