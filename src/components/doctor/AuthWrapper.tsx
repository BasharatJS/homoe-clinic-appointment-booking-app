'use client'

import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { motion } from 'framer-motion'
import { auth } from '@/lib/firebase'
import { checkAuthorizedDoctor, AuthorizedDoctor } from '@/lib/firebaseServices'
import DoctorLogin from './DoctorLogin'
import DoctorDashboard from './DoctorDashboard'

export default function AuthWrapper() {
  const [user, setUser] = useState<any>(null)
  const [doctorData, setDoctorData] = useState<AuthorizedDoctor | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [authError, setAuthError] = useState('')

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          // Check if user is an authorized doctor
          const authorizedDoctor = await checkAuthorizedDoctor(currentUser.email!)
          
          if (authorizedDoctor) {
            setUser(currentUser)
            setDoctorData(authorizedDoctor)
            setAuthError('')
          } else {
            // User is not authorized, sign them out
            await auth.signOut()
            setAuthError('You are not authorized to access this dashboard.')
            setUser(null)
            setDoctorData(null)
          }
        } catch (error: any) {
          console.error('Auth error:', error)
          setAuthError('Authentication error. Please try again.')
          setUser(null)
          setDoctorData(null)
        }
      } else {
        setUser(null)
        setDoctorData(null)
        setAuthError('')
      }
      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const handleLoginSuccess = (result: any) => {
    setUser(result.user)
    setDoctorData(result.doctorData)
    setAuthError('')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-white text-lg">Loading...</p>
        </motion.div>
      </div>
    )
  }

  if (authError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center p-4">
        <motion.div
          className="bg-red-500/20 backdrop-blur-xl rounded-2xl border border-red-500/30 p-8 text-center max-w-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h2 className="text-white text-xl font-bold mb-2">Access Denied</h2>
          <p className="text-white/80 mb-4">{authError}</p>
          <motion.button
            onClick={() => {
              setAuthError('')
              window.location.reload()
            }}
            className="px-6 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Try Again
          </motion.button>
        </motion.div>
      </div>
    )
  }

  if (user && doctorData) {
    return <DoctorDashboard user={user} doctorData={doctorData} />
  }

  return <DoctorLogin onLoginSuccess={handleLoginSuccess} />
}