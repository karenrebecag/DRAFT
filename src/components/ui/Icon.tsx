import {
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  X,
  Search,
  ChevronRight,
  Globe,
  Star,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  MapPin,
  Mail,
  Phone,
  User,
  type LucideProps,
} from 'lucide-react';

// Map FontAwesome class names to Lucide icons
const iconMap = {
  // Arrows
  'fa-arrow-right': ArrowRight,
  'fa-arrow-left': ArrowLeft,
  'fa-arrow-up': ArrowUp,
  'fa-angle-right': ChevronRight,

  // UI
  'fa-xmark': X,
  'fa-search': Search,
  'fa-globe': Globe,
  'fa-star': Star,
  'fa-star-sharp': Star,

  // Social
  'fa-facebook-f': Facebook,
  'fa-twitter': Twitter,
  'fa-instagram': Instagram,
  'fa-linkedin-in': Linkedin,
  'fa-youtube': Youtube,
  'fa-google-plus-g': Globe, // Fallback

  // Contact
  'fa-location-dot': MapPin,
  'fa-envelope': Mail,
  'fa-phone': Phone,
  'fa-user': User,
} as const;

type IconName = keyof typeof iconMap;

interface IconProps extends LucideProps {
  name: IconName;
}

export const Icon = ({ name, size = 16, strokeWidth = 2, ...props }: IconProps) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in icon map`);
    return null;
  }

  return <IconComponent size={size} strokeWidth={strokeWidth} {...props} />;
};

// Convenience components for commonly used icons
export const ArrowRightIcon = (props: LucideProps) => <ArrowRight size={16} {...props} />;
export const ArrowLeftIcon = (props: LucideProps) => <ArrowLeft size={16} {...props} />;
export const ChevronRightIcon = (props: LucideProps) => <ChevronRight size={16} {...props} />;
export const XIcon = (props: LucideProps) => <X size={20} {...props} />;
export const SearchIcon = (props: LucideProps) => <Search size={18} {...props} />;
export const GlobeIcon = (props: LucideProps) => <Globe size={16} {...props} />;
export const StarIcon = (props: LucideProps) => <Star size={14} fill="currentColor" {...props} />;

// Social icons
export const FacebookIcon = (props: LucideProps) => <Facebook size={16} {...props} />;
export const TwitterIcon = (props: LucideProps) => <Twitter size={16} {...props} />;
export const InstagramIcon = (props: LucideProps) => <Instagram size={16} {...props} />;
export const LinkedinIcon = (props: LucideProps) => <Linkedin size={16} {...props} />;
export const YoutubeIcon = (props: LucideProps) => <Youtube size={16} {...props} />;

export default Icon;
