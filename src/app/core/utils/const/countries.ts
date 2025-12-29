import { Country } from '../controls/phone-input/models/Country.interface';

export const COUNTRIES: readonly Country[] = [
  { name: 'United States', iso2: 'US', dialCode: '+1', flag: '🇺🇸' },
  { name: 'Canada', iso2: 'CA', dialCode: '+1', flag: '🇨🇦' },

  { name: 'United Kingdom', iso2: 'GB', dialCode: '+44', flag: '🇬🇧' },
  { name: 'Ireland', iso2: 'IE', dialCode: '+353', flag: '🇮🇪' },

  { name: 'Germany', iso2: 'DE', dialCode: '+49', flag: '🇩🇪' },
  { name: 'France', iso2: 'FR', dialCode: '+33', flag: '🇫🇷' },
  { name: 'Spain', iso2: 'ES', dialCode: '+34', flag: '🇪🇸' },
  { name: 'Italy', iso2: 'IT', dialCode: '+39', flag: '🇮🇹' },
  { name: 'Netherlands', iso2: 'NL', dialCode: '+31', flag: '🇳🇱' },
  { name: 'Belgium', iso2: 'BE', dialCode: '+32', flag: '🇧🇪' },
  { name: 'Austria', iso2: 'AT', dialCode: '+43', flag: '🇦🇹' },
  { name: 'Switzerland', iso2: 'CH', dialCode: '+41', flag: '🇨🇭' },
  { name: 'Sweden', iso2: 'SE', dialCode: '+46', flag: '🇸🇪' },
  { name: 'Norway', iso2: 'NO', dialCode: '+47', flag: '🇳🇴' },
  { name: 'Denmark', iso2: 'DK', dialCode: '+45', flag: '🇩🇰' },
  { name: 'Finland', iso2: 'FI', dialCode: '+358', flag: '🇫🇮' },
  { name: 'Poland', iso2: 'PL', dialCode: '+48', flag: '🇵🇱' },
  { name: 'Czech Republic', iso2: 'CZ', dialCode: '+420', flag: '🇨🇿' },
  { name: 'Slovakia', iso2: 'SK', dialCode: '+421', flag: '🇸🇰' },
  { name: 'Hungary', iso2: 'HU', dialCode: '+36', flag: '🇭🇺' },
  { name: 'Romania', iso2: 'RO', dialCode: '+40', flag: '🇷🇴' },
  { name: 'Bulgaria', iso2: 'BG', dialCode: '+359', flag: '🇧🇬' },
  { name: 'Greece', iso2: 'GR', dialCode: '+30', flag: '🇬🇷' },
  { name: 'Portugal', iso2: 'PT', dialCode: '+351', flag: '🇵🇹' },

  { name: 'Ukraine', iso2: 'UA', dialCode: '+380', flag: '🇺🇦' },

  { name: 'Turkey', iso2: 'TR', dialCode: '+90', flag: '🇹🇷' },

  { name: 'Australia', iso2: 'AU', dialCode: '+61', flag: '🇦🇺' },
  { name: 'New Zealand', iso2: 'NZ', dialCode: '+64', flag: '🇳🇿' },

  { name: 'Japan', iso2: 'JP', dialCode: '+81', flag: '🇯🇵' },
  { name: 'South Korea', iso2: 'KR', dialCode: '+82', flag: '🇰🇷' },
  { name: 'China', iso2: 'CN', dialCode: '+86', flag: '🇨🇳' },
  { name: 'India', iso2: 'IN', dialCode: '+91', flag: '🇮🇳' },

  { name: 'Brazil', iso2: 'BR', dialCode: '+55', flag: '🇧🇷' },
  { name: 'Argentina', iso2: 'AR', dialCode: '+54', flag: '🇦🇷' },
  { name: 'Mexico', iso2: 'MX', dialCode: '+52', flag: '🇲🇽' },
  { name: 'Chile', iso2: 'CL', dialCode: '+56', flag: '🇨🇱' },
  { name: 'Colombia', iso2: 'CO', dialCode: '+57', flag: '🇨🇴' },

  { name: 'South Africa', iso2: 'ZA', dialCode: '+27', flag: '🇿🇦' },

  { name: 'Israel', iso2: 'IL', dialCode: '+972', flag: '🇮🇱' },
  { name: 'United Arab Emirates', iso2: 'AE', dialCode: '+971', flag: '🇦🇪' },
  { name: 'Saudi Arabia', iso2: 'SA', dialCode: '+966', flag: '🇸🇦' },
] as const;
