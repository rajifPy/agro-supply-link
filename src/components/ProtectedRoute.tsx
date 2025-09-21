import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Loader2 } from 'lucide-react'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: ('admin' | 'seller' | 'buyer')[]
  requireActive?: boolean
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles, 
  requireActive = true 
}) => {
  const { user, profile, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/auth/login')
        return
      }

      if (!profile) {
        navigate('/auth/login')
        return
      }

      if (requireActive && profile.status !== 'active') {
        navigate('/pending-approval')
        return
      }

      if (allowedRoles && !allowedRoles.includes(profile.role)) {
        navigate('/unauthorized')
        return
      }
    }
  }, [user, profile, loading, navigate, allowedRoles, requireActive])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user || !profile) {
    return null
  }

  if (requireActive && profile.status !== 'active') {
    return null
  }

  if (allowedRoles && !allowedRoles.includes(profile.role)) {
    return null
  }

  return <>{children}</>
}

export default ProtectedRoute