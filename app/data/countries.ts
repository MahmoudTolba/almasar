export interface Country {
  iso2: string
  dialCode: string
  flag: string
  name: string
}

export const PHONE_COUNTRIES: Country[] = [
  { iso2: 'SA', dialCode: '966', flag: '🇸🇦', name: 'Saudi Arabia' },
  { iso2: 'AE', dialCode: '971', flag: '🇦🇪', name: 'United Arab Emirates' },
  { iso2: 'KW', dialCode: '965', flag: '🇰🇼', name: 'Kuwait' },
  { iso2: 'BH', dialCode: '973', flag: '🇧🇭', name: 'Bahrain' },
  { iso2: 'QA', dialCode: '974', flag: '🇶🇦', name: 'Qatar' },
  { iso2: 'OM', dialCode: '968', flag: '🇴🇲', name: 'Oman' },
  { iso2: 'EG', dialCode: '20', flag: '🇪🇬', name: 'Egypt' },
  { iso2: 'JO', dialCode: '962', flag: '🇯🇴', name: 'Jordan' },
  { iso2: 'LB', dialCode: '961', flag: '🇱🇧', name: 'Lebanon' },
  { iso2: 'SY', dialCode: '963', flag: '🇸🇾', name: 'Syria' },
  { iso2: 'IQ', dialCode: '964', flag: '🇮🇶', name: 'Iraq' },
  { iso2: 'YE', dialCode: '967', flag: '🇾🇪', name: 'Yemen' },
  { iso2: 'PS', dialCode: '970', flag: '🇵🇸', name: 'Palestine' },
  { iso2: 'TR', dialCode: '90', flag: '🇹🇷', name: 'Turkey' },
  { iso2: 'US', dialCode: '1', flag: '🇺🇸', name: 'United States' },
  { iso2: 'GB', dialCode: '44', flag: '🇬🇧', name: 'United Kingdom' },
  { iso2: 'FR', dialCode: '33', flag: '🇫🇷', name: 'France' },
  { iso2: 'DE', dialCode: '49', flag: '🇩🇪', name: 'Germany' },
  { iso2: 'IN', dialCode: '91', flag: '🇮🇳', name: 'India' },
  { iso2: 'PK', dialCode: '92', flag: '🇵🇰', name: 'Pakistan' },
  { iso2: 'BD', dialCode: '880', flag: '🇧🇩', name: 'Bangladesh' },
  { iso2: 'CN', dialCode: '86', flag: '🇨🇳', name: 'China' },
  { iso2: 'RU', dialCode: '7', flag: '🇷🇺', name: 'Russia' },
  { iso2: 'BR', dialCode: '55', flag: '🇧🇷', name: 'Brazil' },
  { iso2: 'CA', dialCode: '1', flag: '🇨🇦', name: 'Canada' },
  { iso2: 'AU', dialCode: '61', flag: '🇦🇺', name: 'Australia' },
  { iso2: 'JP', dialCode: '81', flag: '🇯🇵', name: 'Japan' },
  { iso2: 'KR', dialCode: '82', flag: '🇰🇷', name: 'South Korea' },
  { iso2: 'IT', dialCode: '39', flag: '🇮🇹', name: 'Italy' },
  { iso2: 'ES', dialCode: '34', flag: '🇪🇸', name: 'Spain' },
  { iso2: 'NL', dialCode: '31', flag: '🇳🇱', name: 'Netherlands' },
  { iso2: 'MY', dialCode: '60', flag: '🇲🇾', name: 'Malaysia' },
  { iso2: 'SG', dialCode: '65', flag: '🇸🇬', name: 'Singapore' },
  { iso2: 'IR', dialCode: '98', flag: '🇮🇷', name: 'Iran' },
  { iso2: 'AF', dialCode: '93', flag: '🇦🇫', name: 'Afghanistan' },
  { iso2: 'SD', dialCode: '249', flag: '🇸🇩', name: 'Sudan' },
  { iso2: 'MA', dialCode: '212', flag: '🇲🇦', name: 'Morocco' },
  { iso2: 'DZ', dialCode: '213', flag: '🇩🇿', name: 'Algeria' },
  { iso2: 'TN', dialCode: '216', flag: '🇹🇳', name: 'Tunisia' },
  { iso2: 'LY', dialCode: '218', flag: '🇱🇾', name: 'Libya' },
]

export const DEFAULT_COUNTRY = PHONE_COUNTRIES[0]

export function findCountryByDialCode(dialCode: string): Country | undefined {
  const clean = dialCode.replace(/\D/g, '')
  return PHONE_COUNTRIES.find((c) => c.dialCode === clean || clean.startsWith(c.dialCode))
}

export function parseE164(value: string): { dialCode: string; nationalNumber: string } | null {
  if (!value || typeof value !== 'string') return null
  const cleaned = value.replace(/\D/g, '')
  if (!cleaned) return null
  const withPlus = value.trim().startsWith('+')
  if (withPlus) {
    for (const c of [...PHONE_COUNTRIES].sort((a, b) => b.dialCode.length - a.dialCode.length)) {
      if (cleaned.startsWith(c.dialCode)) {
        return {
          dialCode: c.dialCode,
          nationalNumber: cleaned.slice(c.dialCode.length),
        }
      }
    }
  }
  return null
}
