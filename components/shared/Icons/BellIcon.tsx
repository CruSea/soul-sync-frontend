const BellIcon = ({ size, hasNotification }: {size: number, hasNotification: boolean}) => {
  return (
    <svg className="cursor-pointer" width={size} height={size} viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_321_2)">
        <path d="M9.74687 7.89727C10.1469 8.64727 10.5469 8.94727 10.5469 8.94727H1.54688C1.54688 8.94727 3.04688 7.94727 3.04688 4.44727C3.04688 2.79727 4.39688 1.44727 6.04688 1.44727C6.39687 1.44727 6.69687 1.49727 6.99687 1.59727" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5.19727 10.9473C5.28096 11.0995 5.40399 11.2264 5.55351 11.3149C5.70303 11.4033 5.87356 11.4499 6.04727 11.4499C6.22098 11.4499 6.3915 11.4033 6.54102 11.3149C6.69054 11.2264 6.81357 11.0995 6.89727 10.9473" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9.04688 5.94727C9.8753 5.94727 10.5469 5.27569 10.5469 4.44727C10.5469 3.61884 9.8753 2.94727 9.04688 2.94727C8.21845 2.94727 7.54688 3.61884 7.54688 4.44727C7.54688 5.27569 8.21845 5.94727 9.04688 5.94727Z" fill={hasNotification ? "#E03137" : undefined} stroke={hasNotification ? undefined : "black"} strokeLinecap={hasNotification ? undefined : "round"} strokeLinejoin={hasNotification ? undefined : "round"} />
      </g>
      <defs>
        <clipPath id="clip0_321_2">
          <rect width="12" height="12" fill="white" transform="translate(0.046875 0.447266)" />
        </clipPath>
      </defs>
    </svg>
  )
}
const BellIcon2 = ({ size, hasNotification }: {size: number, hasNotification: boolean}) => {
  return (
    <svg className="cursor-pointer" width={size} height={size} viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_321_2)">
        <path d="M9.74687 7.89727C10.1469 8.64727 10.5469 8.94727 10.5469 8.94727H1.54688C1.54688 8.94727 3.04688 7.94727 3.04688 4.44727C3.04688 2.79727 4.39688 1.44727 6.04688 1.44727C6.39687 1.44727 6.69687 1.49727 6.99687 1.59727" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5.19727 10.9473C5.28096 11.0995 5.40399 11.2264 5.55351 11.3149C5.70303 11.4033 5.87356 11.4499 6.04727 11.4499C6.22098 11.4499 6.3915 11.4033 6.54102 11.3149C6.69054 11.2264 6.81357 11.0995 6.89727 10.9473" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9.04688 5.94727C9.8753 5.94727 10.5469 5.27569 10.5469 4.44727C10.5469 3.61884 9.8753 2.94727 9.04688 2.94727C8.21845 2.94727 7.54688 3.61884 7.54688 4.44727C7.54688 5.27569 8.21845 5.94727 9.04688 5.94727Z" fill={hasNotification ? "#E03137" : undefined} stroke={hasNotification ? undefined : "black"} strokeLinecap={hasNotification ? undefined : "round"} strokeLinejoin={hasNotification ? undefined : "round"} />
      </g>
      <defs>
        <clipPath id="clip0_321_2">
          <rect width="12" height="12" fill="white" transform="translate(0.046875 0.447266)" />
        </clipPath>
      </defs>
    </svg>
  )
}

export const icon= {BellIcon,BellIcon2}