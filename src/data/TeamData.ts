export interface TeamMember {
  id: number
  page: string
  thumb: string
  name: string
  designation: string
  verified?: boolean
}

const team_data: TeamMember[] = [
  // home_1 (Momentum hover cards)
  {
    id: 1,
    page: 'home_1',
    thumb: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=900&fit=crop&crop=faces',
    name: 'Karen',
    designation: 'Co-Founder & CEO',
    verified: true,
  },
  {
    id: 2,
    page: 'home_1',
    thumb: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=900&fit=crop&crop=faces',
    name: 'Miguel',
    designation: 'Lead Developer',
    verified: true,
  },
  {
    id: 3,
    page: 'home_1',
    thumb: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=900&fit=crop&crop=faces',
    name: 'Sofia',
    designation: 'Product Designer',
    verified: true,
  },
  {
    id: 4,
    page: 'home_1',
    thumb: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=900&fit=crop&crop=faces',
    name: 'Daniel',
    designation: 'Creative Director',
    verified: true,
  },
]

export default team_data
