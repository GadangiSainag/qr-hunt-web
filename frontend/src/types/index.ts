// Auth Types
export interface User {
  id: string;
  role: 'admin' | 'player';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

// Game Types
export interface Question {
  id: string;
  text: string;
  difficulty: string;
  hint: string;
  status: 'PENDING' | 'SOLVED';
}

export interface Team {
  id: string;
  teamName: string;
  players: string[];
  huntId: string;
  numberOfSolvedQuestions: number;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface GameProgress {
  teamId: string;
  questionSet: Question[];
  lastSeenAt: Location;
  numberOfSolvedQuestions: number;
}

// Component Props Types
export interface QrData {
  qrSize: number;
  qrData: string;
}

export interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'player';
}

export interface GameStatusBadgeProps {
  status: 'PENDING' | 'SOLVED';
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export interface AuthResponse {
  accessToken: string;
} 