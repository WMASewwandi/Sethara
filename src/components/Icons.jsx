import React from 'react';

export const Icon = ({ children, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {children}
  </svg>
);

export const CheckCircleIcon = () => (
    <Icon>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </Icon>
);

export const UserIcon = () => (
    <Icon>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </Icon>
);

export const ToothIcon = () => (
    <Icon>
        <path d="M10 22v-6.5l2-1 2 1V22" />
        <path d="M6.2 15.5c-1.2-1.2-2-2.8-2-4.5C4.2 6.8 7.2 4 11 4h2c3.8 0 6.8 2.8 6.8 6.2 0 1.7-.8 3.3-2 4.5" />
        <path d="M18 10h-4c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h4" />
    </Icon>
);

export const StethoscopeIcon = () => (
    <Icon>
        <path d="M4.8 2.3A.3.3 0 1 0 5.4 2l-1.9 6.2 1.9-1.3-1.4 4.3H10v-2.7l.9-1.3L12 9l3 2 2-2.5-2-4.5 1.2-1.8-2.2-.4-1.5-2.2-2.3 1.3Z" />
        <path d="M11 12.2v5.8a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-5.8" />
        <path d="M14 10.7v1.8a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-1.8" />
    </Icon>
);

export const SyringeIcon = () => (
    <Icon>
        <path d="m18 2 4 4" />
        <path d="m17 7 3-3" />
        <path d="M19 9 8.7 19.3a2.1 2.1 0 0 1-3-3L16 5" />
        <path d="m9 8 8 8" />
        <path d="m2 22 4-4" />
    </Icon>
);

export const HeartPulseIcon = () => (
    <Icon>
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        <path d="M3.22 12H9.5l.5-1 2 4.44 2-7.11 1.5 3.33H22" />
    </Icon>
);

export const WhatsAppIcon = () => (
    <Icon>
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </Icon>
);

export const MailIcon = () => (
    <Icon>
        <rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
    </Icon>
);

export const FacebookIcon = () => (
    <Icon>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </Icon>
);

export const TikTokIcon = () => (
    <Icon>
        <path d="M12 12a4 4 0 1 0 4 4V8a8 8 0 1 1-8-8"></path>
    </Icon>
);

export const YouTubeIcon = () => (
    <Icon>
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 11.75a29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
    </Icon>
);
export const ArrowUpIcon = () => (
    <Icon>
        <line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline>
    </Icon>
);
export const InstagramIcon = () => (
    <Icon>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </Icon>
);
export const LinkedInIcon = () => (
    <Icon>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>
    </Icon>
);
export const XIcon = () => (
    <Icon>
        <path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>
    </Icon>
);